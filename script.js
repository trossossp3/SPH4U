const g = 9.8;
var index = 0;
var initFlag = true;
const ballColour = "#5EB669";
class Projectile {
    constructor(x0, y0, v, angle) {
        this.x = x0;
        this.y = y0;
        this.vx = v * Math.cos(angle);
        this.vy = v * Math.sin(angle);
        this.ay = -1 * g;
        this.ax = 0;
        this.time = 0;

        this.xarr = [this.x];
        this.yarr = [this.y];
    }

    updateVx(dt) {
        //v(t+dt) = v(t)+a*dt
        this.vx = this.vx + dt * this.ax;
        return this.vx;
    }
    updateVy(dt) {
        //v(t+dt) = v(t)+a*dt
        this.vy = this.vy + dt * this.ay;
        return this.vy;
    }

    updateX(dt) {
        //x + (v(t)+v(t+dt))/2 *dt
        this.x = this.x + 0.5 * (this.vx + this.updateVx(dt)) * dt;
        return this.x;
    }
    updateY(dt) {
        //x + (v(t)+v(t+dt))/2 *dt
        this.y = this.y + 0.5 * (this.vy + this.updateVy(dt)) * dt;
        return this.y;
    }

    incriment(dt) {
        this.xarr.push(this.updateX(dt));
        this.yarr.push(this.updateY(dt));
        this.time += dt;
    }

}

function shoot(x0, y0, v, angle) {
    if(checkBounds(y0, v, angle * Math.PI / 180)){
        return;
    }
    projectile = new Projectile(x0, y0, v, angle * (Math.PI / 180));
    console.log(range(y0, v, angle * Math.PI / 180));
    console.log(maxHeight(y0, v, angle * Math.PI / 180));
    var dt = 0.05;
    var t = 0;
    projectile.incriment(dt);
    // for(var i=0; i<10;i++){
    while (projectile.y >= 0) {
        projectile.incriment(dt);
        t += dt;
    }
    projectile.yarr = convertToNeg(projectile.yarr);
    lastPointFix(y0, v, (angle * (Math.PI / 180)));
    document.getElementById("in").innerHTML = "How many time intervals to increment/decrement ("+ projectile.yarr.length+ " total intervals" +  ")?";
    drawBall();
    renderText(y0, v, angle * Math.PI / 180);
    return (projectile.xarr, projectile.yarr);

}
// converts an arrays values to the reciprolcal
function convertToNeg(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * -1
    }
    return arr;
}
//clears screen
function clearScreen() {
    if (!initFlag) {
        ctx.translate(-1 * y_axis_distance_grid_lines * grid_size, -1 * x_axis_distance_grid_lines * grid_size);
    }

    initFlag = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//renders the ball movement 
function drawBall() {
    clearScreen();
    drawGrid();
    ctx.beginPath();
    ctx.arc(projectile.xarr[index] * grid_size, projectile.yarr[index] * grid_size, 5, 0, 2 * Math.PI);
    ctx.fillStyle = ballColour;
    ctx.fill();
    console.log(range());
}

//incriment the ball
function incrementDraw() {

    console.log(getInput("incInput"));
    var num1 = getInput("incInput");
    console.log(num1);
    if (num1 == "bad") {
        return;
    }
    if (index + num1 > projectile.xarr.length - 1) {
        index = projectile.xarr.length - 1
    } else {
        index += num1;
    }

    drawBall();
}
//decrement the ball
function deincrementDraw() {
    console.log("2")
    var num1 = getInput("incInput");
    console.log(num1);
    if (num1 == "bad") {
        return;
    }
    if (index - num1 < 0) {
        index = 0
    } else {
        index -= num1;
    }
    drawBall();
}
//gets value for incriment
function getInput(id) {
    var input = document.getElementById(id).value;
    if (isNaN(input) || input =="") {
        alert("enter a real number");
        return "bad";

    } else {
        return parseInt(input);
    }

}
//sets last point of projectile to be at y =0
function lastPointFix(h, v, theta) {
    projectile.xarr[projectile.xarr.length - 1] = range(h, v, theta);
    projectile.yarr[projectile.yarr.length - 1] = 0;

}
//calculates time of flight
function flightTime(h,v,theta){
   
    return (v * Math.sin(theta) + Math.sqrt(Math.pow(v*Math.sin(theta),2)+ 2 * g * h)) / g;
}
//calculates range
function range(h, v, theta) {
    //V * cos(theta) * [V * sin(theta) + √(V * sin(theta))² + 2 * g * h)] / g  
    
    return v*Math.cos(theta) * flightTime(h,v,theta);
}
//calculates max height
function maxHeight(h, v, theta) {
    return h + Math.pow(v, 2) * Math.pow(Math.sin(theta), 2) / (2 * g);
} 
//redners output values
function renderText(h,v,theta){
    document.getElementById("info").innerHTML = "Max height: " + maxHeight(h,v,theta).toFixed(2) + " meters <br>" + "Range: " + range(h,v,theta).toFixed(2)+ " meters<br>" + "Time in air: " + flightTime(h,v,theta).toFixed(2)+" seconds";
}
//checks if ball will stay in bounds with alotted values
function checkBounds(h,v,theta){
    // var maxHeight = ;
    // var range = ;

    if(maxHeight(h,v,theta) > 79|| range(h,v,theta) > 181){
        alert("Inpputed values result in projecile going off grid, enter different values");
        return true;
    }

}
//main function
function run() {
    //initFlag = true;
    index = 0;
    
    shoot(0, getInput("initHeight"), getInput("initAngle"), getInput("initVelocity"));

}
drawGrid();
initFlag= false;
