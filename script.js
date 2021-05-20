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

        
    }
}

//tests