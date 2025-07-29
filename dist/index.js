'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var WidgetContainer = function (_a) {
    var layout = _a.layout, _b = _a.isEditMode, isEditMode = _b === void 0 ? false : _b; _a.onLayoutChange; var onResize = _a.onResize, onMove = _a.onMove, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.gridSize, gridSize = _d === void 0 ? 20 : _d, _e = _a.maxWidth, maxWidth = _e === void 0 ? 1200 : _e, _f = _a.maxHeight, maxHeight = _f === void 0 ? 800 : _f;
    var _g = react.useState(false), isDragging = _g[0], setIsDragging = _g[1];
    var _h = react.useState(false), isResizing = _h[0], setIsResizing = _h[1];
    var _j = react.useState({ x: 0, y: 0, mouseX: 0, mouseY: 0 }), dragStart = _j[0], setDragStart = _j[1];
    var _k = react.useState({ width: 0, height: 0, mouseX: 0, mouseY: 0 }), resizeStart = _k[0], setResizeStart = _k[1];
    var containerRef = react.useRef(null);
    var handleMouseDown = function (e) {
        if (!isEditMode)
            return;
        e.preventDefault();
        e.stopPropagation();
        setDragStart({
            x: layout.position.x,
            y: layout.position.y,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });
        setIsDragging(true);
    };
    var handleMouseMove = function (e) {
        if (!isEditMode)
            return;
        if (isDragging) {
            e.preventDefault();
            // 마우스 움직임 계산
            var deltaX = e.clientX - dragStart.mouseX;
            var deltaY = e.clientY - dragStart.mouseY;
            // 그리드에 맞춰 스냅
            var newX = Math.round((dragStart.x + deltaX) / gridSize) * gridSize;
            var newY = Math.round((dragStart.y + deltaY) / gridSize) * gridSize;
            // 경계 체크 - 격자에 정확히 맞춤
            var clampedX = Math.max(0, Math.min(newX, maxWidth - layout.size.width));
            var clampedY = Math.max(0, Math.min(newY, maxHeight - layout.size.height));
            // 위치가 변경된 경우에만 업데이트
            if (clampedX !== layout.position.x || clampedY !== layout.position.y) {
                onMove === null || onMove === void 0 ? void 0 : onMove(layout.id, { x: clampedX, y: clampedY });
            }
        }
        if (isResizing) {
            e.preventDefault();
            var deltaX = e.clientX - resizeStart.mouseX;
            var deltaY = e.clientY - resizeStart.mouseY;
            // 그리드에 맞춰 스냅
            var newWidth = Math.round((resizeStart.width + deltaX) / gridSize) * gridSize;
            var newHeight = Math.round((resizeStart.height + deltaY) / gridSize) * gridSize;
            // 경계 체크 - 격자에 정확히 맞춤
            var clampedWidth = Math.max(gridSize, Math.min(newWidth, maxWidth - layout.position.x));
            var clampedHeight = Math.max(gridSize, Math.min(newHeight, maxHeight - layout.position.y));
            // 크기가 변경된 경우에만 업데이트
            if (clampedWidth !== layout.size.width || clampedHeight !== layout.size.height) {
                onResize === null || onResize === void 0 ? void 0 : onResize(layout.id, { width: clampedWidth, height: clampedHeight });
            }
        }
    };
    var handleMouseUp = function () {
        setIsDragging(false);
        setIsResizing(false);
    };
    var handleResizeStart = function (e) {
        if (!isEditMode)
            return;
        e.preventDefault();
        e.stopPropagation();
        setResizeStart({
            width: layout.size.width,
            height: layout.size.height,
            mouseX: e.clientX,
            mouseY: e.clientY,
        });
        setIsResizing(true);
    };
    react.useEffect(function () {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return function () {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragStart, resizeStart]);
    var containerStyle = {
        position: 'absolute',
        left: "".concat(layout.position.x, "px"),
        top: "".concat(layout.position.y, "px"),
        width: "".concat(layout.size.width, "px"),
        height: "".concat(layout.size.height, "px"),
        cursor: isEditMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
    };
    return (jsxRuntime.jsxs("div", __assign({ ref: containerRef, className: "widget-container ".concat(isEditMode ? 'edit-mode' : '', " ").concat(isDragging ? 'dragging' : '', " ").concat(className), style: containerStyle, onMouseDown: handleMouseDown }, { children: [jsxRuntime.jsx("div", __assign({ className: "widget-content" }, { children: layout.children })), isEditMode && (jsxRuntime.jsx("div", { className: "widget-resize-handle", onMouseDown: handleResizeStart }))] })));
};

