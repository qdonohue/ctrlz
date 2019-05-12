
// Discover if a position will collide with a block
function illegalMove(position, amount) { // if we collide 
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].collision(position, amount)) {
            return true;
        }
    }

    return false;
}

function removeFromBlocks(box) {
    var goalId = box.getID();

    for (var i = 0; i < BLOCK_COUNT; i++) {
        var cur = blocks[i];
        if (cur.getID() == goalId) {
            blocks.splice(i, 1); // get rid of the offending block
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