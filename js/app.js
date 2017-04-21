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

        get toPixels() {
            return new Point(canvas.width / 2 + this.x * lineInterval, canvas.height / 2 - this.y * lineInterval);
        }
    }

    class Line {
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
        animate(ctx, timestamp) {
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
            partialLine.draw(ctx);

            // console.log(this.getFilledInSlopeInterceptEquation(partialLine.end.x, partialLine.end.y));
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        draw(ctx) {
            ctx.strokeStyle = '#2f2f2f';
            ctx.beginPath();
            ctx.moveTo(this.start.toPixels.x, this.start.toPixels.y);
            ctx.lineTo(this.end.toPixels.x, this.end.toPixels.y);
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

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let drawQueue = [];
    let animateQueue = [];

    let lineInterval;

    resizeCanvas(canvas);

    animateQueue.push(
        new Line(new Point(0, 5), new Point(9, 5), 1000),
        new Line(new Point(9, 5), new Point(9, 9), 1000),
        new Line(new Point(9, 9), new Point(0, 5), 1000)
    );

    window.requestAnimationFrame(render);

    function render(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid(canvas.clientWidth, canvas.clientHeight);

        if (animateQueue.length > 0) {
            if (animateQueue[0].isDoneAnimating) {
                drawQueue.push(animateQueue.shift());
            } else {
                animateQueue[0].animate(ctx, timestamp);
            }
        }

        if (drawQueue.length > 0) {
            drawQueue.forEach(drawItem => {
                drawItem.draw(ctx);
            });
        }

        window.requestAnimationFrame(render);
    }

    function drawGrid(width, height) {
        ctx.strokeStyle = '#6a6a6a';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        let verticalLines = 60;

        let largestSide = width > height ? width : height;

        lineInterval = largestSide / verticalLines;

        let nextLineOffset = lineInterval;

        while (nextLineOffset <= largestSide / 2) {
            ctx.strokeStyle = '#2f2f2f';

            ctx.beginPath();
            ctx.moveTo(width / 2 + nextLineOffset, 0);
            ctx.lineTo(width / 2 + nextLineOffset, height);
            ctx.stroke();

            ctx.font = '10px serif';
            ctx.fillStyle = "white";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            ctx.fillText(Math.round(nextLineOffset / lineInterval).toString(), width / 2 + nextLineOffset, height / 2 + 13);

            ctx.beginPath();
            ctx.moveTo(width / 2 - nextLineOffset, 0);
            ctx.lineTo(width / 2 - nextLineOffset, height);
            ctx.stroke();

            ctx.fillText(Math.round(-nextLineOffset / lineInterval).toString(), width / 2 - nextLineOffset, height / 2 + 13);

            ctx.beginPath();
            ctx.moveTo(0, height / 2 + nextLineOffset);
            ctx.lineTo(width, height / 2 + nextLineOffset);
            ctx.stroke();

            ctx.fillText(Math.round(-nextLineOffset / lineInterval).toString(), width / 2 - 13, height / 2 + nextLineOffset);

            ctx.beginPath();
            ctx.moveTo(0, height / 2 - nextLineOffset);
            ctx.lineTo(width, height / 2 - nextLineOffset);
            ctx.stroke();

            ctx.fillText(Math.round(nextLineOffset / lineInterval).toString(), width / 2 - 13, height / 2 - nextLineOffset);

            nextLineOffset += lineInterval;
        }
    }

    window.addEventListener("resize", () => {
        resizeCanvas(canvas);
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
