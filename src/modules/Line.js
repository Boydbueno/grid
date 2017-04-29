import Point from "Point";

// Todo: The line should not know how to draw or animate. We should make a separate class to handle this
export default class Line {
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
