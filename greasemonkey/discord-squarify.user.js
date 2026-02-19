// ==UserScript==
// @name        Discord Squarify
// @namespace   yeyito
// @match       https://discord.com/*
// @run-at      document-idle
// @version     1.0
// ==/UserScript==

(function () {
  'use strict';

  // Replace mask contents with a full-coverage rect (square)
  function squarifyMask(mask) {
    if (mask.dataset.squarified) return;
    mask.dataset.squarified = '1';
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('fill', 'white');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    mask.innerHTML = '';
    mask.appendChild(rect);
  }

  function processAll() {
    // Global named avatar masks (circles for profile pics)
    document.querySelectorAll('mask[id^="svg-mask-avatar"]').forEach(squarifyMask);
    document.querySelectorAll('mask[id^="svg-mask-voice-user"]').forEach(squarifyMask);
    document.querySelectorAll('mask[id^="svg-mask-diagonal-facepile"]').forEach(squarifyMask);

    // Status indicators (online, dnd, idle, offline, etc.)
    document.querySelectorAll('mask[id^="svg-mask-status"]').forEach(squarifyMask);

    // Server icon inline masks (squircles) — target the <mask> directly
    document.querySelectorAll('svg.svg_cc5dd2 > mask').forEach(squarifyMask);
  }

  processAll();

  // Watch for dynamically added elements
  const observer = new MutationObserver(function (mutations) {
    let needsProcess = false;
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) { needsProcess = true; break; }
      }
      if (needsProcess) break;
    }
    if (needsProcess) processAll();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
