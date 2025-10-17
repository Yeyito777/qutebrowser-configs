import whale
config.load_autoconfig()
whale.setup(c)
c.url.searchengines = {
    'DEFAULT': 'https://www.google.com/search?hl=en&q={}',
    'ddg': 'https://duckduckgo.com/?q={}',
    'yt': 'https://www.youtube.com/results?search_query={}',
    'gh': 'https://github.com/search?q={}',
    'aw': 'https://wiki.archlinux.org/index.php?search={}',
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

# Unbind the default Alt+number bindings
for i in range(1, 10):
    config.unbind(f'<Alt-{i}>')

# Bind Ctrl+number to go to the corresponding tab
for i in range(1, 10):
    config.bind(f'<Ctrl-{i}>', f'tab-focus {i}')

# Focus the main (largest) scrollable element
config.bind(
    '<Space>',
    # 1) leave insert/passthrough at the qutebrowser level
    'fake-key -g <Escape> ;; '
    # 2) native “real” click on likely main containers (works even when JS is odd)
    'click-element --select-first --force-event css main,[role="main"],article,body,:root ;; '
    # 3) robust JS fallback: blur, focus top/body/main, center-click if needed, flash highlight
    'jseval -q "(() => { '
      'try { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); } catch(e) {} '
      'try { if (window.top && window.top !== window) window.top.focus(); } catch(e) {} '
      'const centerX = Math.floor(window.innerWidth/2), centerY = Math.floor(window.innerHeight/2); '
      'let el = document.querySelector(\'main,[role=\"main\"],article\') || document.body || document.documentElement || document.elementFromPoint(centerX, centerY); '
      'if (!el) return; '
      'if (el.tabIndex === undefined || el.tabIndex === null) el.tabIndex = -1; '
      'el.focus({preventScroll:true}); '
      'el.scrollIntoView({block:\'center\', inline:\'nearest\' }); '
      'const r = el.getBoundingClientRect(); '
      'const flash = document.createElement(\'div\'); '
      'flash.style.position = \'fixed\'; flash.style.left = r.left+\'px\'; flash.style.top = r.top+\'px\'; '
      'flash.style.width = r.width+\'px\'; flash.style.height = r.height+\'px\'; '
      'flash.style.pointerEvents = \'none\'; flash.style.outline = \'3px solid orange\'; flash.style.borderRadius = \'6px\'; '
      'flash.style.zIndex = 2147483647; document.body.appendChild(flash); setTimeout(() => flash.remove(), 650); '
      'try { el.click(); } catch(e) {} '
    '})()"'
)
