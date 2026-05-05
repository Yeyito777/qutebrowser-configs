// ==UserScript==
// @name         IRCC MyCIC Keepalive (safe)
// @namespace    exocortex
// @version      0.2
// @description  Keep IRCC MyCIC session alive using the observed sessionAlive POST and auto-click Continue session if needed.
// @match        https://onlineservices-servicesenligne.cic.gc.ca/mycic/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // Safety guard: only run on the exact MyCIC host/path.
  if (location.origin !== 'https://onlineservices-servicesenligne.cic.gc.ca' || !location.pathname.startsWith('/mycic/')) {
    return;
  }

  const LOG_PREFIX = '[ircc-keepalive]';
  const KEEPALIVE_MS = 500000; // observed cadence
  const MODAL_CHECK_MS = 10000;

  function log(...args) {
    console.log(LOG_PREFIX, ...args);
  }

  async function pingSession() {
    try {
      const resp = await fetch('/mycic/sessionAlive', {
        method: 'POST',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: ''
      });
      log('sessionAlive POST', resp.status);
    } catch (e) {
      log('sessionAlive POST failed', e);
    }
  }

  function findContinueButton() {
    const buttons = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"]'));
    return buttons.find(btn => {
      const txt = (btn.textContent || btn.value || '').trim().toLowerCase();
      return txt === 'continue session';
    });
  }

  function clickContinueIfPresent() {
    const btn = findContinueButton();
    if (!btn) return false;
    btn.click();
    log('clicked Continue session');
    return true;
  }

  // Only start after page load is settled a bit.
  setTimeout(() => {
    log('loaded on', location.pathname);

    // Periodic keepalive matching observed behavior.
    setInterval(() => {
      pingSession();
    }, KEEPALIVE_MS);

    // Modal fallback if the timeout warning appears anyway.
    setInterval(() => {
      clickContinueIfPresent();
    }, MODAL_CHECK_MS);

    const obs = new MutationObserver(() => {
      clickContinueIfPresent();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }, 3000);
})();
