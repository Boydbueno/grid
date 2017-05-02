/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point =
/**
 * @param {number} x
 * @param {number} y
 */
function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
};

exports.default = Point;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {

    /**
     * @param {Point} start
     * @param {Point} end
     * @param {number} animationDuration
     */
    function Line(start, end) {
        _classCallCheck(this, Line);

        this.start = start;
        this.end = end;
    }

    /**
     * @returns {number}
     */


    _createClass(Line, [{
        key: "getFilledInSlopeInterceptEquation",


        /**
         * @param {number|string} x
         * @param {number|string} y
         * @returns {string}
         */
        value: function getFilledInSlopeInterceptEquation(x, y) {
            return this.slopeInterceptEquation.replace('[x]', x.toFixed(1)).replace('[y]', y.toFixed(1));
        }
    }, {
        key: "deltaX",
        get: function get() {
            return this.end.x - this.start.x;
        }

        /**
         * @returns {number}
         */

    }, {
        key: "deltaY",
        get: function get() {
            return this.end.y - this.start.y;
        }

        /**
         * @returns {number}
         */

    }, {
        key: "slope",
        get: function get() {
            return this.deltaY / this.deltaX;
        }

        /**
         * @returns {number}
         */

    }, {
        key: "yIntercept",
        get: function get() {
            // b = -(mx - y)
            return -(this.slope * this.start.x - this.start.y);
        }

        /**
         * @returns {string}
         */

    }, {
        key: "slopeInterceptEquation",
        get: function get() {

            // Vertical line
            // x = b
            if (this.slope === Infinity) {
                return "x = " + this.start.x;
            }

            // Horizontal line
            // y = b
            if (this.slope === 0) {
                return "y = " + this.yIntercept;
            }

            // Diagonal line
            // y = mx + b
            return "[y] = " + this.slope.toFixed(1) + " * [x] + " + this.yIntercept.toFixed(1);
        }
    }]);

    return Line;
}();

