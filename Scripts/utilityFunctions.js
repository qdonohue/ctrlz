// Code Pulled From Becky Barber's coloring project:
// https://beckybarber18.github.io/coloring/
// B/c I was unsure how to make 3 JS play nice with multiple viewports
// and couldn't find adequate documentation
function updateView(camera, l, b, w, h) {
    const left = Math.floor( window.innerWidth * l );
    const bottom = Math.floor( window.innerHeight * b );
    const width = Math.floor( window.innerWidth * w );
    const height = Math.floor( window.innerHeight * h );
    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );
    renderer.setScissorTest( true );
    renderer.setClearColor( BACKGROUND_COLOR );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

// Discover if a position will collide with a block
function illegalMove(position, amount) { // if we collide
    if (position.x < MIN_X || position.x > MAX_X) return true;
    if (position.y < MIN_Y || position.y > MAX_Y) return true;
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].collision(position, amount, false)) {
            return true;
        }
    }

    return false;
}

function bulletCollision(position, amount, p1) { // if bullet collides
    if (p1) {
        if (players[1].collision(position, amount)) return true;
    } else {
        if (players[0].collision(position, amount)) return true;
    }
    
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].collision(position, amount, true, p1))
            return true;
    }
    return false;
}

function removeFromArray(item, array) {
    var goalId = item.getID();

    for (var i = 0; i < array.length; i++) {
        var cur = array[i];
        if (cur.getID() == goalId) {
            array.splice(i, 1); // get rid of the offending bullet
            return;
        }
    }
}

// Helper function that will merge meshes
// taken from: https://stackoverflow.com/questions/27217388/use-multiple-materials-for-merged-geometries-in-three-js
function _mergeMeshes(meshes, toBufferGeometry) {

    var finalGeometry,
        materials = [],
        mergedGeometry = new THREE.Geometry(),
        mergeMaterial,
        mergedMesh;

    meshes.forEach(function(mesh, index) {
        mesh.updateMatrix();
        mesh.geometry.faces.forEach(function(face) {face.materialIndex = 0;});
        mergedGeometry.merge(mesh.geometry, mesh.matrix, index);
        materials.push(mesh.material);
    });

    mergedGeometry.groupsNeedUpdate = true;
    mergeMaterial = new THREE.MeshFaceMaterial(materials);

    if (toBufferGeometry) {
        finalGeometry = new THREE.BufferGeometry().fromGeometry(mergedGeometry);
    } else {
        finalGeometry = mergedGeometry;
    }

    mergedMesh = new THREE.Mesh(finalGeometry, mergeMaterial);
    mergedMesh.geometry.computeFaceNormals();
    mergedMesh.geometry.computeVertexNormals();

    return mergedMesh;

}
