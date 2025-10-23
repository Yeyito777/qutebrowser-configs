if (document.activeElement && document.activeElement !== element) {
  document.activeElement.blur();
}
element.focus({ preventScroll: true });
