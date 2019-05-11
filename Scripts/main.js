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

var TIME_BETWEEN_DAMAGE = 1000; // 

var BLOCK_COLOR = [0x545331, 0x66643b, 0x827f4a, 0x9b9758, 0xafab62, 0xaf9262, 0xaf7f62, 0xb73d28, 0xd13014, 0xc92104];

blockLocations = Array(BLOCK_COUNT).fill(false); // initialize it all to false

var DEBUG = true;

if (DEBUG) {
    for (var j = 50; j < 80; j += 3) {
        blockLocations[j] = true;
    }

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
