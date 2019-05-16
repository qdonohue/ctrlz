class Bullet { 
	constructor(size, p1) {
		this.id = currentBulletID;
		currentBulletID++;
		let radius = size/10.0;
		this.Geometry = new THREE.CylinderBufferGeometry(radius, radius, 4, 5, 1);
		this.Material = new THREE.MeshBasicMaterial();
		this.Mesh = new THREE.Mesh(this.Geometry, this.Material);
		this.isAlive = false;
		this.direction = null;
		this.speed = 1.8;
		this.damage = 1;
		this.p1 = p1;
		this.owner = player1; // by default in case something goes wonky
	}

	get position() {
		return this.Mesh.position;
	}

	getID() {
			return this.id;
	}

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

	setColor(value) {
		this.Mesh.material.color.setHex(value);
	}

	orient(acc) {
		const randX = Math.max((Math.random() - acc) / 20, 0);
		const randZ = Math.max((Math.random() - acc) / 20, 0);

		this.direction.add(new THREE.Vector3(randX, 0, randZ));
		this.Mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), this.direction.normalize());
	}

	// Calulate new position and check for collisions
	update() {
		this.position.add(this.direction.multiplyScalar(this.speed));
		if (bulletCollision(this.position, this.damage, this.p1) ||
		this.position.distanceTo(this.owner.position) > 300.0) { //TODO: Change to non-arbitrary pos
			// dispose?
			removeFromArray(this, bullets);
			scene.remove(this.Mesh);
		}
	}
}
