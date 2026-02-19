# vim:fileencoding=utf-8:foldmethod=marker


def setup(c, flavour=None, samecolorrows=False):
    """Apply the Deep Ocean Blue palette to qutebrowser."""

    palette = {
        "base00": "#00050f",  # primary background
        "base01": "#000a1a",  # secondary background
        "base02": "#001020",  # panel surface
        "base03": "#002040",  # separators / deep contrast
        "base05": "#ffffff",  # primary text
        "base06": "#cce7ff",  # secondary text
        "base07": "#eaf7ff",  # highlight text
        "base08": "#1d9bf0",  # core accent
        "base09": "#0b72c2",  # accent hover / pressed
        "base0A": "#1d9bf0",  # accent alias for compatibility
        "base0B": "#1d9bf0",  # accent alias for compatibility
        "base0C": "#00bcd4",  # alternate accent
        "base0D": "#008fe0",  # link accent
        "base0E": "#4fd0ff",  # glow / focus ring
        "base0F": "#0070b8",  # deep accent
    }

    bg_primary = palette["base00"]
    bg_secondary = palette["base01"]
    bg_panel = palette["base02"]
    bg_contrast = palette["base03"]
    fg_primary = palette["base05"]
    fg_secondary = palette["base06"]
    fg_highlight = palette["base07"]
    accent = palette["base08"]
    accent_hover = palette["base09"]
    accent_link = palette["base0D"]
    accent_alt = palette["base0C"]
    accent_glow = palette["base0E"]
    accent_deep = palette["base0F"]

    # completion {{{
    c.colors.completion.category.bg = bg_panel
    c.colors.completion.category.border.bottom = bg_contrast
    c.colors.completion.category.border.top = bg_contrast
    c.colors.completion.category.fg = fg_highlight
    if samecolorrows:
        c.colors.completion.even.bg = bg_secondary
        c.colors.completion.odd.bg = c.colors.completion.even.bg
    else:
        c.colors.completion.even.bg = bg_secondary
        c.colors.completion.odd.bg = bg_panel
    c.colors.completion.fg = fg_secondary
    c.colors.completion.item.selected.bg = accent
    c.colors.completion.item.selected.border.bottom = accent_hover
    c.colors.completion.item.selected.border.top = accent_glow
    c.colors.completion.item.selected.fg = bg_primary
    c.colors.completion.item.selected.match.fg = fg_highlight
    c.colors.completion.match.fg = fg_highlight
    c.colors.completion.scrollbar.bg = bg_primary
    c.colors.completion.scrollbar.fg = bg_contrast
    # }}}

    # downloads {{{
    c.colors.downloads.bar.bg = bg_primary
    c.colors.downloads.error.bg = bg_primary
    c.colors.downloads.start.bg = bg_primary
    c.colors.downloads.stop.bg = bg_primary
    c.colors.downloads.error.fg = accent_deep
    c.colors.downloads.start.fg = accent
    c.colors.downloads.stop.fg = accent_alt
    c.colors.downloads.system.fg = "none"
    c.colors.downloads.system.bg = "none"
    # }}}

    # hints {{{
    c.colors.hints.bg = accent
    c.colors.hints.fg = bg_primary
    c.hints.border = "1px solid " + accent
    c.hints.radius = 0
    c.colors.hints.match.fg = fg_highlight
    # }}}

    # keyhints {{{
    c.colors.keyhint.bg = bg_secondary
    c.colors.keyhint.fg = fg_secondary
    c.colors.keyhint.suffix.fg = fg_highlight
    # }}}

    # messages {{{
    c.colors.messages.error.bg = bg_panel
    c.colors.messages.info.bg = bg_panel
    c.colors.messages.warning.bg = bg_panel
    c.colors.messages.error.border = bg_contrast
    c.colors.messages.info.border = bg_contrast
    c.colors.messages.warning.border = bg_contrast
    c.colors.messages.error.fg = accent_deep
    c.colors.messages.info.fg = fg_primary
    c.colors.messages.warning.fg = accent_alt
    # }}}

    # prompts {{{
    c.colors.prompts.bg = bg_panel
    c.colors.prompts.border = "1px solid " + accent
    c.colors.prompts.fg = fg_primary
    c.colors.prompts.selected.bg = accent_glow
    c.colors.prompts.selected.fg = fg_highlight
    # }}}

    # statusbar {{{
    c.colors.statusbar.normal.bg = bg_primary
    c.colors.statusbar.insert.bg = accent
    c.colors.statusbar.command.bg = bg_secondary
    c.colors.statusbar.caret.bg = bg_secondary
    c.colors.statusbar.caret.selection.bg = bg_secondary
    c.colors.statusbar.progress.bg = accent_glow
    c.colors.statusbar.passthrough.bg = accent_deep
    c.colors.statusbar.normal.fg = fg_primary
    c.colors.statusbar.insert.fg = bg_primary
    c.colors.statusbar.command.fg = fg_primary
    c.colors.statusbar.passthrough.fg = fg_highlight
    c.colors.statusbar.caret.fg = fg_highlight
    c.colors.statusbar.caret.selection.fg = fg_highlight
    c.colors.statusbar.url.error.fg = accent_deep
    c.colors.statusbar.url.fg = fg_secondary
    c.colors.statusbar.url.hover.fg = accent_link
    c.colors.statusbar.url.success.http.fg = accent_alt
    c.colors.statusbar.url.success.https.fg = accent
    c.colors.statusbar.url.warn.fg = accent_hover
    c.colors.statusbar.private.bg = bg_panel
    c.colors.statusbar.private.fg = fg_secondary
    c.colors.statusbar.command.private.bg = bg_secondary
    c.colors.statusbar.command.private.fg = fg_secondary
    # }}}

    # tabs {{{
    c.colors.tabs.bar.bg = bg_secondary
    c.colors.tabs.even.bg = bg_panel
    c.colors.tabs.odd.bg = bg_panel
    c.colors.tabs.even.fg = fg_secondary
    c.colors.tabs.odd.fg = fg_secondary
    c.colors.tabs.indicator.error = accent_deep
    c.colors.tabs.indicator.system = "none"
    c.colors.tabs.selected.even.bg = accent
    c.colors.tabs.selected.odd.bg = accent
    c.colors.tabs.selected.even.fg = fg_primary
    c.colors.tabs.selected.odd.fg = fg_primary
    # }}}

    # context menus {{{
    c.colors.contextmenu.menu.bg = bg_primary
    c.colors.contextmenu.menu.fg = fg_primary
    c.colors.contextmenu.menu.border = accent
    c.colors.contextmenu.disabled.bg = bg_secondary
    c.colors.contextmenu.disabled.fg = fg_secondary
    c.colors.contextmenu.selected.bg = accent
    c.colors.contextmenu.selected.fg = bg_primary
    # }}}
