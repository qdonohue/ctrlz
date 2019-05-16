// Basic code setup from: https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
// Enhanced by using tricks from: https://github.com/juanferrer/red-palito/blob/master/js/main.js (such as getting window resizing)

var scene, camera, clock, renderer, frameTime;
var player1, player2;
var temporal;

var blocks = []; // ALL blocks in scene, including turrets and cannons.
var bullets = [];
var cannons = [];
var turrets = [];
var players = []; // all players in scene
var weapons = []; //all available weapons

var GAME_OVER;

var currentBulletID;

const BLOCK_COUNT = 100;
const PLACABLE_COUNT = 65;
const FREE_BLOCKS_AT_START = 10;
const BLOCK_PER_SIDE = 10;
const BOARD_SIDE_LENGTH = 100;
const BLOCK_SIZE = BOARD_SIDE_LENGTH / BLOCK_PER_SIDE;
const OFFSET_FROM_ORIGIN = 50;
const SPAWN_DISTANCE = (BOARD_SIDE_LENGTH + BLOCK_SIZE / 2);

const BOX_SUPPLY = 20; // reduced to 20 from 50
const TURRET_SUPPLY = 5;
const CANNON_SUPPLY = 10;

const BOX_TYPE = 0;
const TURRET_TYPE = 1;
const CANNON_TYPE = 2;

const PLAYER_COLLISION_DAMAGE = 1;
const CANNON_DAMAGE = 2;
const TURRET_DAMAGE = 5;

const TIME_BETWEEN_DAMAGE = 1000; // how long between collisions should they count?
const TIME_BETWEEN_POSITIONS = 1000;
const TIME_BETWEEN_BLOCK_PLACEMENT = 7000;
const TIME_BETWEEN_SHOTS = 250;
const TIME_BETWEEN_CANNON_SHOTS = 1000;
const TIME_BETWEEN_TURRET_SHOTS = 1500;
const TIME_GRACE_PERIOD = 5000;
const TIME_BETWEEN_WEAPON_SWAPS = 1500;

const BACKGROUND_COLOR = 0xA7A3A3;
const BLOCK_COLOR = [0x545331, 0x66643b, 0x827f4a, 0x9b9758, 0xafab62, 0xaf9262, 0xaf7f62, 0xb73d28, 0xd13014, 0xc92104];
const FOOTSTEP_COLOR = 0x015359;
const TURRET_COLOR = [0xff00ee, 0xff00cb, 0xff00a5, 0xff007b, 0xff003f, 0xff1e56, 0xff4775, 0xff6088, 0xf97a9a, 0xfc8fab];
const CANNON_COLOR = [0x050505, 0x1c1c1c, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999, 0xaaaaaa];
const WALL_COLOR = 0x496163;

const MIN_X = -BOARD_SIDE_LENGTH / 2;
const MAX_X = BOARD_SIDE_LENGTH / 2;
const MIN_Y = -BOARD_SIDE_LENGTH - BLOCK_SIZE;
const MAX_Y = BOARD_SIDE_LENGTH + BLOCK_SIZE;

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
    width: 1.0,
    height: .5
};

var DEBUG = false;

if (DEBUG) {
    for (var i = 0; i < 10; i++) {
        p2BlockOrder[i] = i;
        p2BlockType[i] = BOX_TYPE;
        p1BlockOrder[i] = i;
        p1BlockType[i] = BOX_TYPE;
    }
    $("#startScreen").hide();
    mainGame();
}


// When start button is clicked on, will transition to buildBoard stage
// (buildBoard then calls the mainGame loop itself)
$("#startButton").click(function () {
    $("#startScreen").hide();
    selectControls(true);
});

$('#instructionButton').click(function () {
    $('#startScreen').hide();
    instructions();
})

// update every bullet in the scene
function updateBullets() {
  for (i=0; i < bullets.length; i++)
    bullets[i].update();
}

function updateViewPort(view) {
    updateView(view.camera, view.left, view.bottom, view.width, view.height);
    renderer.render(scene, view.camera);
}


function mainGame() {

    function animate() {
        if (GAME_OVER) return;
        requestAnimationFrame(animate);
        temporal.update();
        updateBullets();
        Input.resolveInput(players);
        updateViewPort(p1View);
        updateViewPort(p2View);
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