var WidgetGrid = function (_a) {
    var layouts = _a.layouts, _b = _a.isEditMode, isEditMode = _b === void 0 ? false : _b, onLayoutChange = _a.onLayoutChange, _c = _a.width, width = _c === void 0 ? 1400 : _c, _d = _a.height, height = _d === void 0 ? 800 : _d, _e = _a.gridSize, gridSize = _e === void 0 ? 20 : _e;
    var gridStyle = {
        position: 'relative',
        width: "".concat(width, "px"),
        height: "".concat(height, "px"),
        padding: '0px',
        background: '#ffffff',
        overflow: 'auto',
        '--grid-size': "".concat(gridSize, "px"),
    };
    var handleMove = function (id, position) {
        var layout = layouts.find(function (l) { return l.id === id; });
        if (layout) {
            var newLayout = __assign(__assign({}, layout), { position: position });
            onLayoutChange === null || onLayoutChange === void 0 ? void 0 : onLayoutChange(newLayout);
        }
    };
    var handleResize = function (id, size) {
        var layout = layouts.find(function (l) { return l.id === id; });
        if (layout) {
            var newLayout = __assign(__assign({}, layout), { size: size });
            onLayoutChange === null || onLayoutChange === void 0 ? void 0 : onLayoutChange(newLayout);
        }
    };
    return (jsxRuntime.jsx("div", __assign({ className: "widget-grid ".concat(isEditMode ? 'edit-mode' : ''), style: gridStyle }, { children: layouts.map(function (layout) { return (jsxRuntime.jsx(WidgetContainer, { layout: layout, isEditMode: isEditMode, onMove: handleMove, onResize: handleResize, gridSize: gridSize, maxWidth: width, maxHeight: height }, layout.id)); }) })));
};

var WidgetDashboard = function (_a) {
    var layouts = _a.layouts, _b = _a.isEditMode, isEditMode = _b === void 0 ? false : _b, onLayoutsChange = _a.onLayoutsChange, _c = _a.width, width = _c === void 0 ? 1400 : _c, _d = _a.height, height = _d === void 0 ? 800 : _d, _e = _a.gridSize, gridSize = _e === void 0 ? 20 : _e;
    var _f = react.useState(layouts), layoutsState = _f[0], setLayoutsState = _f[1];
    var handleLayoutChange = function (updatedLayout) {
        var newLayouts = layoutsState.map(function (layout) {
            return layout.id === updatedLayout.id ? updatedLayout : layout;
        });
        setLayoutsState(newLayouts);
        onLayoutsChange === null || onLayoutsChange === void 0 ? void 0 : onLayoutsChange(newLayouts);
    };
    return (jsxRuntime.jsx("div", __assign({ className: "widget-dashboard" }, { children: jsxRuntime.jsx(WidgetGrid, { layouts: layoutsState, isEditMode: isEditMode, onLayoutChange: handleLayoutChange, width: width, height: height, gridSize: gridSize }) })));
};

exports.WidgetContainer = WidgetContainer;
exports.WidgetDashboard = WidgetDashboard;
exports.WidgetGrid = WidgetGrid;
exports.default = WidgetDashboard;
//# sourceMappingURL=index.js.map
