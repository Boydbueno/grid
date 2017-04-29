export default class PointRender {
    /**
     * @param {Point} point
     */
    constructor(point) {
        this.point = point;
    }

    draw(ctx, transformMethod = null) {
        let point = transformMethod === null ? this.point : transformMethod(this.point);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}
