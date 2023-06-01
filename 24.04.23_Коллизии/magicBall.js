import { AnimatedSprite } from './animated_sprite.js';

export class MagicBall extends AnimatedSprite {
    constructor(ctx, src, width, height, startX, startY, direction) {
        super(ctx, src, width, height, false);
        this.x = startX;
        this.y = startY;
        this.direction = direction;
    }


    animate() {
        this.x += 10 * this.direction;
        this.show(this.x, this.y);
    }


}