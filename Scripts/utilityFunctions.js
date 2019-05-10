
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