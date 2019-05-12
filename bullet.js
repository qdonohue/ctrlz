class Bullet { // eslint-disable-line no-unused-vars
	constructor() {
		this.Geometry = new THREE.CylinderBufferGeometry(0.05, 0.05, 4, 5, 1);
		this.Material = new THREE.MeshBasicMaterial();
		this.Mesh = new THREE.Mesh(this.Geometry, this.Material);
		this.isAlive = false;
		scene.add(this.Mesh);
		//this.initialYPos = invisibleYPos;
		//this.Mesh.position.y = this.initialYPos;
		this.initialLifeTime = 1;
		this.lifeTime = this.initialLifeTime;
		this.direction = null;
		this.speed = 1.8;
		this.destructionPoint = null;
	}

	/**
	 * Gets the position of
	 * @returns {THREE.Vector3}
	 */
	get position() {
		return this.Mesh.position;
	}

	/**
     * Prepare a bullet and place it in the right position
     * @param {THREE.Vector3} pos Spawning position
     * @param {THREE.Vector3} dir Facing direction of bullet
     * @param {number} acc Shot accuracy
	 * @param {number} sp Speed of bullet
	 * @param {number} lt Lifetime
     */
	spawn(pos, dir, acc, sp = 1.8, lt = this.initialLifeTime) {
		this.direction = dir;
		this.isAlive = true;
		this.lifeTime = lt;
		this.speed = sp;
		this.Mesh.position.set(pos.x, pos.y, pos.z);
		this.orient(acc);
	}

	/**
	 * Set the position where the bullet should be destroyed
	 * @param {THREE.Vector3} point
	 */
	setDestructionPoint(point) {
		this.destructionPoint = point;
	}

	/**
     * Orient bullet towards target
     * @param {number} acc Shot accuracy
     */
	orient(acc) {
		const randX = Math.max((Math.random() - acc) / 20, 0);
		const randZ = Math.max((Math.random() - acc) / 20, 0);

		this.direction.add(new THREE.Vector3(randX, 0, randZ));
		this.Mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.direction.normalize());
	}

	/**
     * Prepare bullet for specific weapon
     * @param {number} weaponIndex Index of weapon to prepare bullet for
     */
	prepareForWeapon(weaponIndex) {
		switch (weaponIndex) {
			case 0: // Pistol
				this.Mesh.scale.y = 1;
				this.Material.color.setHex(0xFFFFFF);
				break;
			case 1: // Uzi
				this.Mesh.scale.y = 1;
				this.Material.color.setHex(0xFFFFFF);
				break;
			case 2: // Shotgun
				this.Mesh.scale.y = 1;
				this.Material.color.setHex(0xFFFFFF);
				break;
			case 3: // Laser
				this.Mesh.scale.y = 10;
				this.Material.color.setHex(0x0000FF);
				break;
		}
	}


	/** Set bullet to its initial state */
	reset() {
		this.Material.color.setHex(0x0);
		this.Mesh.scale.y = 1;
		this.isAlive = false;
		this.direction = null;
		this.position.set(0, this.initialYPos, 0);
		this.destructionPoint = undefined;
	}

	/**
     * Gets the Z vector of the model. A.K.A. Forward
     * @returns {THREE.Vector3}
     */
	get frontVector() {
		let matrix = new THREE.Matrix4();
		matrix.extractRotation(this.Mesh.matrix);

		let dir = new THREE.Vector3(0, 0, 1);
		return dir.applyMatrix4(matrix).normalize();
	}

}
