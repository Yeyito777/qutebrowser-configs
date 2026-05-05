// ==UserScript==
// @name         YouTube Vim Keys
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  h/l seek ±5s, j/k volume ±5%
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const SEEK_SECONDS = 5;
    const VOLUME_STEP = 5; // YouTube API uses 0-100
    const DBG = '[yt-vim]';

    function getPlayer() {
        return document.querySelector('#movie_player');
    }

    function getActiveVideo() {
        const playerVideo = document.querySelector('#movie_player video, #movie_player .html5-main-video');
        if (playerVideo) return playerVideo;

        const videos = Array.from(document.querySelectorAll('video'));
        if (!videos.length) return null;

        return videos
            .filter(v => v.readyState > 0 || v.currentSrc || v.src)
            .sort((a, b) => {
                const aScore = (a.clientWidth * a.clientHeight) + (a.paused ? 0 : 1_000_000);
                const bScore = (b.clientWidth * b.clientHeight) + (b.paused ? 0 : 1_000_000);
                return bScore - aScore;
            })[0] || null;
    }

    function isTypingTarget(target) {
        if (!target || !(target instanceof Element)) return false;
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
        if (target.isContentEditable) return true;
        return !!target.closest('[contenteditable="true"], input, textarea, select');
    }

    function shouldHandle(e) {
        if (e.defaultPrevented) return false;
        if (e.altKey || e.ctrlKey || e.metaKey) return false;
        if (isTypingTarget(e.target)) return false;
        return true;
    }

    function seekBy(delta) {
        const video = getActiveVideo();
        if (!video) {
            console.log(DBG, 'no active video found for seek');
            return false;
        }
        const next = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + delta));
        video.currentTime = next;
        console.log(DBG, `seek ${delta < 0 ? 'backward' : 'forward'} to ${video.currentTime.toFixed(1)}`);
        return true;
    }

    function adjustVolume(delta) {
        const player = getPlayer();
        if (!(player && player.setVolume && player.getVolume)) {
            console.log(DBG, 'player API unavailable for volume change');
            return false;
        }
        const vol = Math.max(0, Math.min(100, player.getVolume() + delta));
        player.setVolume(vol);
        if (player.isMuted && player.isMuted() && vol > 0 && player.unMute) player.unMute();
        console.log(DBG, `volume ${delta < 0 ? 'down' : 'up'} to ${vol}%`);
        return true;
    }

    document.addEventListener('keydown', function(e) {
        if (!shouldHandle(e)) return;

        let handled = false;
        if (e.key === 'h') {
            handled = seekBy(-SEEK_SECONDS);
        } else if (e.key === 'l') {
            handled = seekBy(SEEK_SECONDS);
        } else if (e.key === 'j') {
            handled = adjustVolume(-VOLUME_STEP);
        } else if (e.key === 'k') {
            handled = adjustVolume(VOLUME_STEP);
        }

        if (handled) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, true);

    console.log(DBG, 'loaded — h/l seek ±5s, j/k volume ±5%');
})();
