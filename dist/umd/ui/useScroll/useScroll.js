(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") factory(exports, require("@swc/helpers/src/_interop_require_default.mjs"), require("@swc/helpers/src/_object_spread.mjs"), require("@swc/helpers/src/_object_spread_props.mjs"), require("@swc/helpers/src/_sliced_to_array.mjs"), require("react"), require("@m78/utils"), require("lodash/clamp"), require("@m78/hooks"), require("react-spring"));
    else if (typeof define === "function" && define.amd) define([
        "exports",
        "@swc/helpers/src/_interop_require_default.mjs",
        "@swc/helpers/src/_object_spread.mjs",
        "@swc/helpers/src/_object_spread_props.mjs",
        "@swc/helpers/src/_sliced_to_array.mjs",
        "react",
        "@m78/utils",
        "lodash/clamp",
        "@m78/hooks",
        "react-spring"
    ], factory);
    else if (global = typeof globalThis !== "undefined" ? globalThis : global || self) factory(global.useScroll = {}, global.interopRequireDefaultMjs, global.objectSpreadMjs, global.objectSpreadPropsMjs, global.slicedToArrayMjs, global.react, global.utils, global.clamp, global.hooks, global.reactSpring);
})(this, function(exports, _interopRequireDefault, _objectSpread, _objectSpreadProps, _slicedToArray, _react, _utils, _clamp, _hooks, _reactSpring) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, "useScroll", {
        enumerable: true,
        get: function() {
            return useScroll;
        }
    });
    _interopRequireDefault = _interopRequireDefault.default;
    _objectSpread = _objectSpread.default;
    _objectSpreadProps = _objectSpreadProps.default;
    _slicedToArray = _slicedToArray.default;
    _clamp = /*#__PURE__*/ _interopRequireDefault(_clamp);
    function useScroll() {
        var ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, el = ref.el, onScroll = ref.onScroll, _throttleTime = ref.throttleTime, throttleTime = _throttleTime === void 0 ? 100 : _throttleTime, _offset = ref.offset, offset = _offset === void 0 ? 0 : _offset, offsetX = ref.offsetX, offsetY = ref.offsetY, _touchOffset = ref.touchOffset, touchOffset = _touchOffset === void 0 ? 0 : _touchOffset;
        var elIsDoc = /** 检测元素是否是body或html节点 */ function elIsDoc(_el) {
            var sEl = _el || getEl();
            return sEl === self1.docEl || sEl === self1.bodyEl;
        };
        var getEl = /** 根据参数获取滚动元素，默认为文档元素 */ function getEl() {
            return (0, _hooks.getRefDomOrDom)(el, ref1) || self1.docEl;
        };
        var animateTo = /** 动画滚动到指定位置 */ function animateTo(sEl, next, now) {
            var isDoc = elIsDoc(sEl);
            spApi(_objectSpreadProps(_objectSpread({}, next), {
                from: now,
                onChange: function(result) {
                    var x = result.value.x;
                    var y = result.value.y;
                    if (isDoc) {
                        setDocPos(x, y);
                    } else {
                        sEl.scrollTop = y;
                        sEl.scrollLeft = x;
                    }
                }
            }));
        };
        var set = /** 根据传入的x、y值设置滚动位置 */ function set(param) {
            var x = param.x, y = param.y, raise = param.raise, immediate = param.immediate;
            var scroller = getEl();
            var ref = get(), xMax = ref.xMax, yMax = ref.yMax, oldX = ref.x, oldY = ref.y;
            var nextPos = {};
            var nowPos = {
                x: oldX,
                y: oldY
            };
            if ((0, _utils.isNumber)(x)) {
                var nextX = x;
                if (raise) {
                    nextX = (0, _clamp.default)(oldX + x, 0, xMax);
                }
                if (nextX !== oldX) {
                    nextPos.x = nextX;
                }
            }
            if ((0, _utils.isNumber)(y)) {
                var nextY = y;
                if (raise) {
                    nextY = (0, _clamp.default)(oldY + y, 0, yMax);
                }
                if (nextY !== oldY) {
                    nextPos.y = nextY;
                }
            }
            if ("x" in nextPos || "y" in nextPos) {
                var isDoc = elIsDoc(scroller);
                if (immediate) {
                    if ((0, _utils.isNumber)(nextPos.x)) {
                        if (isDoc) {
                            setDocPos(nextPos.x);
                        } else {
                            scroller.scrollLeft = nextPos.x;
                        }
                    }
                    if ((0, _utils.isNumber)(nextPos.y)) {
                        if (isDoc) {
                            setDocPos(undefined, nextPos.y);
                        } else {
                            scroller.scrollTop = nextPos.y;
                        }
                    }
                } else {
                    animateTo(scroller, nextPos, nowPos);
                }
            }
        };
        var scrollToElement = function scrollToElement(arg, immediate) {
            var sEl = getEl();
            var isDoc = elIsDoc(sEl);
            var targetEl;
            if (!sEl.getBoundingClientRect) {
                console.warn("The browser does not support `getBoundingClientRect` API");
                return;
            }
            if (typeof arg === "string") {
                targetEl = getEl().querySelector(arg);
            } else {
                targetEl = arg;
            }
            if (!(0, _utils.isDom)(targetEl)) return;
            var ref = targetEl.getBoundingClientRect(), cTop = ref.top, cLeft = ref.left;
            var ref1 = sEl.getBoundingClientRect(), fTop = ref1.top, fLeft = ref1.left;
            /**
     * 使用offsetTop等属性只能获取到元素相对于第一个非常规定位父元素的距离，所以需要单独计算
     * 计算规则: eg. 子元素距离顶部比父元素多100px，滚动条位置应该减少100px让两者等值
     * */ var xOffset = offsetX || offset;
            var yOffset = offsetY || offset;
            set({
                x: cLeft - fLeft + xOffset,
                y: cTop - fTop + yOffset,
                raise: !isDoc,
                immediate: immediate
            });
        };
        var get = /** 获取各种有用的滚动信息 */ function get() {
            var isDoc = elIsDoc();
            var sEl = getEl();
            var x = isDoc ? self1.docEl.scrollLeft + self1.bodyEl.scrollLeft : sEl.scrollLeft;
            var y = isDoc ? self1.docEl.scrollTop + self1.bodyEl.scrollTop : sEl.scrollTop;
            /* chrome高分屏+缩放时，滚动值会是小数，想上取整防止计算错误 */ x = Math.ceil(x);
            y = Math.ceil(y);
            var height = sEl.clientHeight;
            var width = sEl.clientWidth;
            var scrollHeight = sEl.scrollHeight;
            var scrollWidth = sEl.scrollWidth;
            /* chrome下(高分屏+缩放),无滚动的情况下scrollWidth会大于width */ var xMax = Math.max(0, scrollWidth - width);
            var yMax = Math.max(0, scrollHeight - height);
            return {
                el: sEl,
                x: x,
                y: y,
                xMax: xMax,
                yMax: yMax,
                height: height,
                width: width,
                scrollHeight: scrollHeight,
                scrollWidth: scrollWidth,
                touchBottom: yMax - y - touchOffset <= 0,
                touchLeft: x <= touchOffset,
                touchRight: xMax - x - touchOffset <= 0,
                touchTop: y <= touchOffset,
                offsetWidth: sEl.offsetWidth,
                offsetHeight: sEl.offsetHeight
            };
        };
        var setDocPos = /** 设置根级的滚动位置 */ function setDocPos(x, y) {
            if ((0, _utils.isNumber)(x)) {
                // 只有一个会生效
                self1.bodyEl.scrollLeft = x;
                self1.docEl.scrollLeft = x;
            }
            if ((0, _utils.isNumber)(y)) {
                self1.bodyEl.scrollTop = y;
                self1.docEl.scrollTop = y;
            }
        };
        // 用于返回的节点获取ref
        var ref1 = (0, _react.useRef)(null);
        // 获取documentElement和body, 放到useEffect以兼容SSR
        var self1 = (0, _hooks.useSelf)({
            docEl: null,
            bodyEl: null
        });
        var ref2 = _slicedToArray((0, _reactSpring.useSpring)(function() {
            return {
                y: 0,
                x: 0,
                config: _objectSpread({
                    clamp: true
                }, _reactSpring.config.stiff)
            };
        }), 2), spValue = ref2[0], spApi = ref2[1];
        /** 滚动处理 */ var scrollHandle = (0, _hooks.useThrottle)(function() {
            onScroll && onScroll(get());
        }, throttleTime);
        /** 初始化获取根节点 */ (0, _react.useEffect)(function() {
            self1.docEl = document.documentElement;
            self1.bodyEl = document.body;
        }, []);
        /** 绑定滚动事件 */ (0, _react.useEffect)(function() {
            var sEl = getEl();
            /* 坑: 页面级滚动scroll事件绑在documentElement和body上无效, 只能绑在window上 */ var scrollEl = elIsDoc(sEl) ? window : sEl;
            scrollEl.addEventListener("scroll", scrollHandle);
            return function() {
                scrollEl.removeEventListener("scroll", scrollHandle);
            };
        }, [
            el,
            ref1.current
        ]);
        /** 执行滚动、拖动操作时，停止当前正在进行的滚动操作 */ (0, _react.useEffect)(function() {
            var wheelHandle = function wheelHandle() {
                if (spValue.x.isAnimating || spValue.y.isAnimating) {
                    // @ts-ignore
                    spApi.stop();
                }
            };
            var sEl = getEl();
            sEl.addEventListener("wheel", wheelHandle);
            sEl.addEventListener("touchmove", wheelHandle);
            return function() {
                sEl.removeEventListener("wheel", wheelHandle);
                sEl.removeEventListener("touchmove", wheelHandle);
            };
        }, [
            el,
            ref1.current
        ]);
        return {
            set: set,
            get: get,
            scrollToElement: scrollToElement,
            ref: ref1
        };
    }
});
