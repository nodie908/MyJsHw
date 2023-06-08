const log = console.log;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon';

class Layer3d {
    constructor(renderer) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = renderer;
        this.orbitCtrls = new OrbitControls(this.camera, this.renderer.domElement);
        this.objects = [];
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0)
        });

        this.camera.position.set(0, 5, 30);
        this.orbitCtrls.update();
    }
    add(object) {
        this.scene.add(object.mesh);
        this.objects.push(object);
        this.world.addBody(object.body);
    }

    remove(object) {
        this.scene.remove(object.mesh);
        let index = this.objects.indexOf(object);
        if (index !== -1) {
            this.objects.splice(index, 1);
            this.world.removeBody(object.body);
        }
    }

    animationLoop() {
        let animate = () => {
            requestAnimationFrame(animate);
            for (let object of this.objects) {
                object.update();
            }
            this.orbitCtrls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    };
};

class Object3d {
    constructor(layer, type, size, color, mass) {
        this.layer = layer;
        this.type = type;
        this.size = size;
        this.color = color;
        this.mass = mass;
        this.mesh = null;
        this.body = null;
        this.material = null;
        this.friction = 0;
        this.world = layer.world;

        this.init();
    }

    init(world) {
        this.createMesh();
        this.createBody(world);
        this.addPhysics(world);
        this.layer.add(this);
    }

    createMesh() {
        switch (this.type) {
            case 'sphere':
                this.mesh = new THREE.Mesh(
                    new THREE.SphereGeometry(...this.size),
                    new THREE.MeshBasicMaterial({ color: this.color, wireframe: true })
                );
                break;
            case 'box':
                this.mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(...this.size),
                    new THREE.MeshBasicMaterial({ color: this.color })
                );
                break;
            case 'plane':
                this.mesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(...this.size),
                    new THREE.MeshBasicMaterial({ color: this.color, side: THREE.DoubleSide })
                );
                break;
            default:
                console.log('Invalid object type.');
        }
    }

    createBody() {
        const shape = this.getShape();
        const material = new CANNON.Material();
      
        this.body = new CANNON.Body({ shape, mass: this.mass, material });
      
        this.body.position.copy(this.mesh.position);
        this.body.quaternion.copy(this.mesh.quaternion);
      }
      

    getShape() {
        switch (this.type) {
            case 'sphere':
                return new CANNON.Sphere(this.size[0] / 2);
            case 'box':
                return new CANNON.Box(
                    new CANNON.Vec3(this.size[0] / 2, this.size[1] / 2, this.size[2] / 2)
                );
            case 'plane':
                return new CANNON.Plane();
            default:
                log("Недопустимый тип!");
                return null;
        }
    }

    addPhysics() {
        this.layer.world.addBody(this.body);
    }

    applyGravity() {
        const gravity = new CANNON.Vec3(0, -9.82, 0);
        this.body.applyForce(gravity, this.body.position);
      }

    setFriction(otherObject, value) {
        const ContactMaterial = new CANNON.ContactMaterial(
            this.body.material,
            otherObject.body.material,
            { friction: value }
        );
        this.layer.world.addContactMaterial(ContactMaterial);
    }

    rotate(x, y, z) {
        this.mesh.rotation.set(x, y, z);
        this.body.quaternion.copy(this.mesh.quaternion);
    }

    move(x, y, z) {
        this.mesh.position.set(x, y, z);
        this.body.position.copy(this.mesh.position);
    }

    force(x, y, z) {
        this.body.force.set(x, y, z);
    }

    update() {
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}

export { Layer3d, Object3d };
