// Basic code setup from: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Enhanced by using tricks from: https://github.com/juanferrer/red-palito/blob/master/js/main.js (such as getting window resizing)

var scene, camera, clock, renderer, frameTime;
var player, player2;
var temporal;
var blocks = []; // ALL blocks in scene, including turrets and cannons.
var bullets = [];

var BLOCK_COUNT = 100;
var PLACABLE_COUNT = 65;
var FREE_BLOCKS_AT_START = 15;
var BLOCK_PER_SIDE = 10;
var BOARD_SIDE_LENGTH = 100;
var BLOCK_SIZE = BOARD_SIDE_LENGTH / BLOCK_PER_SIDE;

var PLAYER_COLLISION_DAMAGE = 1;

var TIME_BETWEEN_DAMAGE = 1000; // how long between collisions should they count?
var TIME_BETWEEN_POSITIONS = 1000;
var TIME_BETWEEN_BLOCK_PLACEMENT = 7000;

var BLOCK_COLOR = [0x545331, 0x66643b, 0x827f4a, 0x9b9758, 0xafab62, 0xaf9262, 0xaf7f62, 0xb73d28, 0xd13014, 0xc92104];
var FOOTSTEP_COLOR = 0x015359;
var TURRET_COLOR = [0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee];
var CANNON_COLOR = [0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505];


var blockOrder = Array(BLOCK_COUNT).fill(NaN);
var blockLocations = Array(BLOCK_COUNT).fill(NaN);
var highestBlockIndex = 0;

var DEBUG = false;

if (DEBUG) {
    for (var i = 0; i < BLOCK_COUNT; i++) {
        blockOrder[i] = i;
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

/** Decrease bullet lifetime and dispose of bullets */
function updateBullet() {
  //console.log(bullets.length);
  for (i=0; i < bullets.length; i++) {
    // check for collision
    /*if (bullets[i].position.distanceTo(player.position) < 3.0) {
      bullets[i].reset();
      bullets.pop(bullets[i]);
      continue;
    }
    */
    // movement
    bullets[i].position.add(bullets[i].direction.multiplyScalar(bullets[i].speed));

  }
}


function mainGame() {

    function animate() {
        requestAnimationFrame(animate);
        temporal.update();
        updateBullet();
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
