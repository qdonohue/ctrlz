// also influenced by https://github.com/juanferrer/red-palito

class Player {

    constructor() {
        this.moveSpeed = 30;
        this.angleRotated = 0;
        this.ROTATION_SPEED = Math.PI / 1.5;
        this.positions = [];
        this.lastReversed = NaN;
        this.blocks;
        this.blockIndex;
        this.survivalTime = 0;
        this.init();
        this.totalBlockCount = 0;
        this.lastShot = NaN;
    }

    // init() {
    //     this.geometry = new THREE.BoxGeometry( 1, 3, 1);
    //     this.material = new THREE.MeshLambertMaterial( { color: 0x00b21d } );
    //     this.Mesh = new THREE.Mesh(this.geometry, this.material);
    //     this.Mesh.lookAt(0, -1, 0);
    //     this.Mesh.position.add(new THREE.Vector3(0, 0, 3));
    //     this.Mesh.castShadow = true;
    //     this.Mesh.recieveShadow = true;
    // }

    init() {

        // legs
        var legsMat = new THREE.MeshLambertMaterial( {color: 0x002a6d});
        var legsGeo = new THREE.BoxGeometry( 2, 3, 3);
        var legsMesh = new THREE.Mesh( legsGeo, legsMat ) ;
        // body
        var bodyMat = new THREE.MeshLambertMaterial( {color: 0x16630b});
        var bodyGeo = new THREE.BoxGeometry(4, 3, 3);
        var bodyMesh = new THREE.Mesh( bodyGeo, bodyMat ) ;
        bodyMesh.position.y = 3;
        //head
        var headMat = new THREE.MeshLambertMaterial( {color: 0x000000});
        var headGeo = new THREE.SphereGeometry(1);
        var headMesh = new THREE.Mesh( headGeo, headMat ) ;
        headMesh.position.y = 5.5;

        // use helper function found online to merge the meshes together and keep colors
        this.Mesh = _mergeMeshes([legsMesh, bodyMesh, headMesh], false);
        this.Mesh.lookAt(0, -1, 0);
        this.Mesh.position.add(new THREE.Vector3(0, 0, 1.5));
        this.Mesh.castShadow = true;
        this.Mesh.recieveShadow = true;
    }

    checkBlocksVsTime() {
        var indexShouldBe = Math.floor(this.survivalTime / TIME_BETWEEN_BLOCK_PLACEMENT) + 15;
        var diff = indexShouldBe - this.blockIndex;

        if (diff > 0) {
            if (indexShouldBe >= this.totalBlockCount) return;
            for (var i = 0; i < diff; i++) {
                this.placeNextBlock();
            }
        } else if (diff < 0) {
            for (var i = 0; i < -diff; i++) {
                this.removeBlock();
            }
        }
    }

    removeBlock() {
        this.blockIndex--;
        this.blocks[this.blockIndex].remove();
    }

    assignBlocks(blocks) {
        this.blocks = blocks;
        this.totalBlockCount = this.blocks.length;
        this.blockIndex = 0;
        for (var i = 0; i < FREE_BLOCKS_AT_START; i++) {
            if (i == this.totalBlockCount) return;
            this.blocks[i].show();
            this.blockIndex++;
        }
    }

    updatePosition() {
        this.survivalTime += TIME_BETWEEN_POSITIONS;
        var xLoc = this.Mesh.position.x;
        var yLoc = this.Mesh.position.y;

        var footStep = new FootStep(xLoc, yLoc);

        this.positions.push(footStep);
        this.checkBlocksVsTime();
    }

    goBack(numPositions) {
        var curTime = new Date();
        if (this.lastReversed !== NaN) { // it registers key press too fast
            var ellapsed = curTime - this.lastReversed;
            if (ellapsed < TIME_BETWEEN_DAMAGE) {
                return;
            }
        }
        this.lastReversed = curTime;

        var undoAmount = numPositions;

        if (this.positions.length === 0) {
            return;
        }

        var change = numPositions * TIME_BETWEEN_POSITIONS;
        this.survivalTime -= change;

        if (undoAmount > this.positions.length) {
            undoAmount = this.positions.length;
        }

        var footFall;
        for (var i = 0; i < undoAmount; i++) {
            footFall = this.positions.pop();
            footFall.remove();
        }

        var newX = footFall.x;
        var newY = footFall.y;

        this.place(newX, newY);

        this.checkBlocksVsTime();
    }

    addToScene() {
        scene.add(this.Mesh);
    }

    placeNextBlock() {
        while (this.blocks[this.blockIndex].destroyed()) {
            if (this.blockIndex == totalBlockCount - 1) return;
            this.blockIndex++;
        }

        this.blocks[this.blockIndex].show();
        this.blockIndex++;
        
    }

    /**
     * Get the position of the model
     * @returns {THREE.Vector3}
     */
	get position() {
		return this.Mesh.position;
	}

	/**
     * Gets the facing vector of the model. A.K.A. Forward
     * @returns {THREE.Vector3}
     */
	get facingVector() {
		let matrix = new THREE.Matrix4();
		matrix.extractRotation(this.Mesh.matrix);

		let direction = new THREE.Vector3(0, 0, 1);
		return direction.applyMatrix4(matrix).normalize();
    }

    place(x, y) {
        this.Mesh.position.set(x, y, this.Mesh.position.z);
    }

    face(x, y) {
        this.Mesh.lookAt(x, y, 0);
    }

    // move player forward
    moveForward() {
        var newPosition = this.Mesh.position.clone();
        newPosition.add(this.facingVector.normalize().multiplyScalar(this.moveSpeed * frameTime));
        if (illegalMove(newPosition, PLAYER_COLLISION_DAMAGE)) return;
        this.Mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    // backwards
    moveBackward() {
        var newPosition = this.Mesh.position.clone();
        newPosition.add(this.facingVector.normalize().multiplyScalar(-this.moveSpeed * frameTime));
        if (illegalMove(newPosition, PLAYER_COLLISION_DAMAGE)) return;
        this.Mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    rotateRight() {
        this.Mesh.rotateY(-this.ROTATION_SPEED * frameTime);
        this.angleRotated += this.ROTATION_SPEED * frameTime;
    }

    rotateLeft() {
        this.Mesh.rotateY(this.ROTATION_SPEED * frameTime);
        this.angleRotated -= this.ROTATION_SPEED * frameTime;
    }

    shoot() {
        if (this.lastShot !== NaN) {
            var curTime = new Date();
            var ellapsed = curTime - this.lastShot;

            if (ellapsed < TIME_BETWEEN_SHOTS) return;

        }
        this.lastShot = new Date();
        var id = bullets.length
        var bullet = new Bullet(id);
        var acc = 1.0; // 100%?
        var newPosition = this.position.clone()
        newPosition.add(this.facingVector.clone());
        bullet.spawn(this, newPosition, this.facingVector, acc);
        bullets.push(bullet);
    }

    // Helper function to check stuff
    debug() {

    }

}
