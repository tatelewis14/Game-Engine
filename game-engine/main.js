import { Resources } from "./Resources.js";
import { Sprite } from "./Sprite.js"
import { Vector2 } from "./Vector2.js"
import { GameLoop } from "./GameLoop.js";
import { Input } from "./Input.js";

const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');


canvas.width = 320
canvas.height = 180


const resources = new Resources()

const heroPos = new Vector2(16*6, 16*5)
const hero = new Sprite({
    resource: resources.images.hero,
    hFrames: 3,
    vFrames: 8,
    frame: 0,
    frameSize: new Vector2(32,32)
}) 

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
    const heroPosX = heroPos.x + heroOffset.x;
    const heroPosY = heroPos.y + heroOffset.y;
    
    
    skySprite.drawImage(ctx, 0, 0)
    groundSprite.drawImage(ctx, 0, 0)
    shadow.drawImage(ctx, heroPosX, heroPosY)
    hero.drawImage(ctx, heroPosX, heroPosY)
    
}

const update = () => {
if(input.direction) console.log(input.direction)
}

const gameloop = new GameLoop(update, draw)
gameloop.start()
