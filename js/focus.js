if (document.activeElement && document.activeElement !== element) {
  document.activeElement.blur();
}
element.style.outline = "none";
element.focus();
