export class GameLoop {
    constructor(update, render) {
        
        this.lastFrameTime = 0;
        this.accumlatedTime = 0;
        this.timeStep = 1000/60; //60 fps
        
        
        
        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }
    
    mainLoop = (timestamp) =>  {  
        if(!this.isRunning) return;


        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        //accumulate all the time since last frame
        this.accumlatedTime += deltaTime;

        // fixed timestep updates
        // if theres enought accumlated time to run, run the update game logic function
        while(this.accumlatedTime >= this.timeStep) {
            this.update(this.timeStep)
            this.accumlatedTime -= this.timeStep
        }

        this.render()

        this.rafId = requestAnimationFrame(this.mainLoop)
    }
    start() {
        if(!this.isRunning) {
            this.isRunning = true
            this.rafId = requestAnimationFrame(this.mainLoop)
        }
    }
    stop() {
        if(this.rafId) {
            cancelAnimationFrame(this.rafId)
        }
        this.isRunning = false
    }
}