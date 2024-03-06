import { Resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js"
import { Vector2 } from "./src/Vector2.js"
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTo } from "./src/helpers/moveTo.js";
import { walls } from './src/helpers/level1.js'

const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');


canvas.width = 320
canvas.height = 180


const resources = new Resources();


const hero = new Sprite({
    resource: resources.images.hero,
    hFrames: 3,
    vFrames: 8,
    frame: 0,
    frameSize: new Vector2(32,32),
    position: new Vector2(gridCells(6), gridCells(5))
}) 

const heroDest = hero.position.duplicate()

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32,32)
})

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320,180),
})

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320,180)
})

const input = new Input()

const draw = () => {
    
    const heroOffset = new Vector2(-8,-21)
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + heroOffset.y;
    
    
    skySprite.drawImage(ctx, 0, 0)
    groundSprite.drawImage(ctx, 0, 0)
    shadow.drawImage(ctx, heroPosX, heroPosY)
    hero.drawImage(ctx, heroPosX, heroPosY)
    
}

const update = () => {
    const distance = moveTo(hero, heroDest, 1)
    const hasArrived = distance <= 1
    if(hasArrived) {
        tryMove() // if the sprite is at its destination, attempt to move again
    }
    
    function tryMove(){
        
        if(!input.direction) {
            return;
        }

        let nextX = heroDest.x; // set current position
        let nextY = heroDest.y
        const gridSize = 16; // for scale

        
        switch(input.direction){
            case "UP": 
                nextY -= gridSize // changes the destination y by one grid down
                hero.frame = 6
                break;
            case "DOWN":
                nextY += gridSize; // changes the destination y by one grid up
                hero.frame = 0;
                break;
            case "RIGHT" :
                nextX += gridSize; // changes the destination x by one grid right
                hero.frame = 3;
                break;
            case "LEFT":
                nextX -= gridSize; // changes the destination x by one grid left
                hero.frame = 9;
                break;
            default:
                break;
        }

        if(isSpaceFree(walls, nextX,nextY)) { // if space is free
            heroDest.x = nextX; //update destination
            heroDest.y = nextY; //update destination
        }

        
    }
}

const gameloop = new GameLoop(update, draw)
gameloop.start()
