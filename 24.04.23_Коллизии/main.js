import {Layer} from './layer.js';
import {StaticSprite} from './static_sprite.js';
import {Player} from './player.js';
import {Fireball} from './fireball.js';
import {MagicBall} from './magicBall.js';

const backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = window.innerWidth-2;
backgroundCanvas.height = window.innerHeight-2;

const gameplayCanvas = document.getElementById('gameplay');
gameplayCanvas.width = window.innerWidth-2;
gameplayCanvas.height = window.innerHeight-2;


const backgroundLayer = new Layer(backgroundCanvas);
const gameplayLayer   = new Layer(gameplayCanvas);


const background = new StaticSprite(backgroundLayer, './resources/terr.jpg');
setTimeout( () => background.show(0,0), 20 );


const player = new Player(gameplayLayer, './resources/sprite copy.png', 100, 100);
setTimeout( () => player.show(300,200), 20 );


let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
}

window.onkeydown = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        if (controls[ev.code].pressed) return;
        controls[ev.code].pressed = true;
        controls[ev.code].timer = setInterval(()=>{
            player.animate(controls[ev.code].direction);
        }, 75);
        player.animate(controls[ev.code].direction);
    } 
    if (ev.code === 'ArrowRight') {
        let magicBall = new MagicBall(gameplayLayer, './resources/ball.png', 100, 100, player.x + 80, player.y + 20, 1);
        magicBall.animate();
    } 

}

window.onkeyup = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval( controls[ev.code].timer );
    }
}


function generateFireballs() {
    let fireball = new Fireball(gameplayLayer, './resources/fireball_40x40.png', 40, 40);
    setTimeout( () => fireball.show(200,10, 5, 5), 20 );
    fireball.ondestroy = generateFireballs;    
}

generateFireballs();











