// ==UserScript==
// @name        Discord Desktop Audio Share
// @namespace   mnemo
// @match       https://discord.com/*
// @match       https://*.discord.com/*
// @run-at      document-start
// @version     8.0
// @description Restores native getDisplayMedia for desktop audio capture and
//              silences Discord's duplicate WebAudio voice output that would
//              otherwise leak into the desktop capture.
//              WebRTC voice output (media.role=communication) is excluded from
//              capture by PipeWire; this script prevents the AudioContext
//              duplicate from bypassing that exclusion.
// ==/UserScript==

const PAYLOAD = `(${function () {
  'use strict';

  // ── 1. Preserve native getDisplayMedia ──
  const nativeGDM = navigator.mediaDevices.getDisplayMedia;
  Object.defineProperty(navigator.mediaDevices, 'getDisplayMedia', {
    configurable: true,
    enumerable: true,
    writable: false,
    value: function (constraints) {
      return nativeGDM.call(navigator.mediaDevices, constraints);
    }
  });

  // ── 2. Silence AudioContext voice duplicates ──
  // Discord receives voice via WebRTC (plays through communication-tagged output).
  // It ALSO pipes the audio through an AudioContext for processing (AGC, noise
  // suppression, mixing) which creates a second, UNTAGGED PulseAudio output.
  // This untagged output leaks friends' voice into the desktop capture.
  //
  // Fix: when createMediaStreamSource is called with a remote WebRTC stream,
  // set the AudioContext's sinkId to "" (silent output). The voice still
  // plays through the WebRTC communication-tagged path; this just kills
  // the duplicate.

  const origCreateMSS = AudioContext.prototype.createMediaStreamSource;
  AudioContext.prototype.createMediaStreamSource = function (stream) {
    const node = origCreateMSS.call(this, stream);
    const ctx = this;

    // Detect remote WebRTC tracks: they have no deviceId (not from a local device)
    const hasRemoteTracks = stream.getTracks().some(t => {
      try {
        const s = t.getSettings();
        return !s.deviceId;
      } catch (e) { return false; }
    });

    if (hasRemoteTracks && ctx.sinkId !== '') {
      // Silence this AudioContext's output — voice plays via WebRTC output
      ctx.setSinkId('').then(() => {
        console.log('[DesktopAudio] Silenced AudioContext with remote WebRTC tracks (prevents capture leak)');
      }).catch(e => {
        console.warn('[DesktopAudio] setSinkId failed:', e.message);
      });
    }

    return node;
  };

  console.log('[DesktopAudio] v8.0 — native getDisplayMedia + AudioContext voice silencing');
}.toString()})();`;

function inject() {
  const blob = new Blob([PAYLOAD], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const script = document.createElement('script');
  script.src = url;
  document.documentElement.appendChild(script);
  script.addEventListener('load', () => {
    script.remove();
    URL.revokeObjectURL(url);
  });
}

if (document.documentElement) {
  inject();
} else {
  new MutationObserver((_, obs) => {
    if (document.documentElement) {
      obs.disconnect();
      inject();
    }
  }).observe(document, { childList: true });
}
