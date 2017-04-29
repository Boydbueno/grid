import Point from "Point";

// Todo: The line should not know how to draw or animate. We should make a separate class to handle this
export default class Line {

    /**
     * @param {Point} start
     * @param {Point} end
     * @param {number} animationDuration
     */
    constructor(start, end, animationDuration = 0) {
        this.start = start;
        this.end = end;
        this.animationTime = animationDuration;
        this.isDoneAnimating = animationDuration === 0;
        this.animationStartTime = 0;

        this.lineColor = '#474747';
        this.lineWidth = 1;
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
        // b = -(mx - y)
        return -(this.slope * this.start.x - this.start.y);
    }

    /**
     * @returns {string}
     */
    get slopeInterceptEquation() {

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

        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
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
     * @param {number|string} x
     * @param {number|string} y
     * @returns {string}
     */
    getFilledInSlopeInterceptEquation(x, y) {
        return this.slopeInterceptEquation.replace('[x]', x.toFixed(1)).replace('[y]', y.toFixed(1));
    }
}
