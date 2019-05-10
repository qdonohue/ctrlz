// also influenced by https://github.com/juanferrer/red-palito

class Player {

    constructor() {
        this.moveSpeed = 10;
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
        var legsGeo = new THREE.BoxGeometry( 2, 3, 3);
        var legsMesh = new THREE.Mesh( legsGeo, meshMaterial ) ;
        // body
        var bodyGeo = new THREE.BoxGeometry(4, 3, 3);
        var bodyMesh = new THREE.Mesh( bodyGeo, meshMaterial ) ;
        bodyMesh.position.y = 3;
        //head
        var headGeo = new THREE.SphereGeometry(1);
        var headMesh = new THREE.Mesh( headGeo, meshMaterial ) ; 
        headMesh.position.y = 6;
        
        // merged legs body and head
        var geometry = new THREE.Geometry();
        legsMesh.updateMatrix();
        geometry.merge(legsMesh.geometry, legsMesh.matrix);
        bodyMesh.updateMatrix();
        geometry.merge(bodyMesh.geometry, bodyMesh.matrix);
        headMesh.updateMatrix();
        geometry.merge(headMesh.geometry, headMesh.matrix);

        this.Mesh = new THREE.Mesh( geometry, meshMaterial ) ;
        this.Mesh.lookAt(0, -1, 0);
        this.Mesh.position.add(new THREE.Vector3(0, 0, 3));
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