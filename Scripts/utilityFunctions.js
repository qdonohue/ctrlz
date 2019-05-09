
// Discover if a position will collide with a block
function illegalMove(position) { // if we collide 
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].collision(position)) {
            return true;
        }
    }

    return false;
}