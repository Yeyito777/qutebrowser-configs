"""Twitter x-client-transaction-id fixer for qutebrowser.

QtWebEngine generates invalid transaction IDs because its CSS animation
rendering differs from Chrome.  This module provides a qutebrowser request
interceptor that replaces them with valid ones computed via the
x_client_transaction Python library.

Usage in config.py:
    import twitter_txid
    twitter_txid.register()
"""

import json
import threading
import time
import traceback

# Lazy imports for heavy deps (don't slow down config load)
_ct = None
_ct_lock = threading.Lock()
_ct_created = 0.0
_CT_TTL = 1800  # refresh every 30 min
_init_thread = None


def _init_ct():
    """Fetch x.com homepage + ondemand JS and build a ClientTransaction."""
    import requests as req_lib
    import bs4
    from x_client_transaction import ClientTransaction
    from x_client_transaction.utils import generate_headers, get_ondemand_file_url

    session = req_lib.Session()
    session.headers = generate_headers()
    home_page = session.get("https://x.com")
    soup = bs4.BeautifulSoup(home_page.content, "html.parser")
    ondemand_url = get_ondemand_file_url(response=soup)
    ondemand_file = session.get(url=ondemand_url)
    return ClientTransaction(
        home_page_response=soup,
        ondemand_file_response=ondemand_file.text,
    )


def _ensure_ct():
    """Return a valid ClientTransaction, refreshing if stale. Thread-safe."""
    global _ct, _ct_created, _init_thread

    with _ct_lock:
        if _ct is not None and (time.time() - _ct_created) < _CT_TTL:
            return _ct

        # Need refresh. If we have a stale one, return it while refreshing in bg.
        if _ct is not None:
            # Trigger background refresh
            if _init_thread is None or not _init_thread.is_alive():
                def _bg_refresh():
                    global _ct, _ct_created, _init_thread
                    try:
                        new_ct = _init_ct()
                        with _ct_lock:
                            _ct = new_ct
                            _ct_created = time.time()
                    except Exception:
                        traceback.print_exc()
                _init_thread = threading.Thread(target=_bg_refresh, daemon=True)
                _init_thread.start()
            return _ct

        # First-time init — must block (no stale value to return)
        # Do it in the current thread but release lock during network I/O
    # Released lock — init outside lock to avoid blocking other threads
    try:
        new_ct = _init_ct()
        with _ct_lock:
            _ct = new_ct
            _ct_created = time.time()
        return _ct
    except Exception:
        traceback.print_exc()
        return None


def generate_txid(method, path):
    """Generate a valid x-client-transaction-id for the given method + API path."""
    ct = _ensure_ct()
    if ct is None:
        return None
    try:
        return ct.generate_transaction_id(method=method, path=path)
    except Exception:
        traceback.print_exc()
        return None


def _interceptor(request):
    """qutebrowser request interceptor — fix Twitter transaction IDs."""
    url = request.request_url
    host = url.host()

    # Only intercept Twitter API requests
    if host not in ("x.com", "api.x.com", "twitter.com", "api.twitter.com"):
        return

    path = url.path()
    if "/api/" not in path and "/i/api/" not in path and "/1.1/" not in path and "/2/" not in path:
        return

    # Get the raw QWebEngineUrlRequestInfo to modify headers
    info = getattr(request, '_webengine_info', None)
    if info is None:
        return

    method = bytes(info.requestMethod()).decode('ascii', errors='replace')

    # Generate a valid transaction ID
    txid = generate_txid(method, path)
    if txid:
        info.setHttpHeader(b'x-client-transaction-id', txid.encode('ascii'))


def register():
    """Register the interceptor. Call from config.py."""
    from qutebrowser.api import interceptor
    interceptor.register(_interceptor)

    # Pre-warm the ClientTransaction in background
    t = threading.Thread(target=_ensure_ct, daemon=True)
    t.start()
