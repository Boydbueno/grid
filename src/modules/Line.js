import Point from "Point";

export default class Line {

    /**
     * @param {Point} start
     * @param {Point} end
     * @param {number} animationDuration
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
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
     * @param {number|string} x
     * @param {number|string} y
     * @returns {string}
     */
    getFilledInSlopeInterceptEquation(x, y) {
        return this.slopeInterceptEquation.replace('[x]', x.toFixed(1)).replace('[y]', y.toFixed(1));
    }
}
