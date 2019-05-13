// Basic code setup from: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Enhanced by using tricks from: https://github.com/juanferrer/red-palito/blob/master/js/main.js (such as getting window resizing)

var scene, camera, clock, renderer, frameTime;
var player1, player2;
var temporal;
var blocks = []; // ALL blocks in scene, including turrets and cannons.
var bullets = [];
var cannons = [];
var players = []; // all players in scene
var weapons = []; //all available weapons

const BLOCK_COUNT = 100;
const PLACABLE_COUNT = 65;
const FREE_BLOCKS_AT_START = 15;
const BLOCK_PER_SIDE = 10;
const BOARD_SIDE_LENGTH = 100;
const BLOCK_SIZE = BOARD_SIDE_LENGTH / BLOCK_PER_SIDE;
const OFFSET_FROM_ORIGIN = 50;
const SPAWN_DISTANCE = (BOARD_SIDE_LENGTH + BLOCK_SIZE / 2);

const BOX_SUPPLY = 50; // maybe too many?
const TURRET_SUPPLY = 5;
const CANNON_SUPPLY = 10;

const BOX_TYPE = 0;
const TURRET_TYPE = 1;
const CANNON_TYPE = 2;

const PLAYER_COLLISION_DAMAGE = 1;

const TIME_BETWEEN_DAMAGE = 1000; // how long between collisions should they count?
const TIME_BETWEEN_POSITIONS = 1000;
const TIME_BETWEEN_BLOCK_PLACEMENT = 7000;
const TIME_BETWEEN_SHOTS = 250;

const BACKGROUND_COLOR = 0xA7A3A3;
const BLOCK_COLOR = [0x545331, 0x66643b, 0x827f4a, 0x9b9758, 0xafab62, 0xaf9262, 0xaf7f62, 0xb73d28, 0xd13014, 0xc92104];
const FOOTSTEP_COLOR = 0x015359;
const TURRET_COLOR = [0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee, 0xff00ee];
const CANNON_COLOR = [0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505, 0x050505];

const IS_PLAYER_1 = true;

var p1BlockOrder = Array(BLOCK_COUNT).fill(NaN);
var p1BlockType = Array(BLOCK_COUNT).fill(NaN); // denote what type of block
var p2BlockOrder = Array(BLOCK_COUNT).fill(NaN);
var p2BlockType = Array(BLOCK_COUNT).fill(NaN); // denote what type of block

// HORIZONTAL
var p1View = {
    camera: undefined,
    left: 0,
    bottom: .5,
    width: 1.0,
    height: 1.0
};

var p2View = {
    camera: undefined,
    left: 0,
    bottom: 0,
    width: 1,
    height: .5
};

// VERTICAL
/* var p1View = {
    camera: undefined,
    left: 0,
    bottom: 0,
    width: .5,
    height: 1.0
};

var p2View = {
    camera: undefined,
    left: .5,
    bottom: 0,
    width: 1,
    height: 1.0
}; */

var DEBUG = false;

if (DEBUG) {
    for (var i = 0; i < BLOCK_COUNT; i++) {
        p1BlockOrder[i] = i;
        p1BlockType[i] = BOX_TYPE;
    }
    $("#startScreen").hide();
    mainGame();
}

//$('#gameCanvas').append(renderer.domElement);

// When start button is clicked on, will transition to buildBoard stage
// (buildBoard then calls the mainGame loop itself)
$("#startButton").click(function () {
    $("#startScreen").hide();
    buildBoard(p1BlockOrder, p1BlockType, IS_PLAYER_1);
});

/** Decrease bullet lifetime and dispose of bullets */
function updateBullets() {
  //console.log(bullets.length);
  for (i=0; i < bullets.length; i++)
    bullets[i].update();
}

function shootCannons() {
  //console.log(cannons.length);
  for (i=0; i < cannons.length; i++)
    cannons[i].shoot();
}


function updateViewPort(view) {
    updateView(view.camera, view.left, view.bottom, view.width, view.height);
    renderer.render(scene, view.camera);
}


function mainGame() {

    function animate() {
        requestAnimationFrame(animate);
        temporal.update();
        shootCannons();
        updateBullets();
        Input.resolveInput(players);
        updateViewPort(p1View);
        updateViewPort(p2View);
        //renderer.render(scene, camera);
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
