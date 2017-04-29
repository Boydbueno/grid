'use strict';

import Point from 'Point';
import Line from 'Line';
import Grid from 'Grid';

(function() {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let drawQueue = [];
    let animateQueue = [];

    let grid = new Grid(60, canvas);

    resizeCanvas(canvas);

    animateQueue.push(
        new Line(new Point(0, 5), new Point(9, 5), 1000),
        new Line(new Point(9, 5), new Point(9, 9), 1000),
        new Line(new Point(9, 9), new Point(0, 5), 1000)
    );

    window.requestAnimationFrame(render);

    function render(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        grid.draw(ctx);

        if (animateQueue.length > 0) {
            if (animateQueue[0].isDoneAnimating) {
                drawQueue.push(animateQueue.shift());
            } else {
                animateQueue[0].animate(ctx, timestamp, grid.transformGridToScreen.bind(grid));
            }
        }

        if (drawQueue.length > 0) {
            drawQueue.forEach(drawItem => {
                drawItem.draw(ctx, grid.transformGridToScreen.bind(grid));
            });
        }

        window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", () => {
        resizeCanvas(canvas);
        // grid.width = canvas.clientWidth;
        // grid.height = canvas.clientHeight;
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
