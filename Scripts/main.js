// Basic code setup from: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Enhanced by using tricks from: https://github.com/juanferrer/red-palito/blob/master/js/main.js (such as getting window resizing)

var scene, camera, clock, renderer, frameTime;
var player;
var blockLocations;

var BLOCK_COUNT = 100;

blockLocations = Array(BLOCK_COUNT).fill(false); // initialize it all to false

//$('#gameCanvas').append(renderer.domElement);

$("#startButton").click(function () {
    $("#startScreen").hide();
    buildBoard();
    //mainGame()
});

function mainGame() {
    
    function animate() {
        requestAnimationFrame(animate);
        Input.resolveInput(player);
        renderer.render(scene, camera);
        frameTime = clock.getDelta();
    }

    init();

    // HANDLE WINDOW RESIZING
    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    animate();

}
