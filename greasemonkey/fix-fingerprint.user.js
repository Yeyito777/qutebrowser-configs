// ==UserScript==
// @name         Fix browser fingerprint consistency
// @namespace    exocortex
// @version      1.0
// @description  Override userAgentData to match the real OS (Linux) so sites
//               don't see a mismatch between the UA string and Client Hints.
// @match        *://*.x.com/*
// @match        *://*.twitter.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Override navigator.userAgentData to report Linux consistently
    if (navigator.userAgentData) {
        const realBrands = navigator.userAgentData.brands;
        const patchedUAData = {
            brands: realBrands,
            mobile: false,
            platform: 'Linux',
            getHighEntropyValues: function(hints) {
                return Promise.resolve({
                    brands: realBrands,
                    mobile: false,
                    platform: 'Linux',
                    platformVersion: '6.19.6',
                    architecture: 'x86',
                    bitness: '64',
                    model: '',
                    uaFullVersion: '134.0.0.0',
                    fullVersionList: realBrands.map(b => ({brand: b.brand, version: b.version + '.0.0.0'})),
                });
            },
            toJSON: function() {
                return { brands: realBrands, mobile: false, platform: 'Linux' };
            }
        };

        Object.defineProperty(navigator, 'userAgentData', {
            get: () => patchedUAData,
            configurable: false
        });
    }
})();
