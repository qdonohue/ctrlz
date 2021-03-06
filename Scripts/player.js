// also influenced by https://github.com/juanferrer/red-palito

class Player {

    constructor(p1) {
        this.player1 = p1;
        this.moveSpeed = 30;
        this.angleRotated = 0;
        this.ROTATION_SPEED = Math.PI / 1.5;
        this.positions = [];
        this.lastReversed = NaN;
        this.blocks;
        this.blockIndex;
        this.survivalTime = 0;
        this.myWeapons = [];
        this.currentWeapon = 0;
        this.lastSwapped = NaN;
        this.init();
        if (p1) {
            this.face(0, -Number.MAX_SAFE_INTEGER);
        } else {
            this.face(0, Number.MAX_SAFE_INTEGER);
        }
        this.totalBlockCount = 0;
        this.lastShot = NaN;
        this.shotSpeed = this.myWeapons[this.currentWeapon].recharge;
        this.liveBlocks = 0;
        this.gameStarted = false;
    }

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

        this.Mesh.geometry.computeBoundingBox();

        var pistol = new Weapon("pistol", 2, 1000, 0.8);
        var uzi = new Weapon("uzi", 1, 150, 0.2);
        this.myWeapons.push(pistol, uzi);
    }

    checkBlocksLeftAlive() {
        if (this.blockIndex === 0) gameOver(this.Player1);
        for (var i = 0; i < this.blockIndex; i++) {
            if (!this.blocks[i].destroyed()) {
                return;
            }
        }
        // otherwise all have been destroyed
        gameOver(this.player1);
    }


    checkBlocksVsTime() {
        var indexShouldBe = Math.floor(this.survivalTime / TIME_BETWEEN_BLOCK_PLACEMENT) + FREE_BLOCKS_AT_START;
        var diff = indexShouldBe - this.blockIndex;

        if (diff > 0) {
            if (indexShouldBe >= this.totalBlockCount) {
                this.checkBlocksLeftAlive();
                return;
            }
            for (var i = 0; i < diff; i++) {
                this.placeNextBlock();
            }
        } else if (diff < 0) {
            for (var i = 0; i < -diff; i++) {
                this.removeBlock();
            }
        }
        this.checkBlocksLeftAlive();
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
        var undoAmount = numPositions;

        if (this.positions.length === 0) {
            return;
        }

        var change = numPositions * TIME_BETWEEN_POSITIONS;
        this.survivalTime -= change;

        if (undoAmount > this.positions.length) {
            gameOver(this.player1);
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

    // current player position
	get position() {
		return this.Mesh.position;
	}

	// direction the player is facing
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
        if (this.player1) {
            this.Mesh.lookAt(x, y, this.Mesh.position.z);
        } else {
            this.Mesh.lookAt(x, y, -this.Mesh.position.z);
        }
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
	
	// replace with strafe right?
    rotateRight() {
        this.Mesh.rotateY(-this.ROTATION_SPEED * frameTime);
        this.angleRotated += this.ROTATION_SPEED * frameTime;
    }
	
	// replace with strafe left?
    rotateLeft() {
        this.Mesh.rotateY(this.ROTATION_SPEED * frameTime);
        this.angleRotated -= this.ROTATION_SPEED * frameTime;
    }

    shoot() {
        if (this.lastShot !== NaN) {
            var curTime = new Date();
            var ellapsed = curTime - this.lastShot;

            if (ellapsed < this.shotSpeed) return;

        }
        this.lastShot = new Date();
        var bullet = new Bullet(2, this.player1);
        var acc = 1.0;
        bullet.setDamage(this.myWeapons[this.currentWeapon].getDamage());
        var newPosition = this.position.clone();
        newPosition.addScaledVector(this.facingVector.clone(), 2);
        bullet.spawn(this, newPosition, this.facingVector, acc);
        bullets.push(bullet);
    }

    switchWeapon() {
        if (this.lastSwapped !== NaN) {
            var curTime = new Date();
            var ellapsed = curTime - this.lastSwapped;

            if (ellapsed < TIME_BETWEEN_WEAPON_SWAPS) return;
        }
        this.lastSwapped = new Date();

        this.currentWeapon = this.currentWeapon < this.myWeapons.length - 1 ? this.currentWeapon + 1 : 0;
        this.shotSpeed = this.myWeapons[this.currentWeapon].recharge;
    }

    collision(position, amount) {
        var bbox = this.Mesh.geometry.boundingBox.clone();
        var min = bbox.min.add(this.Mesh.position);
        var max = bbox.max.add(this.Mesh.position);

        if (position.x > min.x && position.x < max.x) {
            if (position.y > min.y && position.y < max.y) {
                this.goBack(Math.max(1, amount * 5));
                return true;
            }
        }
        return false;
    }

    // Helper function to check stuff
    debug() {

    }

}
