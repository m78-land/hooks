(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28,27],{"0Owb":function(n,a,s){"use strict";function t(){return t=Object.assign||function(n){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var t in s)Object.prototype.hasOwnProperty.call(s,t)&&(n[t]=s[t])}return n},t.apply(this,arguments)}s.d(a,"a",(function(){return t}))},gruI:function(n,a,s){"use strict";s.r(a);var t=s("0Owb"),e=s("q1tI"),p=s.n(e),o=(s("B2uJ"),s("5Yjd")),c=s.n(o),u=p.a.memo((function(){var n=t(s("q1tI")),a=t(s("xz6T"));function t(n){return n&&n.__esModule?n:{default:n}}var e=function(){return n["default"].createElement(a["default"],null)};return n["default"].createElement(e)}));a["default"]=function(){return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{className:"markdown"},p.a.createElement("h1",{id:"userefize"},p.a.createElement("a",{"aria-hidden":"true",href:"#userefize"},p.a.createElement("span",{className:"icon icon-link"})),"useRefize"),p.a.createElement("p",null,"\u5c06\u4e00\u7ec4",p.a.createElement("code",null,"state"),"\u6216",p.a.createElement("code",null,"prop"),"\u503c ref \u5316\uff0c\u4ee5\u4fbf\u5728\u7ec4\u4ef6\u4efb\u610f\u4f4d\u7f6e\u5b89\u5168\u4f7f\u7528"),p.a.createElement("h2",{id:"\u793a\u4f8b"},p.a.createElement("a",{"aria-hidden":"true",href:"#\u793a\u4f8b"},p.a.createElement("span",{className:"icon icon-link"})),"\u793a\u4f8b")),p.a.createElement(c.a,Object(t["a"])({source:{raw:"import React, { useState, useCallback } from 'react';\r\nimport { UseRefize } from './useRefize';\r\n\r\nconst useRefizeDemo = () => {\r\n  const [count, setCount] = useState(0);\r\n  const refState = UseRefize({\r\n    count,\r\n  });\r\n\r\n  const log = useCallback(() => {\r\n    console.log(count);\r\n    console.log(refState.count);\r\n  }, []);\r\n\r\n  return (\r\n    <div>\r\n      <h3>useRefizeDemo</h3>\r\n      <button onClick={() => setCount(prev => prev + 1)}>change {count}</button>\r\n      <button onClick={log}>log</button>\r\n    </div>\r\n  );\r\n};\r\n\r\nexport default useRefizeDemo;\r\n",jsx:'<pre class="language-jsx"><code class="language-jsx"><span class="token keyword module">import</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useCallback <span class="token punctuation">}</span> <span class="token keyword module">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\r\n<span class="token keyword module">import</span> <span class="token punctuation">{</span> <span class="token maybe-class-name">UseRefize</span> <span class="token punctuation">}</span> <span class="token keyword module">from</span> <span class="token string">\'./useRefize\'</span><span class="token punctuation">;</span>\r\n\r\n<span class="token keyword">const</span> <span class="token function-variable function">useRefizeDemo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\r\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token keyword">const</span> refState <span class="token operator">=</span> <span class="token function"><span class="token maybe-class-name">UseRefize</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>\r\n    count<span class="token punctuation">,</span>\r\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token keyword">const</span> log <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\r\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>refState<span class="token punctuation">.</span><span class="token property-access">count</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\r\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">useRefizeDemo</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">prev</span> <span class="token arrow operator">=></span> prev <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">change </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>log<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">log</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\r\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\r\n\r\n<span class="token keyword module">export</span> <span class="token keyword module">default</span> useRefizeDemo<span class="token punctuation">;</span>\r\n\n</code></pre>',tsx:'<pre class="language-tsx"><code class="language-tsx"><span class="token keyword">import</span> <span class="token maybe-class-name">React</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useCallback <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\r\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token maybe-class-name">UseRefize</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./useRefize\'</span><span class="token punctuation">;</span>\r\n\r\n<span class="token keyword">const</span> <span class="token function-variable function">useRefizeDemo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\r\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token keyword">const</span> refState <span class="token operator">=</span> <span class="token function"><span class="token maybe-class-name">UseRefize</span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>\r\n    count<span class="token punctuation">,</span>\r\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n\r\n  <span class="token keyword">const</span> log <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\r\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>refState<span class="token punctuation">.</span><span class="token property-access">count</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n\r\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\r\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">useRefizeDemo</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>h3</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">prev</span> <span class="token arrow operator">=></span> prev <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">change </span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>log<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">log</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>button</span><span class="token punctuation">></span></span><span class="token plain-text">\r\n    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\r\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\r\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\r\n\r\n<span class="token keyword">export</span> <span class="token keyword">default</span> useRefizeDemo<span class="token punctuation">;</span>\r\n\n</code></pre>'}},{path:"/_demos/use-refize.demo",dependencies:{}}),p.a.createElement(u,null)),p.a.createElement("div",{className:"markdown"},p.a.createElement("h2",{id:"api"},p.a.createElement("a",{"aria-hidden":"true",href:"#api"},p.a.createElement("span",{className:"icon icon-link"})),"API"),p.a.createElement("pre",{className:"language-ts"},p.a.createElement("code",{className:"language-ts"},p.a.createElement("span",{className:"token maybe-class-name"},"UseRefize"),p.a.createElement("span",{className:"token operator"},"<"),p.a.createElement("span",{className:"token constant"},"T")," ",p.a.createElement("span",{className:"token keyword"},"extends")," ",p.a.createElement("span",{className:"token class-name"},"AnyObject"),p.a.createElement("span",{className:"token operator"},">"),p.a.createElement("span",{className:"token punctuation"},"("),"refState",p.a.createElement("span",{className:"token punctuation"},":")," ",p.a.createElement("span",{className:"token constant"},"T"),p.a.createElement("span",{className:"token punctuation"},")"),p.a.createElement("span",{className:"token punctuation"},":")," ",p.a.createElement("span",{className:"token constant"},"T"),p.a.createElement("br",null)))))}},tJVT:function(n,a,s){"use strict";function t(n){if(Array.isArray(n))return n}function e(n,a){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n)){var s=[],t=!0,e=!1,p=void 0;try{for(var o,c=n[Symbol.iterator]();!(t=(o=c.next()).done);t=!0)if(s.push(o.value),a&&s.length===a)break}catch(u){e=!0,p=u}finally{try{t||null==c["return"]||c["return"]()}finally{if(e)throw p}}return s}}function p(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(n,a){return t(n)||e(n,a)||p()}s.d(a,"a",(function(){return o}))},xz6T:function(n,a,s){"use strict";s.r(a);var t=s("tJVT"),e=s("q1tI"),p=s.n(e);function o(n){var a=Object(e["useRef"])({});return a.current=Object.assign(a.current,n),a.current}var c=()=>{var n=Object(e["useState"])(0),a=Object(t["a"])(n,2),s=a[0],c=a[1],u=o({count:s}),l=Object(e["useCallback"])(()=>{console.log(s),console.log(u.count)},[]);return p.a.createElement("div",null,p.a.createElement("h3",null,"useRefizeDemo"),p.a.createElement("button",{onClick:()=>c(n=>n+1)},"change ",s),p.a.createElement("button",{onClick:l},"log"))};a["default"]=c}}]);