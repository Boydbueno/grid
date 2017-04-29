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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
    /**
     * @param {number} x
     * @param {number} y
     */
    function Point(x, y) {
        _classCallCheck(this, Point);

        this._x = x;
        this._y = y;
    }

    /**
     * @returns {number}
     */


    _createClass(Point, [{
        key: "x",
        get: function get() {
            return this._x;
        }

        /**
         * @returns {number}
         */

    }, {
        key: "y",
        get: function get() {
            return this._y;
        }
    }]);

    return Point;
}();

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

// Todo: The line should not know how to draw or animate. We should make a separate class to handle this
var Line = function () {
    _createClass(Line, [{
        key: "lineWidth",
        set: function set(value) {
            this._lineWidth = value;
        }
    }, {
        key: "lineColor",
        set: function set(value) {
            this._lineColor = value;
        }
        /**
         * @param {Point} start
         * @param {Point} end
         * @param {number} animationDuration
         */

    }]);

    function Line(start, end) {
        var animationDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Line);

        this._start = start;
        this._end = end;
        this._animationTime = animationDuration;
        this._isDoneAnimating = animationDuration === 0;
        this.animationStartTime = 0;

        this._lineColor = '#474747';
        this._lineWidth = 1;
    }

    /**
     * @returns {Point}
     */


    _createClass(Line, [{
        key: "animate",


        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {float} timestamp
         */
        value: function animate(ctx, timestamp, transformMethod) {
            if (this.animationStartTime === 0) {
                this.animationStartTime = timestamp;
            }

            var deltaTime = timestamp - this.animationStartTime;

            if (deltaTime >= this.animationTime) {
                this.isDoneAnimating = true;
                // Make sure we don't overshoot
                deltaTime = this.animationTime;
            }

            var partialLine = this.getPartial(deltaTime / this.animationTime);
            partialLine.draw(ctx, transformMethod);

            // console.log(this.getFilledInSlopeInterceptEquation(partialLine.end.x, partialLine.end.y));
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */

    }, {
        key: "draw",
        value: function draw(ctx) {
            var transformMethod = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var start = transformMethod === null ? this.start : transformMethod(this.start);
            var end = transformMethod === null ? this.end : transformMethod(this.end);

            ctx.strokeStyle = this._lineColor;
            ctx.lineWidth = this._lineWidth;
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
            return new Line(this.start, new _Point2.default(this.start.x + this.deltaX * fraction, this.start.y + this.deltaY * fraction));
        }

        /**
         * @param {number} x
         * @param {number} y
         * @returns {string}
         */

    }, {
        key: "getFilledInSlopeInterceptEquation",
        value: function getFilledInSlopeInterceptEquation(x, y) {
            return this.slopeInterceptEquation.replace('x', x).replace('y', y);
        }
    }, {
        key: "end",
        get: function get() {
            return this._end;
        }

        /**
         * @returns {Point}
         */

    }, {
        key: "start",
        get: function get() {
            return this._start;
        }

        /**
         * @returns {number}
         */

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
            return -(this.slope * this.start.x - this.start.y);
        }

        /**
         * @returns {string}
         */

    }, {
        key: "slopeInterceptEquation",
        get: function get() {
            // y = m * x + b
            return "y = " + this.slope + " * x + " + this.yIntercept;
        }

        /**
         * @returns {number}
         */

    }, {
        key: "animationTime",
        get: function get() {
            return this._animationTime;
        }

        /**
         * @returns {boolean}
         */

    }, {
        key: "isDoneAnimating",
        get: function get() {
            return this._isDoneAnimating;
        }

        /**
         * @param {boolean} value
         */
        ,
        set: function set(value) {
            this._isDoneAnimating = value;
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
            return this._canvas.clientHeight;
        }
    }, {
        key: "width",
        get: function get() {
            return this._canvas.clientWidth;
        }
    }, {
        key: "canvas",
        get: function get() {
            return this._canvas;
        }

        /**
         * @param {number} maxSize
         * @param {Element} canvas
         */

    }]);

    function Grid(maxSize, canvas) {
        _classCallCheck(this, Grid);

        this._maxSize = maxSize;
        this._canvas = canvas;

        this.largestSide = this.width > this.height ? this.width : this.height;
        this.lineInterval = this.largestSide / this._maxSize;
    }

    _createClass(Grid, [{
        key: "draw",
        value: function draw(ctx) {
            this._drawYAxis(ctx);
            this._drawXAxis(ctx);

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
            return new _Point2.default(this.canvas.width / 2 + point.x * this.lineInterval, this.canvas.height / 2 - point.y * this.lineInterval);
        }
    }, {
        key: "_drawXAxis",
        value: function _drawXAxis(ctx) {
            var xAxis = new _Line2.default(new _Point2.default(0, this.height / 2), new _Point2.default(this.width, this.height / 2));
            xAxis.lineColor = '#6a6a6a';
            xAxis.lineWidth = 1;
            xAxis.draw(ctx);
        }
    }, {
        key: "_drawYAxis",
        value: function _drawYAxis(ctx) {
            var yAxis = new _Line2.default(new _Point2.default(this.width / 2, 0), new _Point2.default(this.width / 2, this.height));
            yAxis.lineColor = '#6a6a6a';
            yAxis.lineWidth = 1;
            yAxis.draw(ctx);
        }
    }]);

    return Grid;
}();

exports.default = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Point = __webpack_require__(0);

var _Point2 = _interopRequireDefault(_Point);

var _Line = __webpack_require__(1);

var _Line2 = _interopRequireDefault(_Line);

var _Grid = __webpack_require__(2);

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var drawQueue = [];
    var animateQueue = [];

    var grid = new _Grid2.default(60, canvas);

    resizeCanvas(canvas);

    animateQueue.push(new _Line2.default(new _Point2.default(0, 5), new _Point2.default(9, 5), 1000), new _Line2.default(new _Point2.default(9, 5), new _Point2.default(9, 9), 1000), new _Line2.default(new _Point2.default(9, 9), new _Point2.default(0, 5), 1000));

    window.requestAnimationFrame(render);

    function render(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        grid.draw(ctx);

        if (animateQueue.length > 0) {
            if (animateQueue[0].isDoneAnimating) {
                drawQueue.push(animateQueue.shift());
            } else {
                animateQueue[0].animate(ctx, timestamp, grid.transformGridToScreen.bind(grid));
            }
        }

        if (drawQueue.length > 0) {
            drawQueue.forEach(function (drawItem) {
                drawItem.draw(ctx, grid.transformGridToScreen.bind(grid));
            });
        }

        window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", function () {
        resizeCanvas(canvas);
        // grid.width = canvas.clientWidth;
        // grid.height = canvas.clientHeight;
    });

    function resizeCanvas(canvas) {
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
})();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map