exports.default = Line;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineRenderer = function () {
    _createClass(LineRenderer, [{
        key: "defaultOptions",
        get: function get() {
            return {
                lineColor: '#474747',
                lineWidth: 1,
                animate: {
                    duration: 0
                }
            };
        }

        /**
         * @param line
         * @param options
         */

    }]);

    function LineRenderer(line, options) {
        _classCallCheck(this, LineRenderer);

        this.line = line;
        this.options = Object.assign(this.defaultOptions, options);

        if (this.options.animate.duration > 0) {
            this.animationStartTime = 0;
            this.isDoneAnimating = false;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {float} timestamp
     */


    _createClass(LineRenderer, [{
        key: "animate",
        value: function animate(ctx, timestamp, transformMethod) {
            if (this.animationStartTime === 0) {
                this.animationStartTime = timestamp;
            }

            var deltaTime = timestamp - this.animationStartTime;

            if (deltaTime >= this.options.animate.duration) {
                this.isDoneAnimating = true;
                // Make sure we don't overshoot
                deltaTime = this.options.animate.duration;
            }

            var partialLine = this.getPartial(deltaTime / this.options.animate.duration);
            new LineRenderer(partialLine).draw(ctx, transformMethod);
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */

    }, {
        key: "draw",
        value: function draw(ctx) {
            var transformMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var start = transformMethod === null ? this.line.start : transformMethod(this.line.start);
            var end = transformMethod === null ? this.line.end : transformMethod(this.line.end);

            ctx.strokeStyle = this.options.lineColor;
            ctx.lineWidth = this.options.lineWidth;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }

        /**
         * @param {number} fraction
         * @returns {Line}
         */

    }, {
        key: "getPartial",
        value: function getPartial(fraction) {
            return new _Line2.default(this.line.start, new _Point2.default(this.line.start.x + this.line.deltaX * fraction, this.line.start.y + this.line.deltaY * fraction));
        }
    }]);

    return LineRenderer;
}();

exports.default = LineRenderer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PointRenderer = __webpack_require__(6);

var _PointRenderer2 = _interopRequireDefault(_PointRenderer);

var _LineRenderer = __webpack_require__(2);

var _LineRenderer2 = _interopRequireDefault(_LineRenderer);

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

var _Grid = __webpack_require__(5);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App(canvas) {
        _classCallCheck(this, App);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drawList = [];
        this.animateQueue = [];
        this.hoverPoint = null;

        this.grid = new _Grid2.default(60, canvas);

        this.resizeCanvas(canvas);

        var lineRenderer = new _LineRenderer2.default(new _Line2.default(new _Point2.default(0, 5), new _Point2.default(9, 5)), {
            animate: {
                duration: 1000
            }
        });

        this.animateQueue.push(lineRenderer
        // new Line(new Point(0, 5), new Point(9, 5), 1000),
        // new Line(new Point(9, 5), new Point(9, 9), 1000),
        // new Line(new Point(9, 9), new Point(0, 5), 1000)
        );

        window.requestAnimationFrame(this.render.bind(this));

        this.addEventListeners();
    }

    _createClass(App, [{
        key: "render",
        value: function render(timestamp) {
            var _this = this;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.grid.draw(this.ctx);

            this.handleAnimationQueue(timestamp);

            if (this.drawList.length > 0) {
                this.drawList.forEach(function (drawItem) {
                    drawItem.draw(_this.ctx, _this.grid.transformGridToScreen.bind(_this.grid));
                });
            }

            if (this.hoverPoint) {
                var pointRenderer = new _PointRenderer2.default(this.hoverPoint);
                pointRenderer.draw(this.ctx, this.grid.transformGridToScreen.bind(this.grid));
            }

            window.requestAnimationFrame(this.render.bind(this));
        }
    }, {
        key: "handleAnimationQueue",
        value: function handleAnimationQueue(timestamp) {
            if (this.animateQueue.length === 0) {
                return;
            }

            if (this.animateQueue[0].isDoneAnimating) {
                this.drawList.push(this.animateQueue.shift());
                return;
            }

            this.animateQueue[0].animate(this.ctx, timestamp, this.grid.transformGridToScreen.bind(this.grid));
        }
    }, {
        key: "resizeCanvas",
        value: function resizeCanvas(canvas) {
            // Lookup the size the browser is displaying the canvas.
            var displayWidth = canvas.clientWidth;
            var displayHeight = canvas.clientHeight;

            // Check if the canvas is not the same size.
            if (canvas.width != displayWidth || canvas.height != displayHeight) {
                // Make the canvas the same size
                canvas.width = displayWidth;
                canvas.height = displayHeight;
            }
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners() {
            var _this2 = this;

            window.addEventListener("resize", function () {
                _this2.resizeCanvas(_this2.canvas);
            });

            window.addEventListener("mousemove", function (event) {
                var gridPoint = _this2.grid.transformScreenToGrid(new _Point2.default(event.clientX, event.clientY));
                _this2.hoverPoint = _this2.grid.roundGridPoint(gridPoint);
            });

            window.addEventListener("mouseout", function () {
                _this2.hoverPoint = null;
            });
        }
    }]);

    return App;
}();

exports.default = App;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(3);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

    var canvas = document.getElementById('canvas');
    new _App2.default(canvas);
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LineRenderer = __webpack_require__(2);

var _LineRenderer2 = _interopRequireDefault(_LineRenderer);

var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
    _createClass(Grid, [{
        key: "height",
        get: function get() {
            return this.canvas.clientHeight;
        }
    }, {
        key: "width",
        get: function get() {
            return this.canvas.clientWidth;
        }

        /**
         * @param {number} maxSize
         * @param {Element} canvas
         */

    }]);

    function Grid(maxSize, canvas) {
        _classCallCheck(this, Grid);

        this.maxSize = maxSize;
        this.canvas = canvas;

        this.largestSide = this.width > this.height ? this.width : this.height;
        this.lineInterval = this.largestSide / this.maxSize;
    }

    _createClass(Grid, [{
        key: "draw",
        value: function draw(ctx) {
            this.drawYAxis(ctx);
            this.drawXAxis(ctx);

            var nextLineOffset = this.lineInterval;

            while (nextLineOffset <= this.largestSide / 2) {
                ctx.strokeStyle = '#2f2f2f';

                ctx.beginPath();
                ctx.moveTo(this.width / 2 + nextLineOffset, 0);
                ctx.lineTo(this.width / 2 + nextLineOffset, this.height);
                ctx.stroke();

                ctx.font = '10px serif';
                ctx.fillStyle = "white";
                ctx.textBaseline = 'middle';
                ctx.textAlign = "center";
                ctx.fillText(Math.round(nextLineOffset / this.lineInterval).toString(), this.width / 2 + nextLineOffset, this.height / 2 + 13);

                ctx.beginPath();
                ctx.moveTo(this.width / 2 - nextLineOffset, 0);
                ctx.lineTo(this.width / 2 - nextLineOffset, this.height);
                ctx.stroke();

                ctx.fillText(Math.round(-nextLineOffset / this.lineInterval).toString(), this.width / 2 - nextLineOffset, this.height / 2 + 13);

                ctx.beginPath();
                ctx.moveTo(0, this.height / 2 + nextLineOffset);
                ctx.lineTo(this.width, this.height / 2 + nextLineOffset);
                ctx.stroke();

                ctx.fillText(Math.round(-nextLineOffset / this.lineInterval).toString(), this.width / 2 - 13, this.height / 2 + nextLineOffset);

                ctx.beginPath();
                ctx.moveTo(0, this.height / 2 - nextLineOffset);
                ctx.lineTo(this.width, this.height / 2 - nextLineOffset);
                ctx.stroke();

                ctx.fillText(Math.round(nextLineOffset / this.lineInterval).toString(), this.width / 2 - 13, this.height / 2 - nextLineOffset);

                nextLineOffset += this.lineInterval;
            }
        }
    }, {
        key: "transformGridToScreen",
        value: function transformGridToScreen(point) {
            return new _Point2.default(this.width / 2 + point.x * this.lineInterval, this.height / 2 - point.y * this.lineInterval);
        }
    }, {
        key: "transformScreenToGrid",
        value: function transformScreenToGrid(point) {
            return new _Point2.default((point.x - this.width / 2) / this.lineInterval, (point.y - this.height / 2) / this.lineInterval * -1);
        }
    }, {
        key: "roundGridPoint",
        value: function roundGridPoint(point) {
            return new _Point2.default(Math.round(point.x), Math.round(point.y));
        }
    }, {
        key: "drawXAxis",
        value: function drawXAxis(ctx) {
            var xAxis = new _LineRenderer2.default(new _Line2.default(new _Point2.default(0, this.height / 2), new _Point2.default(this.width, this.height / 2)));
            xAxis.lineColor = '#6a6a6a';
            xAxis.lineWidth = 1;
            xAxis.draw(ctx);
        }
    }, {
        key: "drawYAxis",
        value: function drawYAxis(ctx) {
            var yAxis = new _LineRenderer2.default(new _Line2.default(new _Point2.default(this.width / 2, 0), new _Point2.default(this.width / 2, this.height)));
            yAxis.lineColor = '#6a6a6a';
            yAxis.lineWidth = 1;
            yAxis.draw(ctx);
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PointRender = function () {
    /**
     * @param {Point} point
     */
    function PointRender(point) {
        _classCallCheck(this, PointRender);

        this.point = point;
    }

    _createClass(PointRender, [{
        key: "draw",
        value: function draw(ctx) {
            var transformMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var point = transformMethod === null ? this.point : transformMethod(this.point);

            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }]);

    return PointRender;
}();

exports.default = PointRender;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map