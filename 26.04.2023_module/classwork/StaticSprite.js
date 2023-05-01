export class StaticSprite {
    ready = false;
    x = 0;
    y = 0;
    savedData = null;
    ondestroy = () => { };
    oncollision = () => { };

    constructor(layer, src) {
        this.layer = layer;
        this.ctx = layer.ctx;
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
    }

    destroy() {
        this.hide();
        this.layer.remove(this);
        this.ondestroy();
        delete this;
    }

    spriteLoaded(ev) {
        this.ready = true;
        this.width = ev.target.width;
        this.height = ev.target.height;
    }

    show(x, y) {
        this.x = x;
        this.y = y;

        this.savedData = this.ctx.getImageData(x, y, this.width, this.height);
        this.ctx.drawImage(this.spriteSheet, this.x, this.y);
    }

    hide() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.ctx.putImageData(this.savedData, this.x, this.y);
    }


}