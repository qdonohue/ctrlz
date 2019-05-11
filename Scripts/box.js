class Box {

    constructor(id) {
        this.id = id;
        this.health = 10;
        this.init();
        this.lastCollision = NaN;
    }

    init() {
        var sideLength = BLOCK_SIZE;
        this.geometry = new THREE.BoxGeometry( sideLength, sideLength, sideLength);
        this.geometry.computeBoundingBox();
        this.material = new THREE.MeshLambertMaterial( {color: BLOCK_COLOR[0]} );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.add(new THREE.Vector3(0, 0, sideLength / 2));
        this.cube.castShadow = true;
        this.cube.recieveShadow = true;
    }

    getID() {
        return this.id;
    }

    addToScene() {
        scene.add(this.cube);
    }

    show() {
        this.addToScene();
        blocks.push(this);
    }

    remove() {
        scene.remove(this.cube);
        removeFromBlocks(this);
    }

    place(x, y) {
        this.cube.position.set(x, y, this.cube.position.z);
    }

    damage() { // damage a block
        // Check if it's been enough time for a collision
        if (this.lastCollision !== NaN) {
            var curTime = new Date();
            var ellapsedTime = curTime - this.lastCollision;

            if (ellapsedTime < TIME_BETWEEN_DAMAGE) return;

            // enough time has passed - update last collision
            this.lastCollision = curTime;
        }

        if (this.health === 1) {
            removeFromBlocks(this); // take out of collision calculations
            scene.remove(this.cube); // take out of scene
        }

        this.health -= 1;
        var curColor = 10 - this.health;

        // change color
        var newColor = BLOCK_COLOR[curColor];
        
        this.cube.material.color.setHex(newColor);
    }

    collision(position) {
        var bbox = this.cube.geometry.boundingBox.clone();
        var min = bbox.min.add(this.cube.position);
        var max = bbox.max.add(this.cube.position);

        if (position.x > min.x && position.x < max.x) {
            if (position.y > min.y && position.y < max.y) {
                this.damage();
                return true;
            }
        }

        return false;
    }


}