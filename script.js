var g = 9.8;
class Projectile{
    constructor(x0, y0, v, angle){
        this.x = x0;
        this.y = y0;
        this.vx = v*Math.cos(angle);
        this.vy = v*Math.sin(angle);
        this.ay=-1*g;
        this.ax = 0;
        this.time =0;

        this.xarr=[this.x];
        this.yarr=[this.y];
    }    

    updateVx(dt){
        //v(t+dt) = v(t)+a*dt
        this.vx = this.vx+dt*this.ax;   
        return this.vx;     
    }
    updateVy(dt){
        //v(t+dt) = v(t)+a*dt
        this.vy = this.vy+dt*this.ay;   
        return this.vy;          
    }

    updateX(dt){
        //x + (v(t)+v(t+dt))/2 *dt
        this.x = this.x+0.5*(this.vx+this.updateVx(dt))*dt;
        return this.x;
    }
    updateY(dt){
        //x + (v(t)+v(t+dt))/2 *dt
        this.y = this.y+0.5*(this.vy+this.updateVy(dt))*dt;
        return this.y;
    }

    incriment(dt){
        this.xarr.push(this.updateX(dt));
        this.yarr.push(this.updateY(dt));
        this.time += dt;
    }

}

function shoot(x0,y0,v,angle){
    projectile = new Projectile(x0, y0,v,angle*(Math.PI/180));
    var dt = 0.05;
    var t =0;
    projectile.incriment(dt);
    // for(var i=0; i<10;i++){
    while(projectile.y>=0){
        projectile.incriment(dt);
        t+=dt;
    }
    
    return (projectile.xarr, projectile.yarr);
    
}
function convertToNeg(arr){
    for (var i =0;i<arr.length-1;i++){
        arr[i] = arr[i]*-1
    }
    return arr;
}
shoot(0,0,40,70);
console.log(projectile.xarr);
console.log(projectile.yarr);

// ctx.beginPath();
// ctx.arc(0, 0, 5, 0, 2*Math.PI);
// ctx.fillStyle = "red";
// ctx.fill();

// ctx.beginPath();
// //ctx.moveTo(20, 110);
// console.log(projectile.xarr[projectile.xarr.length-1]);
// ctx.arc(projectile.xarr[projectile.xarr.length-1]*grid_size, projectile.yarr[projectile.yarr.length-1]*-1*grid_size, 5,0,2*Math.PI);
// ctx.fillStyle = "red";
// ctx.fill();

// // move to the first point
// ctx.moveTo(projectile.xarr[0],projectile.yarr[0]);



projectile.yarr = convertToNeg(projectile.yarr);
console.log(projectile.yarr);
for (i = 1; i < projectile.xarr.length - 1; i ++)
{
   var xc = (projectile.xarr[i] + projectile.xarr[i + 1]) / 2;
   var yc = (projectile.yarr[i] + projectile.yarr[i + 1]) / 2;
   ctx.quadraticCurveTo(projectile.xarr[i]*grid_size, projectile.yarr[i]*grid_size, xc*grid_size, yc*grid_size);
}
// curve through the last two points
// ctx.quadraticCurveTo(projectile.xarr[i]*grid_size, projectile.yarr[i]*grid_size, projectile.xarr[i+1]*grid_size,projectile.yarr[i+1]*grid_size);
ctx.stroke();