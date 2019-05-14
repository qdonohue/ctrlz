// Cannon Object - shoots always in one direction

class Cannon {

    // p1 is true or false saying if it was placed by p1
    constructor(id, p1) {
        this.id = id;
        this.health = 10;
        this.init();
        this.lastCollision = NaN;
        this.hasBeenDestroyed = false;
        this.hidden = true;
        if (p1) {
            this.direction = new THREE.Vector3(0, -1, 0);
            this.owner = player1;
        } else {
            this.direction = new THREE.Vector3(0, 1, 0);
            this.owner = player2;
        }
    }

    init() {
        // ideally modify this too. But modification of the geometry
        // means WE MUST modify the collision code - otherwise it won't work...
        // I think the position of the block is at the center, so it's +- 5 to
        // the edges if we wanna manually compute the bounding box off that
        // (min.x = position.x - 5), (max.x = position.x + 5, etc)
        var sideLength = BLOCK_SIZE;
        this.geometry = new THREE.BoxGeometry( sideLength, sideLength, sideLength);
        this.geometry.computeBoundingBox();
        this.material = new THREE.MeshLambertMaterial( {color: CANNON_COLOR[0]} );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.add(new THREE.Vector3(0, 0, sideLength / 2));
        this.cube.castShadow = true;
        this.cube.recieveShadow = true;
    }

    // Spawns a (larger) bullet
    shoot() {
        if (this.hasBeenDestroyed) return;
        if (this.hidden) return;
        var bullet = new Bullet(10);
        var acc = 1.0; // 100%?
        var newPosition = this.cube.position.clone()
        newPosition.add(this.direction.clone().multiplyScalar(5.0));
        bullet.spawn(this.owner, newPosition, this.direction, acc);
        bullets.push(bullet);
    }

    getID() {
        return this.id;
    }

    addToScene() {
        scene.add(this.cube);
    }

    destroyed() {
        return this.hasBeenDestroyed;
    }

    show() {
        if (this.hasBeenDestroyed) return;
        this.hidden = false;
        this.addToScene();
        blocks.push(this);
    }

    remove() {
        this.hidden = true;
        scene.remove(this.cube);
        removeFromBlocks(this);
    }

    place(x, y) {
        this.cube.position.set(x, y, this.cube.position.z);
    }

    damage(amount) { // damage a block
        // Check if it's been enough time for a collision
        if (this.lastCollision !== NaN) {
            var curTime = new Date();
            var ellapsedTime = curTime - this.lastCollision;

            if (ellapsedTime < TIME_BETWEEN_DAMAGE) return;

            // enough time has passed - update last collision
            this.lastCollision = curTime;
        }

        if (this.health - amount <= 0) {
            this.hasBeenDestroyed = true;
            removeFromArray(this, blocks);
            removeFromArray(this, cannons);
            scene.remove(this.cube); // take out of scene
        }

        this.health -= amount;
        var curColor = 10 - this.health;

        // change color
        var newColor = CANNON_COLOR[curColor];

        this.cube.material.color.setHex(newColor);
    }

    collision(position, amount) {
        var bbox = this.cube.geometry.boundingBox.clone();
        var min = bbox.min.add(this.cube.position);
        var max = bbox.max.add(this.cube.position);

        if (position.x > min.x && position.x < max.x) {
            if (position.y > min.y && position.y < max.y) {
                this.damage(amount);
                return true;
            }
        }

        return false;
    }


}
