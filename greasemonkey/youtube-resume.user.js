// ==UserScript==
// @name         YouTube Resume Playback
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  Save and restore YouTube video playback positions and loop state across sessions
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_PREFIX = 'yt-resume-';
    const SAVE_INTERVAL_MS = 3000;
    const NEAR_END_THRESHOLD = 10;
    const MAX_ENTRIES = 500;
    const DBG = '[yt-resume]';

    let currentVideoId = null;
    let saveTimer = null;
    let restoredPlaying = null;

    function getVideoId() {
        const params = new URLSearchParams(window.location.search);
        return params.get('v');
    }

    function storageKey(videoId) {
        return STORAGE_PREFIX + videoId;
    }

    function savePosition(video, videoId) {
        if (!video || !videoId || video.paused && video.currentTime === 0) return;
        if (video.duration && video.currentTime > video.duration - NEAR_END_THRESHOLD && !video.loop) {
            console.log(DBG, `savePosition: near end and loop=false, removing entry for ${videoId}`);
            localStorage.removeItem(storageKey(videoId));
            return;
        }
        const playing = restoredPlaying !== null ? restoredPlaying : !video.paused;
        if (video.currentTime > 5) {
            const entry = {
                time: video.currentTime,
                playing: playing,
                loop: video.loop,
                duration: video.duration || 0,
                savedAt: Date.now()
            };
            console.log(DBG, `savePosition: saving for ${videoId}: time=${entry.time.toFixed(1)}, playing=${entry.playing}, loop=${entry.loop}`);
            localStorage.setItem(storageKey(videoId), JSON.stringify(entry));
        }
    }

    function restorePosition(video, videoId, onSettled) {
        const raw = localStorage.getItem(storageKey(videoId));
        if (!raw) {
            console.log(DBG, 'restorePosition: no localStorage entry for', videoId);
            if (onSettled) onSettled();
            return;
        }

        const data = JSON.parse(raw);
        console.log(DBG, 'restorePosition: entry =', JSON.stringify(data));
        if (!data.time || data.time < 5) {
            console.log(DBG, 'restorePosition: time too low, skipping');
            if (onSettled) onSettled();
            return;
        }

        // Restore loop state
        if (data.loop !== undefined) {
            video.loop = data.loop;
            console.log(DBG, `restorePosition: restored loop=${video.loop}`);
        } else {
            console.log(DBG, 'restorePosition: no loop property in saved data, leaving as-is');
        }

        let seekAttempts = 0;
        const maxAttempts = 15;
        const targetTime = data.time;
        let settled = false;

        function settle() {
            if (settled) return;
            settled = true;
            if (onSettled) onSettled();
        }

        function doSeek() {
            if (video.duration && targetTime >= video.duration - NEAR_END_THRESHOLD) {
                console.log(DBG, 'restorePosition: near end, skipping seek');
                return false;
            }
            console.log(DBG, `restorePosition: seeking to ${targetTime} (attempt ${seekAttempts}, current=${video.currentTime})`);
            video.currentTime = targetTime;
            return true;
        }

        function ensureSeek() {
            if (seekAttempts >= maxAttempts) {
                console.log(DBG, 'restorePosition: max seek attempts reached');
                settle();
                return;
            }
            seekAttempts++;

            if (!video.duration) {
                console.log(DBG, 'restorePosition: no duration yet, retrying in 500ms');
                setTimeout(ensureSeek, 500);
                return;
            }

            if (!doSeek()) {
                settle();
                return;
            }

            setTimeout(() => {
                if (seekAttempts < maxAttempts && Math.abs(video.currentTime - targetTime) > 3) {
                    console.log(DBG, `restorePosition: drift detected (${video.currentTime} vs ${targetTime}), re-seeking`);
                    doSeek();
                    setTimeout(ensureSeek, 500);
                } else {
                    console.log(DBG, `restorePosition: seek settled at ${video.currentTime}`);
                    settle();
                }
            }, 300);
        }

        if (video.readyState >= 2) {
            console.log(DBG, 'restorePosition: video ready, seeking immediately');
            ensureSeek();
        } else {
            console.log(DBG, 'restorePosition: waiting for canplay event');
            video.addEventListener('canplay', () => {
                console.log(DBG, 'restorePosition: canplay fired, seeking now');
                ensureSeek();
            }, { once: true });
        }
    }

    function cleanup() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(STORAGE_PREFIX)) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    keys.push({ key, savedAt: data.savedAt || 0 });
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        }
        if (keys.length > MAX_ENTRIES) {
            keys.sort((a, b) => a.savedAt - b.savedAt);
            for (let i = 0; i < keys.length - MAX_ENTRIES; i++) {
                localStorage.removeItem(keys[i].key);
            }
        }
    }

    function stopSaving() {
        if (saveTimer) {
            clearInterval(saveTimer);
            saveTimer = null;
        }
        restoredPlaying = null;
    }

    function waitForVideo(callback, attempts) {
        attempts = attempts || 0;
        const video = document.querySelector('video');
        if (video) {
            console.log(DBG, `waitForVideo: found <video> after ${attempts} attempts`);
            callback(video);
        } else if (attempts < 50) {
            setTimeout(() => waitForVideo(callback, attempts + 1), 200);
        } else {
            console.log(DBG, 'waitForVideo: gave up after 50 attempts');
        }
    }

    function setupSaving(video, videoId) {
        video.addEventListener('playing', () => {
            console.log(DBG, 'setupSaving: "playing" event fired, clearing restoredPlaying grace period');
            restoredPlaying = null;
        }, { once: true });

        saveTimer = setInterval(() => {
            savePosition(video, videoId);
        }, SAVE_INTERVAL_MS);

        video.addEventListener('ended', () => {
            if (video.loop) {
                console.log(DBG, `setupSaving: "ended" event fired but loop=true, keeping entry for ${videoId}`);
            } else {
                console.log(DBG, `setupSaving: "ended" event fired, loop=false, removing entry for ${videoId}`);
                localStorage.removeItem(storageKey(videoId));
            }
        });

        console.log(DBG, `setupSaving: interval started for ${videoId}, restoredPlaying=${restoredPlaying}, loop=${video.loop}`);
    }

    function startForVideo(shouldRestore) {
        stopSaving();

        const videoId = getVideoId();
        if (!videoId) {
            console.log(DBG, `startForVideo(${shouldRestore}): no videoId in URL, skipping`);
            currentVideoId = null;
            return;
        }

        currentVideoId = videoId;
        console.log(DBG, `startForVideo(${shouldRestore}): videoId=${videoId}`);

        if (!shouldRestore) {
            console.log(DBG, 'startForVideo: initial load, deferring to yt-navigate-finish');
            return;
        }

        // Capture the pre-restore playing state before anything overwrites it.
        const raw = localStorage.getItem(storageKey(videoId));
        if (raw) {
            try {
                const data = JSON.parse(raw);
                restoredPlaying = data.playing || false;
                console.log(DBG, `startForVideo: captured restoredPlaying=${restoredPlaying}, savedLoop=${data.loop} from localStorage:`, JSON.stringify(data));
            } catch (e) {
                restoredPlaying = null;
                console.log(DBG, 'startForVideo: failed to parse localStorage entry');
            }
        } else {
            restoredPlaying = null;
            console.log(DBG, 'startForVideo: no localStorage entry found');
        }

        waitForVideo((video) => {
            console.log(DBG, `startForVideo: video found, paused=${video.paused}, readyState=${video.readyState}, currentTime=${video.currentTime}`);
            restorePosition(video, videoId, () => {
                if (restoredPlaying) {
                    // Signal Python to grant user activation and play.
                    // TabRuntimeManager watches console_message for this.
                    console.log('[yt-resume-ready]');
                } else {
                    console.log(DBG, 'startForVideo: seek settled but restoredPlaying=false, not signaling');
                }
            });
            setupSaving(video, videoId);
        });
    }

    window.addEventListener('yt-navigate-finish', () => {
        console.log(DBG, 'EVENT: yt-navigate-finish');
        startForVideo(true);
    });

    console.log(DBG, 'EVENT: document-idle (script loaded)');
    startForVideo(false);

    window.addEventListener('beforeunload', () => {
        const video = document.querySelector('video');
        if (video && currentVideoId && video.currentTime > 5) {
            const key = storageKey(currentVideoId);
            const existing = localStorage.getItem(key);
            const wasPlaying = existing ? (JSON.parse(existing).playing || false) : false;
            console.log(DBG, `beforeunload: saving time=${video.currentTime}, playing=${wasPlaying}, loop=${video.loop} (from existing entry)`);
            localStorage.setItem(key, JSON.stringify({
                time: video.currentTime,
                playing: wasPlaying,
                loop: video.loop,
                duration: video.duration || 0,
                savedAt: Date.now()
            }));
        } else {
            console.log(DBG, `beforeunload: skipped (video=${!!video}, id=${currentVideoId}, time=${video?.currentTime})`);
        }
    });

    cleanup();
})();
