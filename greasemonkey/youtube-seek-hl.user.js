// ==UserScript==
// @name         YouTube Vim Keys
// @namespace    http://tampermonkey.net/
// @version      1.2
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

    function isTyping(e) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
        if (e.target.isContentEditable) return true;
        return false;
    }

    document.addEventListener('keydown', function(e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        if (isTyping(e)) return;

        const video = document.querySelector('video');
        if (!video) return;

        if (e.key === 'h') {
            video.currentTime = Math.max(0, video.currentTime - SEEK_SECONDS);
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log(DBG, `seek backward to ${video.currentTime.toFixed(1)}`);
        } else if (e.key === 'l') {
            video.currentTime = Math.min(video.duration || Infinity, video.currentTime + SEEK_SECONDS);
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log(DBG, `seek forward to ${video.currentTime.toFixed(1)}`);
        } else if (e.key === 'j') {
            e.preventDefault();
            e.stopImmediatePropagation();
            const player = getPlayer();
            if (player && player.setVolume) {
                const vol = Math.max(0, player.getVolume() - VOLUME_STEP);
                player.setVolume(vol);
                if (player.isMuted() && vol > 0) player.unMute();
                console.log(DBG, `volume down to ${vol}%`);
            }
        } else if (e.key === 'k') {
            e.preventDefault();
            e.stopImmediatePropagation();
            const player = getPlayer();
            if (player && player.setVolume) {
                const vol = Math.min(100, player.getVolume() + VOLUME_STEP);
                player.setVolume(vol);
                if (player.isMuted() && vol > 0) player.unMute();
                console.log(DBG, `volume up to ${vol}%`);
            }
        }
    }, true);

    console.log(DBG, 'loaded — h/l seek ±5s, j/k volume ±5%');
})();
