// also influenced by https://github.com/juanferrer/red-palito

class Player {

    constructor() {
        this.moveSpeed = 30;
        this.angleRotated = 0;
        this.ROTATION_SPEED = Math.PI / 1.5;
        this.init();
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
        
        var meshMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff});

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
        if (illegalMove(newPosition)) return;
        this.Mesh.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    // backwards
    moveBackward() {
        var newPosition = this.Mesh.position.clone();
        newPosition.add(this.facingVector.normalize().multiplyScalar(-this.moveSpeed * frameTime));
        if (illegalMove(newPosition)) return;
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

    // Helper function to check stuff
    debug() {
        console.log(this.Mesh.position);
    }
    
}

