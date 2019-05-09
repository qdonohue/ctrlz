class Box {
    constructor() {
        this.init();
    }

    init() {
        this.geometry = new THREE.BoxGeometry( 5, 5, 5);
        this.material = new THREE.MeshBasicMaterial( {color: 0x0074f9} );
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.cube.position.add(new THREE.Vector3(5, 5, 3));
        this.cube.castShadow = true;
        this.cube.recieveShadow = true;
    }

    addToScene() {
        scene.add(this.cube);
    }
}