import whale
config.load_autoconfig(False)
whale.setup(c)
c.url.searchengines = {
    'DEFAULT': 'https://www.google.com/search?hl=en&q={}',
    'ddg': 'https://duckduckgo.com/?q={}',
    'yt': 'https://www.youtube.com/results?search_query={}',
    'gh': 'https://github.com/search?q={}',
    'aw': 'https://wiki.archlinux.org/index.php?search={}',
    'ai':  'https://chatgpt.com/?autosend=1&model=gpt-5&q={}',
    'ait': 'https://chatgpt.com/?autosend=1&model=gpt-5-thinking&q={}',
    'gem': 'https://aistudio.google.com/prompts/new_chat?model=gemini-3-pro-preview&prompt={}&autosend=1',
}

config.bind('j', 'cmd-run-with-count 7 scroll down')
config.bind('k', 'cmd-run-with-count 7 scroll up')
config.bind('c', 'tab-clone')
c.content.javascript.clipboard = 'access'
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
config.bind('<Ctrl-Space>', 'hint scrollables javascript focus.js')
config.bind('<Ctrl-J>', 'hint all right-click')
config.bind('<Ctrl-K>', 'hint all hover')
config.set('content.media.audio_capture', True, 'https://discord.com/*')
c.tabs.position = 'left'
c.tabs.width = 175
config.bind('<Shift+e>', 'tab-move +')
config.bind('e', 'tab-move -')
c.colors.webpage.bg = '#00050f' # Anti flashbang
c.content.pdfjs = True
c.content.autoplay = True
config.set("content.autoplay", False, "https://www.youtube.com/*")
config.set("content.autoplay", False, "https://music.youtube.com/*")
config.set("content.autoplay", True, "https://discord.com/*")
c.qt.args += ['autoplay-policy=no-user-gesture-required']

# CSS overrides
config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/default.css"])
config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/null.css"], "monkeytype.com/*")
config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/pdf.css"], "qute://pdfjs/web/viewer.html?filename=*")
config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/github.css"], "github.com/*")
for m in ['insert', 'passthrough', 'command', 'caret', 'prompt']:
    config.bind('<F13>', 'mode-leave', mode=m)
config.bind('<F13>', 'mode-leave', mode='insert')
