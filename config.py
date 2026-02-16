from typing import Any

config: Any = config  # type: ignore[reportUnboundVariable]
c: Any = c  # type: ignore[reportUnboundVariable]

import whale
config.load_autoconfig(False)
whale.setup(c)
c.url.searchengines = {
    'DEFAULT': 'https://www.google.com/search?hl=en&q={}',
    'ddg': 'https://duckduckgo.com/?q={}',
    'yt': 'https://www.youtube.com/results?search_query={}',
    'gh': 'https://github.com/search?q={}',
    'aw': 'https://wiki.archlinux.org/index.php?search={}',
    'ai': 'https://claude.ai/new?q={}',
    'gpt':  'https://chatgpt.com/?autosend=1&model=gpt-5&q={}',
    'gptt': 'https://chatgpt.com/?autosend=1&model=gpt-5-thinking&q={}',
    'gem': 'https://aistudio.google.com/prompts/new_chat?model=gemini-3-pro-preview&prompt={}&autosend=1',
}

config.bind('j', 'scroll-px 0 280')
config.bind('k', 'scroll-px 0 -280')
config.bind('<Ctrl-U>', 'scroll-px 0 -560')
config.bind('<Ctrl-D>', 'scroll-px 0 560')
config.bind('<Ctrl-B>', 'scroll-px 0 -1120')
config.bind('<Ctrl-F>', 'scroll-px 0 1120')
config.bind('p', 'open -- {clipboard}')
config.bind('P', 'open -t -- {clipboard}') # Consider a primary binding with Ctrl+p/P
config.bind('c', 'tab-clone')
config.bind('<Ctrl-S>', 'shader-toggle')
c.content.javascript.clipboard = 'access'
config.bind('t', 'cmd-set-text -s :tab-focus')
config.set('tabs.new_position.related', 'next')
config.set('tabs.new_position.unrelated', 'next')
c.auto_save.session = True
c.completion.open_categories = ['quickmarks', 'bookmarks', 'history', 'filesystem']

# Unbind the default Alt+number bindings
for i in range(1, 10):
    config.unbind(f'<Alt-{i}>')

# Bind Ctrl+number to go to the corresponding tab
for i in range(1, 10):
    config.bind(f'<Ctrl-{i}>', f'tab-focus {i}')

# Bind Ctrl+Space to hint those scrollable elements
config.bind('<Ctrl-Space>', 'hint scrollables focus')
config.bind('<Ctrl-J>', 'hint rightclickables right-click')
config.bind('<Ctrl-K>', 'hint hoverables hover')

config.set('content.media.audio_capture', True, 'https://discord.com/*')
c.tabs.position = 'left'
c.tabs.width = 175
config.bind('<Shift+e>', 'tab-move +')
config.bind('e', 'tab-move -')
config.bind('=', 'zoom-in')
config.bind('<Ctrl-M>', 'devtools')
config.bind('<Ctrl-N>', 'devtools-focus')
c.devtools.auto_focus = True
c.colors.webpage.bg = '#00050f' # Anti flashbang
c.content.pdfjs = True
c.content.autoplay = True
config.set("content.autoplay", False, "https://www.youtube.com/*")
config.set("content.autoplay", False, "https://music.youtube.com/*")
config.set("content.autoplay", True, "https://discord.com/*")
c.qt.args += ['autoplay-policy=no-user-gesture-required']
c.aliases['noh'] = 'search'
config.bind('<Shift-Escape>', 'fake-key <Escape>', mode='normal')
config.bind('<Shift-Escape>', 'fake-key <Escape>', mode='insert')
config.bind('<Ctrl-Y>', 'yank-dom')
c.bindings.key_mappings.pop('<Ctrl-[>', None)

# CSS overrides
config.set("content.user_stylesheets", ["cssoverrides/default.css"])
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/pdf.css"], "qute://pdfjs/web/viewer.html?filename=*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/github.css"], "github.com/*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/polymarket.css"], "polymarket.com/*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/null.css"], "monkeytype.com/*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/null.css"], "excalidraw.com/*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/default.css"], "localhost:18789/*") # for clawdbot
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/null.css"], "localhost:*/*")
# config.set("content.user_stylesheets", ["~/.config/qutebrowser/cssoverrides/null.css"], "127.0.0.1:*/*")

# Cookie configuration
c.content.cookies.accept = 'no-3rdparty'
c.content.cookies.thirdparty_whitelist = [
    "*://*.recaptcha.net/*",
    "*://*.hcaptcha.com/*",
    "*://accounts.google.com/*",
]

# Get preferences set by user during browsing
config.source('permissions.py')

# Shader configuration
c.content.element_shader = True

# Cosmetic
c.scrolling.smooth_factor = 0.15 # lower = smoother
# c.qt.args = ['show-fps-counter']
