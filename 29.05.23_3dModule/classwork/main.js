// const log = console.log;

import * as THREE from 'three';
import { Layer3d, Object3d } from './threeD.js';
// import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// import * as CANNON from 'cannon'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const orbitCtrl = new OrbitControls(camera, renderer.domElement);
// camera.position.set(0, 5, 30);
// orbitCtrl.update();

// const floorGeo = new THREE.PlaneGeometry(30, 30);
// const floorMat = new THREE.MeshBasicMaterial({color: 0x113333, side: THREE.DoubleSide});
// const floor = new THREE.Mesh(floorGeo, floorMat);
// scene.add(floor);

// const ballGeo = new THREE.SphereGeometry(2);
// const ballMat = new THREE.MeshBasicMaterial({color:0x993311, wireframe: true});
// const ball = new THREE.Mesh(ballGeo, ballMat);
// scene.add(ball);

// const blockGeo = new THREE.BoxGeometry(1,10,1);
// const blockMat = new THREE.MeshBasicMaterial({color:0x666666});
// const block = new THREE.Mesh(blockGeo, blockMat);
// scene.add(block);


// const world = new CANNON.World({
//     gravity: new CANNON.Vec3(0, -9.82, 0)
// });


// const floorPhysicMat = new CANNON.Material();
// const floorBody = new CANNON.Body({
//     shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
//     material: floorPhysicMat,
//     mass: 0
// });
// floorBody.quaternion.setFromEuler(-Math.PI/2, 0, 0);

// const ballBody = new CANNON.Body({
//     shape: new CANNON.Sphere(2),
//     mass: 3
// });
// ballBody.position.set(0, 4, 10);
// ballBody.linearDamping = 0.5;

// const blockPhysicMat = new CANNON.Material();
// const blockBody = new CANNON.Body({
//     shape: new CANNON.Box(new CANNON.Vec3(0.5, 5, 0.5)),
//     material: blockPhysicMat,
//     mass: 2
// });
// blockBody.position.set(2, 5, -1);

// const floorToBlockContact = new CANNON.ContactMaterial(floorPhysicMat, blockPhysicMat, {
//     friction: 0.01
// })

// world.addBody(floorBody);
// world.addBody(ballBody);
// world.addBody(blockBody);
// world.addContactMaterial(floorToBlockContact);

// const worldTimeStep = 1/30;
// renderer.setAnimationLoop(() => {
//     world.step(worldTimeStep);

//     floor.position.copy(floorBody.position);
//     floor.quaternion.copy(floorBody.quaternion);

//     ball.position.copy(ballBody.position);
//     ball.quaternion.copy(ballBody.quaternion);

//     block.position.copy(blockBody.position);
//     block.quaternion.copy(blockBody.quaternion);

//     renderer.render(scene, camera);
// });

// let ballForce = new CANNON.Vec3(0,0,0);
// ballBody.force = ballForce;

// window.onkeydown = (ev) => {
//     switch(ev.code) {
//         case "ArrowUp":     ballForce.z = -20; break;
//         case "ArrowDown":   ballForce.z =  20; break;
//         case "ArrowLeft":   ballForce.x = -20; break;
//         case "ArrowRight":  ballForce.x =  20; break;
//     }
// };

// ballBody.addEventListener('collide', (ev) => {
//     log(ev);
// });


const layer = new Layer3d(renderer);

const floor = new Object3d(layer, "plane", [30, 30], 0x85adad, 0);
floor.rotate(-Math.PI / 2, 0, 0);
layer.add(floor);

const ball = new Object3d(layer, "sphere", [2], 0x0008ff, 3);

ball.move(0, 4, 10);
// ball.force(0, -10, 0);
ball.body.linearDamping = 0.1;
ball.applyGravity();
layer.add(ball);

const block = new Object3d(layer, 'box', [1, 10, 1], 0x666666, 2);
block.move(2, 15, -1);
// block.force(0,-10,0);
block.applyGravity();
layer.add(block);

ball.setFriction(floor, 0.01);

window.addEventListener('keydown', (ev) => {
  switch (ev.code) {
    case 'ArrowUp':
      ball.force(0, 0, -20);
      break;
    case 'ArrowDown':
      ball.force(0, 0, 20);
      break;
    case 'ArrowLeft':
      ball.force(-20, 0, 0);
      break;
    case 'ArrowRight':
      ball.force(20, 0, 0);
      break;
  }
});

layer.animationLoop();



//let my_ball = new Object3d(layer, 'box', [10, 4, 2], mass);

