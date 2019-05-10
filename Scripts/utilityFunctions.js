
// Discover if a position will collide with a block
function illegalMove(position) { // if we collide 
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].collision(position)) {
            return true;
        }
    }

    return false;
}


// get X, Y coordinates of a box
function getPosition(number) {
    var x, y;

    y = Math.floor(number / BLOCK_PER_SIDE);
    x = number % BLOCK_PER_SIDE;

    // We've converted from (0 --> BLOCK_COUNT) into (0 --> BLOCK_PER_SIDE, 0 --> BLOCK_PER_SIDE)


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