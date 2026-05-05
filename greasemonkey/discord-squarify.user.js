// ==UserScript==
// @name        Discord Squarify
// @namespace   yeyito
// @match       https://discord.com/*
// @run-at      document-idle
// @version     1.1
// ==/UserScript==

(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function isSquareMask(mask) {
    if (mask.childElementCount !== 1) return false;
    const child = mask.firstElementChild;
    return (
      child?.namespaceURI === SVG_NS &&
      child.tagName.toLowerCase() === 'rect' &&
      child.getAttribute('data-squarify') === '1'
    );
  }

  // Replace mask contents with a full-coverage rect (square)
  function squarifyMask(mask) {
    if (isSquareMask(mask)) return;

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('data-squarify', '1');
    rect.setAttribute('fill', 'white');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');

    mask.replaceChildren(rect);
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

  let scheduled = false;
  function scheduleProcess() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      processAll();
    });
  }

  processAll();

  // Watch for Discord replacing or mutating masks dynamically.
  const observer = new MutationObserver(function (mutations) {
    for (const m of mutations) {
      if (m.type === 'childList') {
        if (m.target instanceof Element && m.target.tagName?.toLowerCase() === 'mask') {
          scheduleProcess();
          return;
        }

        for (const node of m.addedNodes) {
          if (node.nodeType === 1) {
            scheduleProcess();
            return;
          }
        }
      }

    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
