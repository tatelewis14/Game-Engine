export class FrameIndexPattern {
    constructor(animationConfig) {
        this.currentTime = 0;
        this.animationConfig = animationConfig;
        this.duration = this.animationConfig.duration;
    }

    step(delta) {
        this.currentTime += delta;
        if(this.currentTime > this.duration) {
            this.currentTime = 0
        }
    }
    get frame() {
        return  frames = this.animationConfig.frames;

        for(let i = frames.length -1; i>=0; i--) {
            if(this.currentTime >= frames[i].time) {
                return frames[i].frame
            }
        }
        throw new Error('Time is before the first keyframe')
    }
}