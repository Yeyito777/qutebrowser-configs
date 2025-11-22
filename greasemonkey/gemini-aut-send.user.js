// ==UserScript==
// @name         Google AI Studio Auto-Run (Ctrl+Enter)
// @namespace    qute.aistudio.autorun
// @match        https://aistudio.google.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
    const params = new URLSearchParams(location.search);
    const autoSend = params.get('autosend') === '1';
    const promptText = params.get('prompt');

    if (!autoSend || !promptText) return;

    // Prevent double-firing
    const fireKey = `gem_autosent:${location.pathname}:${promptText}`;
    if (sessionStorage.getItem(fireKey)) return;

    console.log('[AI Studio] Autosend detected. Waiting for editor...');

    const delay = (ms) => new Promise(r => setTimeout(r, ms));

    // Robust waiter
    const waitFor = async (selectorOrPred, timeout = 15000) => {
        const start = performance.now();
        while (performance.now() - start < timeout) {
            const res = typeof selectorOrPred === 'string' 
                ? document.querySelector(selectorOrPred) 
                : selectorOrPred();
            if (res) return res;
            await delay(100);
        }
        return null;
    };

    // 1. Find the main input box (usually a contenteditable div or textarea)
    const findInput = () => document.querySelector('footer div[contenteditable="true"], textarea, [role="textbox"]');

    // 2. Check if the Run button is enabled (to know when we CAN send)
    const isRunReady = () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        // The run button usually has a specific icon or text, but looking for the "main" submit button at the bottom right
        const runBtn = buttons.find(b => {
             const aria = (b.getAttribute('aria-label') || '').toLowerCase();
             const txt = (b.textContent || '').toLowerCase();
             return (aria.includes('run') || txt === 'run') && !b.disabled;
        });
        return !!runBtn;
    };

    (async () => {
        // Wait for input box
        const inputEl = await waitFor(findInput);
        if (!inputEl) return console.log('[AI Studio] Input not found.');

        // Wait for the text to actually populate (URL param takes a moment to fill the box)
        await delay(500);
        
        // Double check text is there, if not, force it (React fallback)
        if (!inputEl.textContent.includes(promptText.substring(0, 5))) {
            inputEl.focus();
            document.execCommand('insertText', false, promptText);
            await delay(200);
        }

        // Wait until the "Run" button is actually clickable (indicates the app is ready)
        await waitFor(isRunReady, 10000);

        console.log('[AI Studio] App ready. Sending via Ctrl+Enter...');

        // 3. Simulate Ctrl+Enter
        inputEl.focus();
        
        // Create the event with the specific 'ctrlKey' modifier
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            ctrlKey: true, // The magic sauce
            bubbles: true,
            cancelable: true
        });

        inputEl.dispatchEvent(event);

        // Mark as sent
        sessionStorage.setItem(fireKey, '1');
    })();
})();
