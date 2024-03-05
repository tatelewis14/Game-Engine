export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"



export class Input {
    constructor() {

        this.heldDirection=[];
        document.addEventListener('keydown', e=>{
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                this.onKeyDown(UP)
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                this.onKeyDown(DOWN)
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                this.onKeyDown(RIGHT)
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onKeyDown(LEFT)
            }
        })

        document.addEventListener('keyup', e=>{
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                this.onKeyUp(UP)
            }
            if(e.code === "ArrowDown" || e.code === "KeyS") {
                this.onKeyUp(DOWN)
            }
            if(e.code === "ArrowRight" || e.code === "KeyD") {
                this.onKeyUp(RIGHT)
            }
            if(e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onKeyUp(LEFT)
            }
        })
    }
    onKeyDown(direction) {
        if(this.heldDirection.indexOf(direction) === -1) {
            this.heldDirection.unshift(direction)
        }
    }
    onKeyUp(direction) {
        const index = this.heldDirection.indexOf(direction)
        if(index === -1) {
            return
        }
        this.heldDirection.splice(index,1)
    }
    get direction() {
        return this.heldDirection[0]
    }
}