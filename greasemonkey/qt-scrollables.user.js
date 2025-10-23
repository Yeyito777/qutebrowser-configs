// ==UserScript==
// @name         qutebrowser Scrollable Tagger
// @namespace    qute.scrollables
// @version      0.2
// @description  Tag native scrollable containers with qt-scrollable="1" for qutebrowser hinting
// @match        *://*/*
// @run-at       document-end
// @allFrames    true
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const ATTR = 'qt-scrollable';

  const isVisible = (el) => {
    const r = el.getBoundingClientRect();
    return r.width >= 1 && r.height >= 1;
  };

  const isNativeScrollable = (el) => {
    const s = getComputedStyle(el);
    const oy = s.overflowY || s.overflow;
    const ox = s.overflowX || s.overflow;
    const yScrollable = /(auto|scroll)/.test(oy) && el.scrollHeight > el.clientHeight;
    const xScrollable = /(auto|scroll)/.test(ox) && el.scrollWidth > el.clientWidth;
    return (yScrollable || xScrollable);
  };

  const mark = (el) => {
    el.setAttribute(ATTR, '1');
    el.style.outline = 'none';
  };

  const unmarkAll = () => {
    document.querySelectorAll(`[${ATTR}]`).forEach(e => e.removeAttribute(ATTR));
  };

  let scheduled = false;
  const scheduleScan = () => {
    if (scheduled) return;
    scheduled = true;
    (window.requestIdleCallback || window.requestAnimationFrame)(() => {
      scheduled = false;
      scan();
    });
  };

  const scan = () => {
    // Clear old marks; re-evaluate every pass so dynamic pages stay accurate.
    unmarkAll();

    // Always include the main document scroller.
    const main = document.scrollingElement || document.documentElement;
    if (main) mark(main);

    // Find native scrollable containers.
    // Querying '*' is surprisingly fast in modern engines; we filter cheaply.
    const all = document.querySelectorAll('*');
    for (const el of all) {
      // Skip if not visible or not connected.
      if (!el.isConnected || !isVisible(el)) continue;
      if (isNativeScrollable(el)) mark(el);
    }
  };

  // Re-scan on DOM changes that might affect scrollability.
  const mo = new MutationObserver(scheduleScan);
  mo.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden']
  });

  // Re-scan when layout sizes change.
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(scheduleScan);
    ro.observe(document.documentElement);
    ro.observe(document.body);
  }

  // Initial pass.
  scan();
})();
