globalThis['__jf_context'] = "content/core"; var L0=Object.create;var{getPrototypeOf:N0,defineProperty:Z0,getOwnPropertyNames:c0}=Object;var k0=Object.prototype.hasOwnProperty;var a=(x,Q,$)=>{$=x!=null?L0(N0(x)):{};let f=Q||!x||!x.__esModule?Z0($,"default",{value:x,enumerable:!0}):$;for(let B of c0(x))if(!k0.call(f,B))Z0(f,B,{get:()=>x[B],enumerable:!0});return f};var h0=(x,Q)=>()=>(Q||x((Q={exports:{}}).exports,Q),Q.exports);var v=h0((x0,W0)=>{(function(x,Q){if(typeof define==="function"&&define.amd)define("webextension-polyfill",["module"],Q);else if(typeof x0<"u")Q(W0);else{var $={exports:{}};Q($),x.browser=$.exports}})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:x0,function(x){if(!(globalThis.chrome&&globalThis.chrome.runtime&&globalThis.chrome.runtime.id))throw Error("This script should only be loaded in a browser extension.");if(!(globalThis.browser&&globalThis.browser.runtime&&globalThis.browser.runtime.id)){let $=(f)=>{let B={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(B).length===0)throw Error("api-metadata.json has not been included in browser-polyfill");class H extends WeakMap{constructor(b,q=void 0){super(q);this.createItem=b}get(b){if(!this.has(b))this.set(b,this.createItem(b));return super.get(b)}}let G=(b)=>{return b&&typeof b==="object"&&typeof b.then==="function"},c=(b,q)=>{return(...U)=>{if(f.runtime.lastError)b.reject(Error(f.runtime.lastError.message));else if(q.singleCallbackArg||U.length<=1&&q.singleCallbackArg!==!1)b.resolve(U[0]);else b.resolve(U)}},W=(b)=>b==1?"argument":"arguments",L=(b,q)=>{return function(X,...Y){if(Y.length<q.minArgs)throw Error(`Expected at least ${q.minArgs} ${W(q.minArgs)} for ${b}(), got ${Y.length}`);if(Y.length>q.maxArgs)throw Error(`Expected at most ${q.maxArgs} ${W(q.maxArgs)} for ${b}(), got ${Y.length}`);return new Promise((k,D)=>{if(q.fallbackToNoCallback)try{X[b](...Y,c({resolve:k,reject:D},q))}catch(K){console.warn(`${b} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,K),X[b](...Y),q.fallbackToNoCallback=!1,q.noCallback=!0,k()}else if(q.noCallback)X[b](...Y),k();else X[b](...Y,c({resolve:k,reject:D},q))})}},N=(b,q,U)=>{return new Proxy(q,{apply(X,Y,k){return U.call(Y,b,...k)}})},h=Function.call.bind(Object.prototype.hasOwnProperty),Z=(b,q={},U={})=>{let X=Object.create(null),Y={has(D,K){return K in b||K in X},get(D,K,J){if(K in X)return X[K];if(!(K in b))return;let V=b[K];if(typeof V==="function")if(typeof q[K]==="function")V=N(b,b[K],q[K]);else if(h(U,K)){let w=L(K,U[K]);V=N(b,b[K],w)}else V=V.bind(b);else if(typeof V==="object"&&V!==null&&(h(q,K)||h(U,K)))V=Z(V,q[K],U[K]);else if(h(U,"*"))V=Z(V,q[K],U["*"]);else return Object.defineProperty(X,K,{configurable:!0,enumerable:!0,get(){return b[K]},set(w){b[K]=w}}),V;return X[K]=V,V},set(D,K,J,V){if(K in X)X[K]=J;else b[K]=J;return!0},defineProperty(D,K,J){return Reflect.defineProperty(X,K,J)},deleteProperty(D,K){return Reflect.deleteProperty(X,K)}},k=Object.create(b);return new Proxy(k,Y)},F=(b)=>({addListener(q,U,...X){q.addListener(b.get(U),...X)},hasListener(q,U){return q.hasListener(b.get(U))},removeListener(q,U){q.removeListener(b.get(U))}}),z=new H((b)=>{if(typeof b!=="function")return b;return function(U){let X=Z(U,{},{getContent:{minArgs:0,maxArgs:0}});b(X)}}),T=new H((b)=>{if(typeof b!=="function")return b;return function(U,X,Y){let k=!1,D,K=new Promise((u)=>{D=function(O){k=!0,u(O)}}),J;try{J=b(U,X,D)}catch(u){J=Promise.reject(u)}let V=J!==!0&&G(J);if(J!==!0&&!V&&!k)return!1;let w=(u)=>{u.then((O)=>{Y(O)},(O)=>{let r;if(O&&(O instanceof Error||typeof O.message==="string"))r=O.message;else r="An unexpected error occurred";Y({__mozWebExtensionPolyfillReject__:!0,message:r})}).catch((O)=>{console.error("Failed to send onMessage rejected reply",O)})};if(V)w(J);else w(K);return!0}}),d=({reject:b,resolve:q},U)=>{if(f.runtime.lastError)if(f.runtime.lastError.message==="The message port closed before a response was received.")q();else b(Error(f.runtime.lastError.message));else if(U&&U.__mozWebExtensionPolyfillReject__)b(Error(U.message));else q(U)},A=(b,q,U,...X)=>{if(X.length<q.minArgs)throw Error(`Expected at least ${q.minArgs} ${W(q.minArgs)} for ${b}(), got ${X.length}`);if(X.length>q.maxArgs)throw Error(`Expected at most ${q.maxArgs} ${W(q.maxArgs)} for ${b}(), got ${X.length}`);return new Promise((Y,k)=>{let D=d.bind(null,{resolve:Y,reject:k});X.push(D),U.sendMessage(...X)})},j={devtools:{network:{onRequestFinished:F(z)}},runtime:{onMessage:F(T),onMessageExternal:F(T),sendMessage:A.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:A.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},R={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return B.privacy={network:{"*":R},services:{"*":R},websites:{"*":R}},Z(f,j,B)};x.exports=$(chrome)}else x.exports=globalThis.browser})});var D0=!0,e="Invariant failed";function I(x,Q){if(x)return;if(D0)throw Error(e);var $=typeof Q==="function"?Q():Q,f=$?"".concat(e,": ").concat($):e;throw Error(f)}var Y0=a(v(),1);var J0=document.createElement("span"),g=()=>J0.cloneNode(!1),M=(x)=>{let Q=g();return Q.className=x,Q},S=(x,Q)=>{let $=g();return $.className=Q,$.innerText=x,$},_={t_entry:M("entry"),t_exp:M("e"),t_key:M("k"),t_string:M("s"),t_number:M("n"),t_null:S("null","nl"),t_true:S("true","bl"),t_false:S("false","bl"),t_oBrace:S("{","b"),t_cBrace:S("}","b"),t_oBracket:S("[","b"),t_cBracket:S("]","b"),t_sizeComment:M("sizeComment"),t_ellipsis:M("ell"),t_blockInner:M("blockInner"),t_colonAndSpace:document.createTextNode(": "),t_commaText:document.createTextNode(","),t_dblqText:document.createTextNode('"')};var f0=1,b0=2,y=3,o=4,Q0=5,$0=6;var m=(x,Q)=>{let $=(()=>{if(typeof x==="string")return f0;if(typeof x==="number")return b0;if(x===!1||x===!0)return Q0;if(x===null)return $0;if(Array.isArray(x))return o;return y})(),f=_.t_entry.cloneNode(!1),B=0;if($===y)B=Object.keys(x).length;else if($===o)B=x.length;let H=!1;if($===y||$===o){for(let W in x)if(x.hasOwnProperty(W)){H=!0;break}if(H)f.appendChild(_.t_exp.cloneNode(!1))}if(Q!==!1){f.classList.add("objProp");let W=_.t_key.cloneNode(!1);W.textContent=JSON.stringify(Q).slice(1,-1),f.appendChild(_.t_dblqText.cloneNode(!1)),f.appendChild(W),f.appendChild(_.t_dblqText.cloneNode(!1)),f.appendChild(_.t_colonAndSpace.cloneNode(!1))}else f.classList.add("arrElem");let G,c;switch($){case f0:{I(typeof x==="string");let W=g(),L=JSON.stringify(x);if(L=L.substring(1,L.length-1),x.substring(0,8)==="https://"||x.substring(0,7)==="http://"||x[0]==="/"){let h=document.createElement("a");h.href=x,h.innerText=L,W.appendChild(h)}else W.innerText=L;let N=_.t_string.cloneNode(!1);N.appendChild(_.t_dblqText.cloneNode(!1)),N.appendChild(W),N.appendChild(_.t_dblqText.cloneNode(!1)),f.appendChild(N);break}case b0:{let W=_.t_number.cloneNode(!1);W.innerText=String(x),f.appendChild(W);break}case y:{if(I(typeof x==="object"),f.appendChild(_.t_oBrace.cloneNode(!0)),H){f.appendChild(_.t_ellipsis.cloneNode(!1)),G=_.t_blockInner.cloneNode(!1);let W;for(let L in x){c=m(x[L],L);let N=_.t_commaText.cloneNode();c.appendChild(N),G.appendChild(c),W=N}I(typeof c<"u"&&typeof W<"u"),c.removeChild(W),f.appendChild(G)}f.appendChild(_.t_cBrace.cloneNode(!0)),f.dataset.size=` // ${B} ${B===1?"item":"items"}`;break}case o:{if(I(Array.isArray(x)),f.appendChild(_.t_oBracket.cloneNode(!0)),H){f.appendChild(_.t_ellipsis.cloneNode(!1)),G=_.t_blockInner.cloneNode(!1);for(let W=0,L=x.length,N=L-1;W<L;W++){if(c=m(x[W],!1),W<N){let h=_.t_commaText.cloneNode();c.appendChild(h)}G.appendChild(c)}f.appendChild(G)}f.appendChild(_.t_cBracket.cloneNode(!0)),f.dataset.size=` // ${B} ${B===1?"item":"items"}`;break}case Q0:{if(x)f.appendChild(_.t_true.cloneNode(!0));else f.appendChild(_.t_false.cloneNode(!0));break}case $0:{f.appendChild(_.t_null.cloneNode(!0));break}}return f};var X0=(x)=>{let Q=!1,$;return()=>{if(!Q)$=x(),Q=!0;return $}};var I0=()=>{let x=null,Q=null,$=document.body.children,f=$.length,B=[];for(let H=0;H<f;H++){let G=$[H];switch(B[H]=G,G.tagName){case"PRE":{if(x!=null)return{isTextPage:!1,note:"Multiple body > pre elements"};x=G;break}case"P":case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":case"UL":case"OL":return{isTextPage:!1,note:"body contains textual elements"};default:}}if(x==null)return{isTextPage:!1,note:"No body > pre"};if(x.checkVisibility?.()===!1)return{isTextPage:!1,note:"body > pre is not rendered"};return{isTextPage:!0,pre:x,chromeJfc:Q,bodyChildren:B}},T0=()=>{let{contentType:x}=document;if(!x)return"EMPTY";switch(x){case"text/html":case"application/html":return"HTML";case"application/json":case"text/json":return"JSON";default:if(/application\/\^(\b)+\+json/.test(x))return"JSON"}return"OTHER"},z0=X0(()=>{if(document.title)return{isTextPage:null,note:"document.title has content"};let x=T0();switch(x){case"JSON":case"OTHER":case"EMPTY":return{docHint:x,...I0()}}return{docHint:x,isTextPage:null,note:"Could not determine"}});var O0="production",n=O0==="development",F0=3000000,p=!1,i=globalThis.__jf_context;if(n)switch(i){case"content/core":case"content/console":case"worker/worker":case"options/options":break;default:I(i,`Unexpected value for globalThis.__jf_context: ${i}`)}var C=a(v(),1);function l(x,Q){return new Promise(($,f)=>{let B={type:x,payload:Q};try{C.default.runtime.sendMessage(B).then((H)=>{if(C.default.runtime.lastError){s("sendMessage failed",C.default.runtime.lastError),f(Error(C.default.runtime.lastError.message));return}$(H)})}catch(H){f(H)}})}function s0(x,Q){let $=(f,B)=>{if(typeof f==="object"&&f!==null&&"type"in f&&f.type===x)return Q(f.payload,B)};return C.default.runtime.onMessage.addListener($),()=>C.default.runtime.onMessage.removeListener($)}var q0=(x,Q)=>{console.log(`\uD83C\uDF10: ${x}`,Q)},j0=(x,Q)=>{if(i==="worker/worker")q0(x,Q);else l("JF_GLOBAL_LOG",{message:x,payload:Q})},s=n?q0:()=>{},P=n?j0:()=>{},e0=q0;var B0,_0=()=>{if(!B0)B0=new Promise((x)=>{let{readyState:Q}=document;if(Q==="interactive"||Q==="complete")x();else document.addEventListener("DOMContentLoaded",()=>x(),{once:!0})});return B0};var E=a(v(),1);function H0(x,Q){return{defaultValue:x,validate:Q}}class U0{schema;storageKey;changeListeners=new Set;changeListener;constructor(x,Q="preferences"){this.schema=x;this.storageKey=Q;this.changeListener=($)=>{let f=$[this.storageKey];if(f)for(let B of this.changeListeners?[...this.changeListeners]:[]){if(typeof B!=="function")continue;if(f.newValue)if(this.isValid(f.newValue))B({oldValue:f.oldValue,newValue:f.newValue});else P("Bad change detected, ignoring",f);else B({oldValue:f.oldValue,newValue:void 0})}},E.default.storage.local.onChanged.addListener(this.changeListener)}isValid(x){if(typeof x!=="object"||x===null)return!1;for(let Q in this.schema){let $=this.schema[Q].validate;if(!$(x[Q]))return!1}return!0}async get(){return new Promise((x)=>{E.default.storage.local.get([this.storageKey]).then((Q)=>{let $=Q[this.storageKey]??{},f={};for(let B in this.schema){let H=this.schema[B],G=$[B];if(H.validate(G))f[B]=G;else{if(G!==void 0)console.warn(`[Preferences] Invalid value for '${B}'. Resetting to default.`,`
Got:`,G);f[B]=H.defaultValue}}x(f)})})}async set(x){let $={...await this.get(),...x};for(let f in this.schema)if(!this.schema[f].validate($[f]))throw Error(`[Preferences] Invalid value for '${f}' during set(). Transaction aborted.`);return new Promise((f)=>{E.default.storage.local.set({[this.storageKey]:$}).then(()=>{f()})})}async reset(){return new Promise((x)=>{E.default.storage.local.set({[this.storageKey]:this.getDefaults()}).then(()=>x())})}async clear(){return new Promise((x)=>{E.default.storage.local.remove(this.storageKey).then(()=>x())})}getDefaults(){let x={};for(let Q in this.schema)x[Q]=this.schema[Q].defaultValue;return x}onChange(x){return this.changeListeners.add(x),()=>{this.changeListeners.delete(x)}}}var G0={themeOverride:H0("system",(x)=>{switch(x){case"system":case"force_dark":case"force_light":return!0}return!1})},qx=Object.keys(G0),V0=new U0(G0,"user_prefs_v3");var t=`body {
  background-color: #fff;
  user-select: text;
  overflow-y: scroll !important;
  margin: 0;
  position: relative;
  padding-top: 1px; /* hack to prevent margin collapse in 'Raw' */
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  color: #000;
}

#optionBar {
  user-select: none;
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 10px;
  background: #fff;
  box-shadow: 0px 0px 3px 3px #fff;
  padding: 5px;
}
#buttonFormatted,
#buttonPlain {
  border-radius: 2px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  user-select: none;
  background: linear-gradient(#fafafa, #f4f4f4 40%, #e5e5e5);
  border: 1px solid #aaa;
  color: #444;
  font-size: 13px;
  /* text-transform: uppercase; */
  margin-bottom: 0px;
  min-width: 4em;
  padding: 3px 0;
  position: relative;
  z-index: 10;
  display: inline-block;
  width: 80px;
  text-shadow: 1px 1px rgba(255, 255, 255, 0.3);
}
#buttonFormatted {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
#buttonPlain {
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
:is(#buttonPlain, #buttonFormatted):not(.selected):hover {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#fefefe, #f8f8f8 40%, #e9e9e9);
  border-color: #999;
  color: #222;
}
:is(#buttonPlain, #buttonFormatted):active {
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#f4f4f4, #efefef 40%, #dcdcdc);
  color: #333;
}
:is(#buttonPlain, #buttonFormatted).selected {
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #ebebeb linear-gradient(#e4e4e4, #dfdfdf 40%, #dcdcdc);
  color: #333;
}
:is(#buttonPlain, #buttonFormatted):focus {
  outline: 0;
}
.entry {
  display: block;
  padding-left: 20px;
  margin-left: -20px;
  position: relative;
}
#jsonFormatterParsed {
  padding-left: 28px;
  padding-top: 6px;
  line-height: 1.5;
}
#jsonFormatterRaw {
  padding: 36px 10px 5px;
}
.collapsed {
  white-space: nowrap;
}
.collapsed > .blockInner {
  display: none;
}
.collapsed > .ell:after {
  content: '…';
  font-weight: bold;
}
.collapsed > .ell {
  margin: 0 4px;
  color: #888;
}
.collapsed .entry {
  display: inline;
}

.collapsed:after {
  content: attr(data-size);
  color: #aaa;
}

.e {
  width: 20px;
  height: 18px;
  display: block;
  position: absolute;
  left: 0px;
  top: 1px;
  color: black;
  z-index: 5;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.15;
}

.e::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6.9px;
  border-color: transparent transparent transparent currentColor;
  transform: rotate(90deg) translateY(1px);
}

.collapsed > .e::after {
  transform: none;
}

.e:hover {
  opacity: 0.35;
}
.e:active {
  opacity: 0.5;
}
.collapsed .entry .e {
  display: none;
}
.blockInner {
  display: block;
  padding-left: 24px;
  border-left: 1px dotted #bbb;
  margin-left: 2px;
}
#jsonFormatterParsed {
  color: #444;
}

.entry {
  font-size: 13px;
  font-family: monospace;
}

.b {
  font-weight: bold;
}
.s {
  color: #0b7500;
  word-wrap: break-word;
}
a:link,
a:visited {
  text-decoration: none;
  color: inherit;
}
a:hover,
a:active {
  text-decoration: underline;
  color: #050;
}
.bl,
.nl,
.n {
  font-weight: bold;
  color: #1a01cc;
}
.k {
  color: #000;
}

[hidden] {
  display: none !important;
}
span {
  white-space: pre-wrap;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#spinner {
  animation: spin 2s linear infinite;
}
`;var K0=`body {
  background-color: #1a1a1a;
  color: #eee;
  -webkit-font-smoothing: antialiased;
}

a:hover,
a:active {
  color: hsl(114, 90%, 55%);
}

#optionBar {
  -webkit-font-smoothing: subpixel-antialiased;

  background: #1a1a1a;
  box-shadow: 0px 0px 3px 3px #1a1a1a;
}

#jsonFormatterParsed {
  color: #b6b6b6;
}

.blockInner {
  border-color: #4d4d4d;
}

.k {
  color: #fff;
}

.s {
  color: hsl(114, 100%, 35%);
}

.bl,
.nl,
.n {
  color: hsl(200, 100%, 70%);
}

.e {
  color: #fff;
  opacity: 0.25;
}

.e:hover {
  opacity: 0.45;
}
.e:active {
  opacity: 0.6;
}

.collapsed:after {
  color: #707070;
}

:is(#buttonPlain, #buttonFormatted) {
  text-shadow: none;
  border: 0;
  background: hsl(200, 35%, 60%);
  box-shadow: none;
  color: #000;
}

:is(#buttonPlain, #buttonFormatted):not(.selected):hover {
  box-shadow: none;
  background: hsl(200, 50%, 70%);
  color: #000;
}

:is(#buttonPlain, #buttonFormatted).selected {
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.7);
  background: hsl(200, 40%, 60%);
  color: #000;
}
`;var S0=V0.get(),C0=new Promise(async(x)=>{try{switch((await S0).themeOverride){case"force_light":x(t);return;case"force_dark":x(`${t}

${K0}`);return;default:}}catch(Q){P("ERROR",Q)}x(`${t}

@media (prefers-color-scheme: dark) {
${K0}
}`)}),R0=(async()=>{if(!document.body?.children?.length)await _0();let x=z0(),{isTextPage:Q,docHint:$}=x;if(!(Q&&$&&($==="JSON"||$==="EMPTY"||$==="OTHER")))return{rendered:!1};let{pre:f,bodyChildren:B,chromeJfc:H}=x;window.__jf_pre=f;let G=document.body;for(let Z of B)G.removeChild(Z);let c=l("JF_GET_RESPONSE_INFO",{}),W=(()=>{let Z=f.textContent,F=Z.length;if($!=="JSON"&&!H){if(!Z)return!1;if(F>F0)return!1;let[z]=Z.match(/[^\x20\x0a\x0d\x09]/)??[];if(z!=="{"&&z!=="[")return!1}try{let z=JSON.parse(Z);if(!(typeof z==="object"&&z!=null))return!1;return{parsed:z}}catch(z){return P("JSON parse failed",{error:z,pageInfo:x}),!1}})();if(!W){for(let Z=0,F=B.length;Z<F;Z++){let z=B[Z];G.appendChild(z)}return{rendered:!1}}{let Z=W.parsed,F=document.createElement("div");F.id="jsonFormatterParsed",document.body.appendChild(F);let z=document.createElement("div");z.hidden=!0,z.id="jsonFormatterRaw",z.append(f),document.body.appendChild(z);{let d=document.createElement("style");d.id="jfStyleEl",d.insertAdjacentHTML("beforeend",await C0),document.head.appendChild(d),document.head.insertAdjacentHTML("afterbegin",'<meta name="viewport" content="width=device-width, initial-scale=1.0">');let A=document.createElement("div");A.id="optionBar";let j=document.createElement("button"),R=document.createElement("span"),b=document.createElement("button"),q=document.createElement("span");j.appendChild(R),b.appendChild(q),j.id="buttonPlain",R.innerText="Raw",b.id="buttonFormatted",q.innerText="Parsed",b.classList.add("selected");let U=!1;j.addEventListener("mousedown",()=>{if(!U)U=!0,z.hidden=!1,F.hidden=!0,b.classList.remove("selected"),j.classList.add("selected")},!1),b.addEventListener("mousedown",function(){if(U)U=!1,z.hidden=!0,F.hidden=!1,b.classList.add("selected"),j.classList.remove("selected")},!1),A.appendChild(j),A.appendChild(b),document.body.prepend(A),document.addEventListener("mousedown",h)}let T=m(Z,!1);return await Promise.resolve(),F.append(T),{rendered:!0,responseInfoPromise:c}}function L(Z){for(let F=Z.length-1;F>=0;F--)Z[F].classList.add("collapsed")}function N(Z){for(let F=Z.length-1;F>=0;F--)Z[F].classList.remove("collapsed")}function h(Z){let F=Z.target;if(!(F instanceof HTMLElement))return;if(F.className==="e"){Z.preventDefault();let z=F.parentNode;if(I(z instanceof HTMLElement),z.classList.contains("collapsed"))if(Z.metaKey||Z.ctrlKey){let T=z.parentNode;I(T instanceof HTMLElement),N(T.children)}else N([z]);else if(Z.metaKey||Z.ctrlKey){let T=z.parentNode;I(T instanceof HTMLElement),L(T.children)}else L([z])}}})();R0.then(async(x)=>{if(p)performance.mark("DONE");if(x.rendered){if(p)P("MARKS",performance.getEntriesByName("PERF_RENDER_DURATION"));let Q=window.__jf_pre;if(Q){let $=await x.responseInfoPromise;if(p){let f=performance.measure("PERF_RENDERING","SCRIPT_PARSE_START","DONE");Q.dataset.duration=`${f.duration}`,await Y0.default.storage.local.set({perf_lastRenderSpeed:f.duration,perf_lastRenderTime:+new Date})}if($.success)Q.dataset.responseInfo=JSON.stringify($.responseInfo)}else s("⚠️ Unexpeced - could not find window.__jf_pre")}});
