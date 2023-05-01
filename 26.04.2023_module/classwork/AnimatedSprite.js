import { StaticSprite } from './StaticSprite.js';

export class AnimatedSprite extends StaticSprite {
    constructor(layer, src, width, height) {
        super(layer, src);
        this.width = width;
        this.height = height;
        this.rows = 0;
        this.cols = 0;
        this.r = 0;
        this.c = 0;
        this.savedData = 0;
        this.ondestroy = () => { };
        this.oncollision = () => { };
    }

    spriteLoaded() {
        super.spriteLoaded();
        this.rows = Math.trunc(this.spriteSheet.height / this.height);
        this.cols = Math.trunc(this.spriteSheet.width / this.width);
    }

    show(x, y) {
        this.x = x;
        this.y = y;
        let sourceX = this.c * this.width;
        let sourceY = this.r * this.height;

        this.savedData = this.ctx.getImageData(x, y, this.width, this.height);
        this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    hide() {
        super.hide(this.x, this.y, this.width, this.height);
        this.ctx.putImageData(this.savedData, this.x, this.y);
    }

    isCollision(other) {
        if (this.x < other.x) {
            if (this.x + this.width < other.x) return false;
        } else {
            if (other.x + other.width < this.x) return false;
        }
        if (this.y < other.y) {
            if (this.y + this.height < other.y) return false;
        } else {
            if (other.y + other.height < this.y) return false;
        }

        return true;
    }
}
