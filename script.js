const g = 9.8;
var index = 0;
const ballColour = "red";
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
    projectile = new Projectile(x0, y0, v, angle * (Math.PI / 180));
    var dt = 0.05;
    var t = 0;
    projectile.incriment(dt);
    // for(var i=0; i<10;i++){
    while (projectile.y >= 0) {
        projectile.incriment(dt);
        t += dt;
    }
    drawBall();
    return (projectile.xarr, projectile.yarr);

}
function convertToNeg(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        arr[i] = arr[i] * -1
    }
    return arr;
}
shoot(0, 0, 40, 70);
//drawGrid();
console.log(projectile.xarr);
console.log(projectile.yarr);



function drawBall() {
    if (index !== 0) {
        ctx.translate(-1 * y_axis_distance_grid_lines * grid_size, -1 * x_axis_distance_grid_lines * grid_size);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.beginPath();
    ctx.arc(projectile.xarr[index], projectile.yarr[index], 5, 0, 2 * Math.PI);
    ctx.fillStyle = ballColour;
    ctx.fill();
}


function incrementDraw() {

    console.log(getInput());
    var num1 = getInput();
    console.log(num1);
    if(num1 == "bad"){
        return;
    }
    index += num1;
    drawBall();
}

function deincrementDraw() {
    console.log("2")
    index -= 1;
    if (index < 0) {
        alert("can't decrement below initial");
        index += 1
    } else {
        drawBall();
    }
}

function getInput(){
    var input = document.getElementById("input").value;
    if(isNaN(input)){
        alert("enter a real number");
        return "bad";
        
    }else{
       return parseInt(input);
    }
    
}
