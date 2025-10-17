import whale
config.load_autoconfig()
whale.setup(c)
c.url.searchengines = {
    'DEFAULT': 'https://www.google.com/search?hl=en&q={}',
    'ddg': 'https://duckduckgo.com/?q={}',
    'g': 'https://www.google.com/search?q={}',
    'yt': 'https://www.youtube.com/results?search_query={}',
    # … etc
}

config.bind('j', 'cmd-run-with-count 10 scroll down')
config.bind('k', 'cmd-run-with-count 10 scroll up')
c.content.javascript.clipboard = 'access'
config.set("content.user_stylesheets", ["~/.config/qutebrowser/blue-theme.css"])
