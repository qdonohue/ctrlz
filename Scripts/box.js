class Box {

    constructor() {
        this.health = 10;
        this.init();
    }

    init() {
        this.geometry = new THREE.BoxGeometry( 10, 10, 10);
        this.geometry.computeBoundingBox();
        this.material = new THREE.MeshLambertMaterial( {color: 0x545331} );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.add(new THREE.Vector3(0, 0, 5));
        this.cube.castShadow = true;
        this.cube.recieveShadow = true;
    }

    addToScene() {
        scene.add(this.cube);
    }

    place(x, y) {
        this.cube.position.set(x, y, this.cube.position.z);
    }

    collision(position) {
        var bbox = this.cube.geometry.boundingBox.clone();
        var min = bbox.min.add(this.cube.position);
        var max = bbox.max.add(this.cube.position);

        if (position.x > min.x && position.x < max.x) {
            if (position.y > min.y && position.y < max.y) {
                return true;
            }
        }

        return false;
    }


}