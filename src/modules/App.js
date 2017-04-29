import PointRenderer from "PointRenderer";
import Point from 'Point';
import Line from 'Line';
import Grid from 'Grid';

export default class App {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drawList = [];
        this.animateQueue = [];
        this.hoverPoint = null;

        this.grid = new Grid(60, canvas);

        this.resizeCanvas(canvas);

        this.animateQueue.push(
            new Line(new Point(0, 5), new Point(9, 5), 1000),
            new Line(new Point(9, 5), new Point(9, 9), 1000),
            new Line(new Point(9, 9), new Point(0, 5), 1000)
        );

        window.requestAnimationFrame(this.render.bind(this));

        this.addEventListeners();
    }

    render(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.grid.draw(this.ctx);

        if (this.animateQueue.length > 0) {
            if (this.animateQueue[0].isDoneAnimating) {
                this.drawList.push(this.animateQueue.shift());
            } else {
                this.animateQueue[0].animate(this.ctx, timestamp, this.grid.transformGridToScreen.bind(this.grid));
            }
        }

        if (this.drawList.length > 0) {
            this.drawList.forEach(drawItem => {
                drawItem.draw(this.ctx, this.grid.transformGridToScreen.bind(this.grid));
            });
        }

        if (this.hoverPoint) {
            let pointRenderer = new PointRenderer(this.hoverPoint);
            pointRenderer.draw(this.ctx, this.grid.transformGridToScreen.bind(this.grid));
        }

        window.requestAnimationFrame(this.render.bind(this));
    }

    resizeCanvas(canvas) {
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

    addEventListeners() {
        window.addEventListener("resize", () => {
            this.resizeCanvas(this.canvas);
        });

        window.addEventListener("mousemove", event => {
            let gridPoint = this.grid.transformScreenToGrid(new Point(event.clientX, event.clientY));
            this.hoverPoint = this.grid.roundGridPoint(gridPoint);
        });

        window.addEventListener("mouseout", () => {
            this.hoverPoint = null;
        });
    }
}
