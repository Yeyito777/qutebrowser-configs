// ==UserScript==
// @name         Always Show Hover Elements
// @match        *://*/*
// @exclude      *://discord.com/*
// @exclude      *://*.discord.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    function showElements() {
        // 1. Target elements with Tailwind group-hover:opacity-* classes (hover-to-visible pattern)
        document.querySelectorAll('[class*="group-hover:opacity"], [class*="group-focus-within:opacity"]').forEach(el => {
            el.style.setProperty('opacity', '1', 'important');
            el.style.setProperty('visibility', 'visible', 'important');
        });

        // 2. Target copy buttons by aria-label and fix their parent chain
        document.querySelectorAll('[aria-label*="copy" i], [aria-label*="Copy"], [aria-label*="clipboard" i]').forEach(el => {
            el.style.setProperty('visibility', 'visible', 'important');
            el.style.setProperty('opacity', '1', 'important');
            // Also fix parent chain up to 3 levels
            let parent = el.parentElement;
            for (let i = 0; i < 3 && parent; i++) {
                const style = getComputedStyle(parent);
                if (style.opacity === '0' || style.visibility === 'hidden') {
                    parent.style.setProperty('opacity', '1', 'important');
                    parent.style.setProperty('visibility', 'visible', 'important');
                }
                parent = parent.parentElement;
            }
        });
    }

    showElements();
    new MutationObserver(showElements).observe(document.body, {childList: true, subtree: true});
})();
