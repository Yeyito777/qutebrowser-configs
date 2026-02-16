// ==UserScript==
// @name         Claude Autosend
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Auto-send messages on Claude when using q= parameter
// @match        https://claude.ai/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const urlParams = new URLSearchParams(window.location.search);
    const queryText = urlParams.get('q');
    if (!queryText) return;

    let hasSent = false;

    const getInput = () => document.querySelector('div[contenteditable="true"]');
    const getSendButton = () => document.querySelector('button[aria-label="Send message"]');

    const attemptSend = () => {
        if (hasSent) return;

        const input = getInput();
        const sendButton = getSendButton();

        if (!input || !sendButton) return;

        // Check if input has our text and button is clickable
        const currentText = input.innerText.trim();
        
        // If input is empty or has different text, set our text
        if (currentText !== queryText.trim()) {
            input.focus();
            input.innerHTML = '';
            
            // Use execCommand for better React compatibility
            document.execCommand('insertText', false, queryText);
            
            return; // Wait for next observation cycle
        }

        // Check if button looks enabled (no opacity-50 in computed style)
        const buttonStyle = window.getComputedStyle(sendButton);
        const isDisabled = buttonStyle.opacity === '0.5' || 
                          sendButton.disabled || 
                          sendButton.classList.contains('disabled');

        if (!isDisabled) {
            hasSent = true;
            sendButton.click();
        }
    };

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
        attemptSend();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
    });

    // Also try periodically in case observer misses something
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        attemptSend();
        if (hasSent || attempts > 100) {
            clearInterval(interval);
            observer.disconnect();
        }
    }, 100);

    // Cleanup after 15 seconds regardless
    setTimeout(() => {
        clearInterval(interval);
        observer.disconnect();
    }, 15000);
})();
