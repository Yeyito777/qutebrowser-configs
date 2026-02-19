// ==UserScript==
// @name         YouTube Vim Keys
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  h/l seek ±5s, j/k volume ±5%
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const SEEK_SECONDS = 5;
    const VOLUME_STEP = 0.05;
    const DBG = '[yt-vim]';

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
            video.volume = Math.max(0, video.volume - VOLUME_STEP);
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log(DBG, `volume down to ${(video.volume * 100).toFixed(0)}%`);
        } else if (e.key === 'k') {
            video.volume = Math.min(1, video.volume + VOLUME_STEP);
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log(DBG, `volume up to ${(video.volume * 100).toFixed(0)}%`);
        }
    }, true);

    console.log(DBG, 'loaded — h/l seek ±5s, j/k volume ±5%');
})();
