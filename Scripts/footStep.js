
// leave footstep object

class FootStep {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        var footGeo = new THREE.PlaneGeometry(2, 3, 0);
        var footMat = new THREE.MeshBasicMaterial( {color: FOOTSTEP_COLOR});
        this.footStep = new THREE.Mesh(footGeo, footMat);
        this.footStep.position.add(new THREE.Vector3(this.x, this.y, .1)); // raise slightly to be above
        scene.add(this.footStep);
        //init();
    }

    init() {
        var footGeo = new THREE.PlaneGeometry(2, 3, 0);
        var footMat = new THREE.MeshBasicMaterial( {color: FOOTSTEP_COLOR});
        this.footStep = new THREE.Mesh(footGeo, footMat);
        this.footStep.position.add(this.x, this.y, .1); // raise slightly to be above
        scene.add(this.footStep);
    }

    remove() {
        scene.remove(this.footStep);
    }

}