

// get X, Y coordinates of a box
function getPosition(number) {
    var x, y;

    y = Math.floor(number / BLOCK_PER_SIDE);
    x = number % BLOCK_PER_SIDE;

    // We've converted from (0 --> BLOCK_COUNT) into (0 --> BLOCK_PER_SIDE, 0 --> BLOCK_PER_SIDE)
    xBase = -BLOCK_SIZE / 2 + (BOARD_SIDE_LENGTH / 2);
    yBase = BLOCK_SIZE / 2 - (BOARD_SIDE_LENGTH / 2);

    var xFin = xBase - 10 * x;
    var yFin = yBase + 10 * y;
    
    var position = {};
    position.x = xFin;
    position.y = yFin;

    return position;
}

// Place all the blocks that were built
function build() {

    for (var i = 0; i < BLOCK_COUNT; i++) {
        if (blockLocations[i]) {
            var position = getPosition(i);
            var block = new Box(i);
            block.addToScene();
            block.place(position.x, position.y);
            blocks.push(block);
        }
    }
}