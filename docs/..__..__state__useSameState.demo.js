(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"2dX0":function(t,n,e){"use strict";e.d(n,"a",(function(){return u}));var r=e("q1tI");function u(t,n){var e=Object(r["useRef"])(()=>{throw new Error("Cannot call function while rendering")});e.current=t;var u=Object(r["useMemo"])(()=>{var t=function(){return e.current(...arguments)};return n?n(t):t},[]),o=Object(r["useCallback"])(u,[e]);return o}},K3qG:function(t,n,e){"use strict";(function(t){e.d(n,"a",(function(){return O})),e.d(n,"b",(function(){return v})),e.d(n,"c",(function(){return o})),e.d(n,"d",(function(){return l})),e.d(n,"e",(function(){return j})),e.d(n,"f",(function(){return s})),e.d(n,"g",(function(){return c})),e.d(n,"h",(function(){return f}));var r=e("U8pU");e("KQm4"),e("rePB");function u(t){return Object.prototype.toString.call(t)}function o(t){return Array.isArray?Array.isArray(t):"[object Array]"===u(t)}function c(t){return"number"===typeof t}function i(t){return"string"===typeof t}function a(t){return"[object Error]"===u(t)||t instanceof Error}function f(t){return"[object Object]"===u(t)}function l(t){return!!t&&(!(!t.querySelectorAll||!t.querySelector)&&(!(!f(document)||t!==document)||("object"===("undefined"===typeof HTMLElement?"undefined":Object(r["a"])(HTMLElement))?t instanceof HTMLElement:t&&"object"===Object(r["a"])(t)&&1===t.nodeType&&"string"===typeof t.nodeName)))}function b(t){return"[object RegExp]"===u(t)}function s(t){return"function"===typeof t}function d(t){return"[object Date]"===u(t)}function y(t){return"boolean"===typeof t}function m(t){return void 0===t||null===t||""===t||!(!c(t)||!isNaN(t))}function j(t){if(m(t))return!0;if(b(t))return!1;if(d(t))return!1;if(a(t))return!1;if(o(t))return 0===t.length;if(i(t))return 0===t.length;if(c(t))return 0===t;if(y(t))return!t;if(f(t)){for(var n in t)return!1;return!0}return!1}function v(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return Array.from({length:t}).reduce((function(t){return t+Math.random().toString(36).substr(2)}),"")}function p(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof t)return t;throw new Error("unable to locate global object")}var O=p()}).call(this,e("yLpj"))},KQm4:function(t,n,e){"use strict";function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function u(t){if(Array.isArray(t))return r(t)}function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t,n){if(t){if("string"===typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,n):void 0}}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t){return u(t)||o(t)||c(t)||i()}e.d(n,"a",(function(){return a}))},QwEV:function(t,n,e){"use strict";e.d(n,"a",(function(){return a}));var r=e("q1tI"),u=e("K3qG"),o=e("2dX0"),c={};function i(t,n){var e=c[t];Object(u["c"])(e)&&0!==e.length&&e.forEach(t=>{t.handle(n)})}function a(t,n){var e=Object(r["useRef"])(Math.random()),a=t,f=Object(o["a"])((function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];null===n||void 0===n||n(...e)}));return Object(r["useEffect"])(()=>{if(a){Object(u["c"])(c[a])||(c[a]=[]);var t=c[a].findIndex(t=>t.flag===e.current),n={handle:f,flag:e.current};-1!==t?c[a][t]=n:c[a].push(n)}return()=>{var t=c[a];if(a&&t&&0!==t.length){var n=t.findIndex(t=>t.flag===e.current);c[a].splice(n,1)}}},[a]),i}},U8pU:function(t,n,e){"use strict";function r(t){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}e.d(n,"a",(function(){return r}))},hEdC:function(t,n,e){"use strict";var r=e("q1tI");function u(){var t=Object(r["useRef"])(!0);return t.current?(t.current=!1,!0):t.current}var o=function(t,n){var e=u();Object(r["useEffect"])((function(){if(!e)return t()}),n)};n["a"]=o},koca:function(t,n,e){"use strict";e.r(n);var r=e("tJVT"),u=e("q1tI"),o=e.n(u),c=e("K3qG"),i=function(t){return++t%1e6},a=function(){var t=Object(u["useState"])(0),n=t[1];return Object(u["useCallback"])((function(){return n(i)}),[])},f=a,l=e("hEdC"),b=e("QwEV"),s={};function d(t,n,e){var o,i=Object(u["useMemo"])(()=>Object(c["b"])(2),[]),a=Object(u["useState"])(O),d=Object(r["a"])(a,2),y=d[0],m=d[1],j=f(),v="".concat(t,"_same_custom_event"),p=Object(b["a"])(v,t=>{t!==i&&j()});function O(){var u=g(),o=Object(r["a"])(u,2),c=o[0],a=o[1];-1!==a&&c.splice(a,1),n&&s[t].push({id:i,meta:e||{}});var f=g(),l=Object(r["a"])(f,2),b=l[1];return b}function g(){Object(c["c"])(s[t])||(s[t]=[]);var n=s[t].findIndex(t=>t.id===i);return[s[t],n]}function h(t){if("undefined"!==typeof t){var n=g(),e=Object(r["a"])(n,2),u=e[0],o=e[1];-1!==o&&(u[o].meta=t)}}return h(e),Object(l["a"])(()=>{m(O())},[n]),Object(l["a"])(()=>{p(v,i)},[y]),Object(u["useEffect"])(()=>{var t=g(),n=Object(r["a"])(t,2),e=n[1];e!==y&&m(e)},[null===(o=s[t])||void 0===o?void 0:o.length]),[y,s[t],i]}function y(t){var n=t.flag,e=t.show,u=void 0!==e&&e,c=d("same_component",u,{flag:n,show:u}),i=Object(r["a"])(c,3),a=i[0],f=i[1],l=i[2];return o.a.createElement("div",{style:{margin:"24px 0"}},o.a.createElement("div",null,"\u8be5\u7ec4\u4ef6\u4f4d\u4e8e\u5b9e\u4f8b\u7b2c ",a," \u4f4d"),o.a.createElement("div",null,"\u7ec4\u4ef6\u5171\u4eab\u53c2\u6570: ",JSON.stringify(f,null,2)),o.a.createElement("div",null,"\u7ec4\u4ef6id: ",l))}var m=()=>{var t=Object(u["useState"])(!1),n=Object(r["a"])(t,2),e=n[0],c=n[1],i=Object(u["useState"])(!1),a=Object(r["a"])(i,2),f=a[0],l=a[1],b=Object(u["useState"])(!1),s=Object(r["a"])(b,2),d=s[0],m=s[1];return o.a.createElement("div",null,o.a.createElement("button",{onClick:()=>c(t=>!t)},"\u5b9e\u4f8b1 | ",e.toString()),o.a.createElement("button",{onClick:()=>l(t=>!t)},"\u5b9e\u4f8b2 | ",f.toString()),o.a.createElement("button",{onClick:()=>m(t=>!t)},"\u5b9e\u4f8b3 | ",d.toString()),o.a.createElement(y,{flag:"\u6211\u662f\u7b2c\u4e00\u4e2a\u7ec4\u4ef6",show:e}),o.a.createElement(y,{flag:"\u6211\u662f\u7b2c\u4e8c\u4e2a\u7ec4\u4ef6",show:f}),o.a.createElement(y,{flag:"\u6211\u662f\u7b2c\u4e09\u4e2a\u7ec4\u4ef6",show:d}))};n["default"]=m},rePB:function(t,n,e){"use strict";function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}e.d(n,"a",(function(){return r}))},tJVT:function(t,n,e){"use strict";function r(t){if(Array.isArray(t))return t}function u(t,n){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var e=[],r=!0,u=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(r=(c=i.next()).done);r=!0)if(e.push(c.value),n&&e.length===n)break}catch(a){u=!0,o=a}finally{try{r||null==i["return"]||i["return"]()}finally{if(u)throw o}}return e}}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function c(t,n){return r(t)||u(t,n)||o()}e.d(n,"a",(function(){return c}))}}]);