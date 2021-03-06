import LineRenderer from "LineRenderer";
import Point from "Point";
import Line from "Line";

export default class Grid {

    get height() {
        return this.canvas.clientHeight;
    }

    get width() {
        return this.canvas.clientWidth;
    }

    /**
     * @param {number} maxSize
     * @param {Element} canvas
     */
    constructor(maxSize, canvas) {
        this.maxSize = maxSize;
        this.canvas = canvas;

        this.largestSide = this.width > this.height ? this.width : this.height;
        this.lineInterval = this.largestSide / this.maxSize;
    }

    draw(ctx) {
        this.drawYAxis(ctx);
        this.drawXAxis(ctx);

        let nextLineOffset = this.lineInterval;

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

    transformGridToScreen(point) {
        return new Point(
            this.width / 2 + point.x * this.lineInterval,
            this.height / 2 - point.y * this.lineInterval
        );
    }

    transformScreenToGrid(point) {
        return new Point(
            (point.x - this.width / 2) / this.lineInterval,
            (point.y - this.height / 2) / this.lineInterval * -1
        );
    }

    roundGridPoint(point) {
        return new Point(
            Math.round(point.x),
            Math.round(point.y)
        )
    }

    drawXAxis(ctx) {
        let xAxis = new LineRenderer(
            new Line(
                new Point(0, this.height / 2),
                new Point(this.width, this.height / 2)
            )
        );
        xAxis.lineColor = '#6a6a6a';
        xAxis.lineWidth = 1;
        xAxis.draw(ctx);
    }

    drawYAxis(ctx) {
        let yAxis = new LineRenderer(
            new Line(
                new Point(this.width / 2, 0),
                new Point(this.width / 2, this.height)
            )
        );
        yAxis.lineColor = '#6a6a6a';
        yAxis.lineWidth = 1;
        yAxis.draw(ctx);
    }
}
