

// get X, Y coordinates of a box in player 2's coordinate system
function getPositionP2(number) {
    var x, y;

    y = Math.floor(number / BLOCK_PER_SIDE);
    x = number % BLOCK_PER_SIDE;

    // We've converted from (0 --> BLOCK_COUNT) into (0 --> BLOCK_PER_SIDE, 0 --> BLOCK_PER_SIDE)
    xBase = BLOCK_SIZE / 2 - (BOARD_SIDE_LENGTH / 2);
    yBase = -BLOCK_SIZE / 2;

    var xFin = xBase + 10 * x;
    var yFin = yBase - 10 * y;

    var position = {};
    position.x = xFin;
    position.y = yFin;

    return position;
}

// get X, Y coordinates of a box
function getPositionP1(number) {
    var x, y;

    y = Math.floor(number / BLOCK_PER_SIDE);
    x = number % BLOCK_PER_SIDE;

    // We've converted from (0 --> BLOCK_COUNT) into (0 --> BLOCK_PER_SIDE, 0 --> BLOCK_PER_SIDE)
    xBase = -BLOCK_SIZE / 2 + (BOARD_SIDE_LENGTH / 2);
    yBase = BLOCK_SIZE / 2;

    var xFin = xBase - 10 * x;
    var yFin = yBase + 10 * y;

    var position = {};
    position.x = xFin;
    position.y = yFin;

    return position;
}

// p1 is boolean indicating if player 1
function buildPlayerArray(given, type, p1) {
    var finished = [];
    for (var i = 0; i < BLOCK_COUNT; i++) {
        if (given[i] === NaN) return finished;
        var curType = type[i];
        var blockID = given[i];
        if (p1) {
            var curPosition = getPositionP1(blockID);
        } else {
            var curPosition = getPositionP2(blockID);
        }
        if (!p1) blockID += 100; // for collision purposes
        if (curType == BOX_TYPE) {
            var curBlock = new Box(blockID, p1);
            curBlock.place(curPosition.x, curPosition.y);
            finished.push(curBlock);
        } else if (curType == TURRET_TYPE) {
            var curBlock = new Turret(blockID, p1);
            curBlock.place(curPosition.x, curPosition.y);
            turrets.push(curBlock);
            finished.push(curBlock);
        } else if (curType == CANNON_TYPE) {
            var curBlock = new Cannon(blockID, p1);
            curBlock.place(curPosition.x, curPosition.y);
            finished.push(curBlock);
            cannons.push(curBlock);
        }
    }

    return finished;
}
