// Basic code setup from: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Enhanced by using tricks from: https://github.com/juanferrer/red-palito/blob/master/js/main.js (such as getting window resizing)

var scene, camera, clock, renderer, frameTime;
var player;
var blockLocations;
var blocks = [];

var BLOCK_COUNT = 100;
var BLOCK_PER_SIDE = 10;
var BOARD_SIDE_LENGTH = 100;
var BLOCK_SIZE = BOARD_SIDE_LENGTH / BLOCK_PER_SIDE;

blockLocations = Array(BLOCK_COUNT).fill(false); // initialize it all to false

var DEBUG = false;

if (DEBUG) {
    $("#startScreen").hide();
    mainGame();
}

//$('#gameCanvas').append(renderer.domElement);

// When start button is clicked on, will transition to buildBoard stage
// (buildBoard then calls the mainGame loop itself)
$("#startButton").click(function () {
    $("#startScreen").hide();
    buildBoard();
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
