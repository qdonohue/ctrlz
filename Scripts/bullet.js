class Bullet { // eslint-disable-line no-unused-vars
	constructor(id) {
		this.id = id;
		this.Geometry = new THREE.CylinderBufferGeometry(0.05, 0.05, 4, 5, 1);
		this.Material = new THREE.MeshBasicMaterial();
		this.Mesh = new THREE.Mesh(this.Geometry, this.Material);
		this.isAlive = false;
		this.direction = null;
		this.speed = 1.8;
		this.destructionPoint = null;
		this.damage = 1;
	}

	/**
	 * Gets the position of
	 * @returns {THREE.Vector3}
	 */
	get position() {
		return this.Mesh.position;
	}

	getID() {
			return this.id;
	}

	/**
     * Prepare a bullet and place it in the right position
     * @param {THREE.Vector3} pos Spawning position
     * @param {THREE.Vector3} dir Facing direction of bullet
     * @param {number} acc Shot accuracy
	 * @param {number} sp Speed of bullet
     */
	spawn(player, pos, dir, acc, sp = 1.0, damage = 1.0) {
		this.owner = player;
		scene.add(this.Mesh);
		this.damage = damage;
		this.direction = dir;
		this.isAlive = true;
		this.speed = sp;
		this.Mesh.position.set(pos.x, pos.y, pos.z);
		this.orient(acc);
	}

	setDamage(damage) {
		this.damage = damage;
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

	// Calulate new position and check for collisions
	update() {
			this.position.add(this.direction.multiplyScalar(this.speed));
			if (bulletCollision(this.position, this.damage) ||
			this.position.distanceTo(this.owner.position) > 300.0) {
				removeFromArray(this, bullets);
				scene.remove(this.Mesh);
			}

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
