import whale
config.load_autoconfig()
whale.setup(c)
c.url.searchengines = {
    'DEFAULT': 'https://www.google.com/search?hl=en&q={}',
    'ddg': 'https://duckduckgo.com/?q={}',
    'yt': 'https://www.youtube.com/results?search_query={}',
    'gh': 'https://github.com/search?q={}',
    'aw': 'https://wiki.archlinux.org/index.php?search={}',
    'ai': 'https://chatgpt.com/?q={}',
    # … etc
}

config.bind('j', 'cmd-run-with-count 7 scroll down')
config.bind('k', 'cmd-run-with-count 7 scroll up')
config.bind('c', 'tab-clone')
c.content.javascript.clipboard = 'access'
config.set("content.user_stylesheets", ["~/.config/qutebrowser/blue-theme.css"])
config.bind('t', 'cmd-set-text -s :tab-focus')
config.set('tabs.new_position.related', 'next')
config.set('tabs.new_position.unrelated', 'next')
c.auto_save.session = True

# Unbind the default Alt+number bindings
for i in range(1, 10):
    config.unbind(f'<Alt-{i}>')

# Bind Ctrl+number to go to the corresponding tab
for i in range(1, 10):
    config.bind(f'<Ctrl-{i}>', f'tab-focus {i}')

# === Hint only scrollable elements (works with Greasemonkey script) ===

# Custom hint group for elements tagged by the userscript
c.hints.selectors = {
    **getattr(c, "hints.selectors", {}),
    "scrollables": ['[qt-scrollable="1"]']
}

# Bind Ctrl+Space to hint those scrollable elements
config.bind('<Ctrl-Space>', 'hint scrollables')
config.set('content.media.audio_capture', True, 'https://discord.com/*')
c.tabs.width = 175
config.bind('<Shift+e>', 'tab-move +')
config.bind('e', 'tab-move -')
