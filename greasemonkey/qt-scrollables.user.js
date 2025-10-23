// ==UserScript==
// @name         qutebrowser Scrollable Tagger (mini)
// @namespace    qute.scrollables
// @version      0.3
// @description  Tag every native scrollable element with qt-scrollable="1"
// @match        *://*/*
// @run-at       document-end
// @allFrames    true
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const ATTR = 'qt-scrollable';

  const isScrollable = (el) => {
    const s = getComputedStyle(el);
    const oy = s.overflowY || s.overflow;
    const ox = s.overflowX || s.overflow;
    return ((/auto|scroll/.test(oy) && el.scrollHeight > el.clientHeight) ||
            (/auto|scroll/.test(ox) && el.scrollWidth  > el.clientWidth));
  };

  const tag = (el) => el.setAttribute(ATTR, '1');

  const scan = (root = document) => {
    const main = document.scrollingElement || document.documentElement;
    if (main) tag(main);
    (root.querySelectorAll?.('*') || []).forEach(el => { if (isScrollable(el)) tag(el); });
  };

  new MutationObserver(() => scan()).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  scan();
})();
