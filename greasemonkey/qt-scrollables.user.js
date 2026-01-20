// ==UserScript==
// @name         qutebrowser Scrollable Tagger (correct + fast)
// @namespace    qute.scrollables
// @version      0.5
// @description  Tag every native scrollable element with qt-scrollable="1"
// @match        *://*/*
// @run-at       document-end
// @allFrames    false
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const ATTR = 'qt-scrollable';
  const FULL_SCAN_INTERVAL = 1000; // ms

  let scheduled = false;
  let lastFullScan = 0;

  const tag = (el) => {
    if (!el || el.nodeType !== 1) return;
    if (el.hasAttribute(ATTR)) return;
    el.setAttribute(ATTR, '1');
  };

  const isScrollable = (el) => {
    // Fast layout check
    if (el.scrollHeight <= el.clientHeight &&
        el.scrollWidth  <= el.clientWidth) {
      return false;
    }

    const s = getComputedStyle(el);
    return (
      /auto|scroll/.test(s.overflowY || s.overflow) ||
      /auto|scroll/.test(s.overflowX || s.overflow)
    );
  };

  const process = (el) => {
    if (!el || el.nodeType !== 1) return;
    if (el.hasAttribute(ATTR)) return;
    if (isScrollable(el)) tag(el);
  };

  const fullScan = () => {
    lastFullScan = performance.now();
    const main = document.scrollingElement || document.documentElement;
    if (main) tag(main);
    document.querySelectorAll('*').forEach(process);
  };

  const scheduleFullScan = () => {
    const now = performance.now();
    if (now - lastFullScan < FULL_SCAN_INTERVAL) return;
    if (scheduled) return;

    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      fullScan();
    }, 0);
  };

  new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.target instanceof Element) process(m.target);
      for (const n of m.addedNodes) {
        if (n instanceof Element) {
          process(n);
          n.querySelectorAll?.('*').forEach(process);
        }
      }
    }
    scheduleFullScan();
  }).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  // Initial full scan
  fullScan();
})();
