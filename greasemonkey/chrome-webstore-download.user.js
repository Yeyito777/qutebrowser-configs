// ==UserScript==
// @name        Chrome Web Store Extension Downloader
// @namespace   qutebrowser
// @match       https://chromewebstore.google.com/*
// @run-at      document-idle
// @description Intercepts "Add to Chrome" to download .crx files directly
// ==/UserScript==

(function() {
    'use strict';

    // Chromium version shipped with our QtWebEngine build
    const CHROME_VERSION = '134.0.6998.208';

    function getExtensionId() {
        // URL pattern: /detail/<name>/<32-char-lowercase-id>
        const match = window.location.pathname.match(/\/detail\/[^/]+\/([a-p]{32})/);
        return match ? match[1] : null;
    }

    function getCrxUrl(extensionId) {
        return 'https://clients2.google.com/service/update2/crx'
            + '?response=redirect'
            + '&prodversion=' + CHROME_VERSION
            + '&acceptformat=crx2,crx3'
            + '&x=id%3D' + extensionId + '%26installsource%3Dondemand%26uc';
    }

    function interceptButtons() {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
            const text = btn.textContent.trim();
            if ((text === 'Add to Chrome' || text === 'Install')
                && !btn.dataset.crxIntercepted) {
                btn.dataset.crxIntercepted = 'true';
                btn.addEventListener('click', function(e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    const extId = getExtensionId();
                    if (extId) {
                        window.location.href = getCrxUrl(extId);
                    }
                }, true);
            }
        }
    }

    // The Web Store is a SPA — watch for dynamic button rendering
    const observer = new MutationObserver(interceptButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    // Initial scan for already-rendered buttons
    interceptButtons();
})();
