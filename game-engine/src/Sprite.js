import { Vector2 } from "./Vector2.js";
import { Resources } from "./Resources.js";

export class Sprite {
    constructor({
        resource, // what image to draw
        frameSize, //size of crop
        vFrames, //which frame to crop from the column
        hFrames,//which frame to crop from the row
        frame, //which frame to show
        scale, // how large to draw the image
        position // where to draw it
    }) {
        this.resource = resource,
        this.frameSize = frameSize ?? new Vector2(16,16),
        this.vFrames = vFrames ?? 1,
        this.hFrames = hFrames ?? 1,
        this.frame = frame ?? 0,
        this.scale = scale ?? 1,
        this.frameMap = new Map()
        this.position = position ?? new Vector2(0,0);
        this.buildFrameMap()
    }
    buildFrameMap() {
        let frameCount = 0;
        for(let v = 0; v < this.vFrames; v++) {
            for(let h = 0; h < this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(h * this.frameSize.x,v * this.frameSize.y)
                )
                frameCount ++;
            }
        }
    }
    drawImage(ctx, x, y) {
        if(!this.resource.isLoaded) {
            return
        }
        let frameCoordX = 0;
        let frameCoordY = 0;

        const frame = this.frameMap.get(this.frame)
        if(frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY, // top left corner of the frame
            frameSizeX, // how much to crop from the spritesheet (X)
            frameSizeY, // how much to crop from the spritesheet (y)
            x, // where to place it
            y, // where to place it
            frameSizeX * this.scale, // how much to scale by wider/narrower
            frameSizeY * this.scale, // how much to scale by taller/shorter
        );
        
    }
}