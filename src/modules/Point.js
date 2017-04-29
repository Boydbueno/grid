export default class Point {
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
