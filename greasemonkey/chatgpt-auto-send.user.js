// ==UserScript==
// @name         ChatGPT Auto-Send from ?q= (stable + no-dup)
// @namespace    qute.chatgpt.autosend
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(() => {
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  const autosend = params.get('autosend') === '1';
  const force = params.get('force') === '1';
  if (!q || !autosend) return;

  // ---- utilities ----
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  const waitFor = async (pred, {timeout=15000, poll=50} = {}) => {
    const start = performance.now();
    while (performance.now() - start < timeout) {
      const v = pred();
      if (v) return v;
      await delay(poll);
    }
    return null;
  };
  const composerSel = '[data-testid="textbox"], textarea, div[role="textbox"]';
  const sendSel = 'button[data-testid="send-button"], button[data-testid="fruitjuice-send-button"]';

  const getText = (el) =>
    !el ? '' :
    el.tagName === 'TEXTAREA' ? (el.value ?? '') :
    (el.innerText ?? el.textContent ?? '');

  const setTextReactSafe = (ta, value) => {
    // Use the native setter so React notices the change
    const proto = ta.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    if (setter) setter.call(ta, value);
    ta.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const replaceContentEditable = (el, value) => {
    el.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const waitForComposerStable = async (el, idleMs = 400, maxMs = 4000) => {
    // Wait until the input text stops changing (accounts for “draft restore”)
    let last = getText(el), lastChange = performance.now();
    const start = performance.now();
    while (performance.now() - start < maxMs) {
      await delay(80);
      const now = getText(el);
      if (now !== last) { last = now; lastChange = performance.now(); }
      if (performance.now() - lastChange >= idleMs) break;
    }
  };

  // Avoid double-firing on SPA route shuffles
  const fireKey = `q_autosent:${location.pathname}:${q}`;
  if (sessionStorage.getItem(fireKey)) return;

  (async () => {
    // 1) Wait for composer and send button to exist
    const input = await waitFor(() => document.querySelector(composerSel));
    const sendBtn = await waitFor(() => document.querySelector(sendSel));
    if (!input || !sendBtn) return;

    // 2) Wait for hydration/draft-restore to “settle” so Send is enable-able
    await waitForComposerStable(input);
    await waitFor(() => {
      const b = document.querySelector(sendSel);
      return b && !b.disabled && b.getAttribute('aria-disabled') !== 'true';
    }, { timeout: 8000 });

    // 3) Ensure the box contains exactly q
    const current = getText(input).trim();
    if (force || current !== q) {
      if (input.tagName === 'TEXTAREA') {
        setTextReactSafe(input, q);
      } else {
        replaceContentEditable(input, q);
      }
    }

    // 4) Re-check Send enabled (React sometimes toggles after input event)
    await waitFor(() => {
      const b = document.querySelector(sendSel);
      return b && !b.disabled && b.getAttribute('aria-disabled') !== 'true';
    }, { timeout: 5000 });

    // 5) Click Send, fallback to Enter if needed
    const btn = document.querySelector(sendSel);
    if (btn) {
      btn.click();
    } else {
      const evt = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true });
      input.dispatchEvent(evt);
    }
    sessionStorage.setItem(fireKey, '1');
  })();
})();
