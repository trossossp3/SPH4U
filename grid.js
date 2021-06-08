

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var grid_size = 10;
// canvas width
var canvas_width = canvas.width;

// canvas height
var canvas_height = canvas.height;
const gridColour = "black";
// no of vertical grid lines
var num_lines_x = Math.floor(canvas_height / grid_size);

// no of horizontal grid lines
var num_lines_y = Math.floor(canvas_width / grid_size);

var x_axis_distance_grid_lines = num_lines_x / 2;
var y_axis_distance_grid_lines = 5;
var x_axis_starting_point = { number: 1, suffix: '' };
var y_axis_starting_point = { number: 1, suffix: '' };

function drawGrid() {
    ctx.fillStyle = gridColour;
    // Draw grid lines along X-axis
    for (var i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if (i == x_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
            ctx.moveTo(0, grid_size * i);
            ctx.lineTo(canvas_width, grid_size * i);
        }
        else {
            ctx.moveTo(0, grid_size * i + 0.5);
            ctx.lineTo(canvas_width, grid_size * i + 0.5);
        }
        ctx.stroke();
    }



    // Draw grid lines along Y-axis
    for (i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents Y-axis draw in different color
        if (i == y_axis_distance_grid_lines)
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
            ctx.moveTo(grid_size * i, 0);
            ctx.lineTo(grid_size * i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size * i + 0.5, 0);
            ctx.lineTo(grid_size * i + 0.5, canvas_height);
        }
        ctx.stroke();
    }

    ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

    // Ticks marks along the positive X-axis
    for (i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(grid_size * i + 0.5, -5 + (i % 2 * 2));
        ctx.lineTo(grid_size * i + 0.5, 5 - (i % 2 * 2));
        ctx.stroke();

        if (i % 2 === 0) {
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);
        }
    }

    // Ticks marks along the negative X-axis
    for (i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size * i + 0.5, -5 + (i % 2 * 2));
        ctx.lineTo(-grid_size * i + 0.5, 5 - (i % 2 * 2));
        ctx.stroke();
        if (i % 2 === 0) {
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
        }
    }

    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for (i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-5 + (i % 2 * 2), grid_size * i + 0.5);
        ctx.lineTo(5 - (i % 2 * 2), grid_size * i + 0.5);
        ctx.stroke();
        if (i % 2 === 0) {
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
        }
    }

    // Ticks marks along the negative Y-axis
    // Negative Y-axis of graph is positive Y-axis of the canvas
    for (i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-5 + (i % 2 * 2), -grid_size * i + 0.5);
        ctx.lineTo(5 - (i % 2 * 2), -grid_size * i + 0.5);
        ctx.stroke();
        if (i % 2 === 0) {
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
        }
    }



}