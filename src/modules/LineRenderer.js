import Line from "Line";
import Point from "Point";

export default class LineRenderer {

    get defaultOptions() {
        return {
            lineColor: '#474747',
            lineWidth: 1,
            animate: {
                duration: 0
            }
        }
    }

    /**
     * @param line
     * @param options
     */
    constructor(line, options) {
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
    animate(ctx, timestamp, transformMethod) {
        if (this.animationStartTime === 0) {
            this.animationStartTime = timestamp;
        }

        let deltaTime = timestamp - this.animationStartTime;

        if (deltaTime >= this.options.animate.duration) {
            this.isDoneAnimating = true;
            // Make sure we don't overshoot
            deltaTime = this.options.animate.duration;
        }

        let partialLine = this.getPartial(deltaTime / this.options.animate.duration);
        new LineRenderer(partialLine).draw(ctx, transformMethod);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx, transformMethod = null) {
        let start = transformMethod === null ? this.line.start : transformMethod(this.line.start);
        let end = transformMethod === null ? this.line.end : transformMethod(this.line.end);

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
    getPartial(fraction) {
        return new Line(
            this.line.start,
            new Point(
                this.line.start.x + this.line.deltaX * fraction,
                this.line.start.y + this.line.deltaY * fraction
            )
        );
    }
}
