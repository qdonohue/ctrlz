// also influenced by https://github.com/juanferrer/red-palito

class Player {

    constructor() {
        this.moveSpeed = 1;
        this.angleRotated = 0;
        this.ROTATION_SPEED = Math.PI / 3.0;
        this.init();
    }

    init() {
        this.geometry = new THREE.BoxGeometry( 1, 1, 5 );
        this.material = new THREE.MeshLambertMaterial( { color: 0x00b21d } );
        this.Mesh = new THREE.Mesh(this.geometry, this.material);
        this.Mesh.castShadow = true;
        this.Mesh.recieveShadow = true;
    }

    addToScene() {
        scene.add(this.Mesh);
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

    // move player forward
    moveForward() {
        var newPosition = this.Mesh.position;
        newPosition.add(this.facingVector.normalize().multiplyScalar(this.moveSpeed * frameTime));
        this.Mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    // backwars
    moveBackward() {
        var newPosition = this.Mesh.position;
        newPosition.add(this.facingVector.normalize().multiplyScalar(-this.moveSpeed * frameTime));
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
    
}