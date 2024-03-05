export class Resources {
    constructor() {
        this.toLoad = { //holds all images to be loaded
            sky: "sprites/sky.png",
            shadow: "sprites/shadow.png",
            hero: "sprites/hero-sheet.png",
            ground: "sprites/ground.png",
            rod: "sprites/rod.png",
            
        }
        this.images = {} //holds all loaded imgs

        Object.keys(this.toLoad).forEach(key=>{
            let img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }


            img.onload = () =>{
                this.images[key].isLoaded = true;
                console.log(key, 'is loaded')
            }
            img.onerror = (e) => {
                console.log(key, e)
            }
        })

    }
}