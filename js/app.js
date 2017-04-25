'use strict';

(function() {

    class Point {
        /**
         * @param {number} x
         * @param {number} y
         */
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }

        /**
         * @returns {number}
         */
        get x() {
            return this._x;
        }

        /**
         * @returns {number}
         */
        get y() {
            return this._y;
        }
    }

    // Todo: The line should not know how to draw or animate. We should make a separate class to handle this
    class Line {
        set lineWidth(value) {
            this._lineWidth = value;
        }

        set lineColor(value) {
            this._lineColor = value;
        }
        /**
         * @param {Point} start
         * @param {Point} end
         * @param {number} animationDuration
         */
        constructor(start, end, animationDuration = 0) {
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
        get end() {
            return this._end;
        }

        /**
         * @returns {Point}
         */
        get start() {
            return this._start;
        }

        /**
         * @returns {number}
         */
        get deltaX() {
            return this.end.x - this.start.x;
        }

        /**
         * @returns {number}
         */
        get deltaY() {
            return this.end.y - this.start.y;
        }

        /**
         * @returns {number}
         */
        get slope() {
            return this.deltaY / this.deltaX;
        }

        /**
         * @returns {number}
         */
        get yIntercept() {
            return -(this.slope * this.start.x - this.start.y);
        }

        /**
         * @returns {string}
         */
        get slopeInterceptEquation() {
            // y = m * x + b
            return "y = " + this.slope + " * x + " + this.yIntercept;
        }

        /**
         * @returns {number}
         */
        get animationTime() {
            return this._animationTime;
        }

        /**
         * @returns {boolean}
         */
        get isDoneAnimating() {
            return this._isDoneAnimating;
        }

        /**
         * @param {boolean} value
         */
        set isDoneAnimating(value) {
            this._isDoneAnimating = value;
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {float} timestamp
         */
        animate(ctx, timestamp, transformMethod) {
            if (this.animationStartTime === 0) {
                this.animationStartTime = timestamp;
            }

            let deltaTime = timestamp - this.animationStartTime;

            if (deltaTime >= this.animationTime) {
                this.isDoneAnimating = true;
                // Make sure we don't overshoot
                deltaTime = this.animationTime;
            }

            let partialLine = this.getPartial(deltaTime / this.animationTime);
            partialLine.draw(ctx, transformMethod);

            // console.log(this.getFilledInSlopeInterceptEquation(partialLine.end.x, partialLine.end.y));
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        draw(ctx, transformMethod = null) {
            let start = transformMethod === null ? this.start : transformMethod(this.start);
            let end = transformMethod === null ? this.end : transformMethod(this.end);

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
        getPartial(fraction) {
            return new Line(
                this.start,
                new Point(
                    this.start.x + this.deltaX * fraction,
                    this.start.y + this.deltaY * fraction
                )
            );
        }

        /**
         * @param {number} x
         * @param {number} y
         * @returns {string}
         */
        getFilledInSlopeInterceptEquation(x, y) {
            return this.slopeInterceptEquation.replace('x', x).replace('y', y);
        }
    }

    class Grid {

        set height(value) {
            this._height = value;
        }

        set width(value) {
            this._width = value;
        }

        /**
         * @param {number} maxSize
         * @param {number} width
         * @param {number} height
         */
        constructor(maxSize, width, height) {
            this._maxSize = maxSize;
            this._width = width;
            this._height = height;

            this.largestSide = this._width > this._height ? this._width : this._height;
            this.lineInterval = this.largestSide / this._maxSize;
        }

        draw(ctx) {
            this._drawYAxis(ctx);
            this._drawXAxis(ctx);

            let nextLineOffset = this.lineInterval;

            while (nextLineOffset <= this.largestSide / 2) {
                ctx.strokeStyle = '#2f2f2f';

                ctx.beginPath();
                ctx.moveTo(this._width / 2 + nextLineOffset, 0);
                ctx.lineTo(this._width / 2 + nextLineOffset, this._height);
                ctx.stroke();

                ctx.font = '10px serif';
                ctx.fillStyle = "white";
                ctx.textBaseline = 'middle';
                ctx.textAlign = "center";
                ctx.fillText(Math.round(nextLineOffset / this.lineInterval).toString(), this._width / 2 + nextLineOffset, this._height / 2 + 13);

                ctx.beginPath();
                ctx.moveTo(this._width / 2 - nextLineOffset, 0);
                ctx.lineTo(this._width / 2 - nextLineOffset, this._height);
                ctx.stroke();

                ctx.fillText(Math.round(-nextLineOffset / this.lineInterval).toString(), this._width / 2 - nextLineOffset, this._height / 2 + 13);

                ctx.beginPath();
                ctx.moveTo(0, this._height / 2 + nextLineOffset);
                ctx.lineTo(this._width, this._height / 2 + nextLineOffset);
                ctx.stroke();

                ctx.fillText(Math.round(-nextLineOffset / this.lineInterval).toString(), this._width / 2 - 13, this._height / 2 + nextLineOffset);

                ctx.beginPath();
                ctx.moveTo(0, this._height / 2 - nextLineOffset);
                ctx.lineTo(this._width, this._height / 2 - nextLineOffset);
                ctx.stroke();

                ctx.fillText(Math.round(nextLineOffset / this.lineInterval).toString(), this._width / 2 - 13, this._height / 2 - nextLineOffset);

                nextLineOffset += this.lineInterval;
            }
        }

        transformGridToScreen(point) {
            return new Point(canvas.width / 2 + point.x * this.lineInterval, canvas.height / 2 - point.y * this.lineInterval);
        }

        _drawXAxis(ctx) {
            let xAxis = new Line(
                new Point(0, this._height / 2),
                new Point(this._width, this._height / 2)
            );
            xAxis.lineColor = '#6a6a6a';
            xAxis.lineWidth = 1;
            xAxis.draw(ctx);
        }

        _drawYAxis(ctx) {
            let yAxis = new Line(
                new Point(this._width / 2, 0),
                new Point(this._width / 2, this._height)
            );
            yAxis.lineColor = '#6a6a6a';
            yAxis.lineWidth = 1;
            yAxis.draw(ctx);
        }
    }

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let drawQueue = [];
    let animateQueue = [];

    let grid = new Grid(60, canvas.clientWidth, canvas.clientHeight);

    resizeCanvas(canvas);

    animateQueue.push(
        new Line(new Point(0, 5), new Point(9, 5), 1000),
        new Line(new Point(9, 5), new Point(9, 9), 1000),
        new Line(new Point(9, 9), new Point(0, 5), 1000)
    );

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
            drawQueue.forEach(drawItem => {
                drawItem.draw(ctx, grid.transformGridToScreen.bind(grid));
            });
        }

        window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", () => {
        resizeCanvas(canvas);
        grid.width = canvas.clientWidth;
        grid.height = canvas.clientHeight;
    });

    function resizeCanvas(canvas) {
        // Lookup the size the browser is displaying the canvas.
        let displayWidth = canvas.clientWidth;
        let displayHeight = canvas.clientHeight;

        // Check if the canvas is not the same size.
        if (canvas.width != displayWidth || canvas.height != displayHeight) {
            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
    }

})();
