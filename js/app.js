'use strict';

(function() {

    class Line {
        constructor(start, end, animationDuration) {
            this._start = start;
            this._end = end;
            this._animationTime = animationDuration;
            this._isDoneAnimating = animationDuration === 0;
            this.animationStartTime = 0;
        }

        get end() {
            return this._end;
        }

        get start() {
            return this._start;
        }

        get deltaX() {
            return this.end.x - this.start.x;
        }

        get deltaY() {
            return this.end.y - this.start.y;
        }

        get slope() {
            return this.deltaY / this.deltaX;
        }

        get yIntercept() {
            return -(this.slope * this.start.x - this.start.y);
        }

        get slopeInterceptEquation() {
            // y = m * x + b
            return "y = " + this.slope + " * x + " + this.yIntercept;
        }

        get animationTime() {
            return this._animationTime;
        }

        get isDoneAnimating() {
            return this._isDoneAnimating;
        }

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

            console.log(this.getFilledInSlopeInterceptEquation(partialLine.end.x, partialLine.end.y));
        }

        /**
         * @param {CanvasRenderingContext2D} ctx
         */
        draw(ctx) {
            ctx.strokeStyle = '#2f2f2f';
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.end.x, this.end.y);
            ctx.stroke();
        }

        /**
         * @param {number} fraction
         * @returns {Line}
         */
        getPartial(fraction) {
            return new Line(
                this.start,
                {
                    x: this.start.x + this.deltaX * fraction,
                    y: this.start.y + this.deltaY * fraction
                }
            );
        }

        getFilledInSlopeInterceptEquation(x, y) {
            return this.slopeInterceptEquation.replace('x', x).replace('y', y);
        }
    }

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let drawQueue = [];
    let animateQueue = [];

    resizeCanvas(canvas);

    animateQueue.push(
        new Line({x: 300, y: 300}, {x: 900, y: 500}, 10000)
    );

    // animateQueue.push(
    //     new Line({x: 900, y: 500}, {x: 1500, y: 300}, 1000)
    // );

    window.requestAnimationFrame(render);

    function render(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // drawGrid(canvas.clientWidth, canvas.clientHeight);

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

        let lineInterval = largestSide / verticalLines;

        let nextLineOffset = lineInterval;

        while (nextLineOffset <= largestSide / 2) {
            ctx.strokeStyle = '#2f2f2f';

            ctx.beginPath();
            ctx.moveTo(width / 2 + nextLineOffset, 0);
            ctx.lineTo(width / 2 + nextLineOffset, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width / 2 - nextLineOffset, 0);
            ctx.lineTo(width / 2 - nextLineOffset, height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, height / 2 + nextLineOffset);
            ctx.lineTo(width, height / 2 + nextLineOffset);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, height / 2 - nextLineOffset);
            ctx.lineTo(width, height / 2 - nextLineOffset);
            ctx.stroke();

            nextLineOffset += lineInterval;
        }
    }

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
