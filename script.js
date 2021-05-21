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
    projectile = new Projectile(x0, y0,v,angle);
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

shoot(0,0,10,45);
console.log(projectile.xarr);



