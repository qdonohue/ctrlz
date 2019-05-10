

function buildBoard() {
    // What's gonna hold all our shit
    var topLevel = document.createElement('div');
    topLevel.id = "build_main";

    // Instructional text
    var text = document.createElement('div');
    text.id = "instructions";
    text.innerHTML = 'Click to place / remove a block';
    topLevel.appendChild(text);

    // Grid that will have sub blocks to click in / off
    var gridParent = document.createElement('div');
    gridParent.className = "grid-container";
    gridParent.id = 'gridboard';

    for (let i = 0; i < BLOCK_COUNT; i++) {
        var gridObject = document.createElement('div');
        gridObject.className = "unselected-grid-item";
        gridObject.id = i; // so we can know where it is

        gridObject.onclick = function() {
            id = parseInt(this.id); // kinda annoying but whatever

            if (blockLocations[id]) { // it has already been selected
                this.className = "unselected-grid-item";
            } else {
                this.className = "selected-grid-item";
            }
            // flip block locations
            blockLocations[id] = !blockLocations[id];
        }
        
        gridParent.appendChild(gridObject);
    }

    topLevel.appendChild(gridParent); // add our grid in

    // Parent element for input, spawn block
    var bottomParent = document.createElement('div');
    bottomParent.className = "spawnParent";
    topLevel.appendChild(bottomParent);

    // add in a spawn block location for clarity
    var spawn = document.createElement('div');
    spawn.className = "spawnBlock";
    var text = document.createElement('div');
    text.innerHTML = "Spawn";
    spawn.appendChild(text);
    bottomParent.appendChild(spawn);

    // spacing
    var spacing = document.createElement('div');
    spacing.className = "spacing";
    bottomParent.appendChild(spacing);

    // Continue button
    var onwards = document.createElement('INPUT');
    onwards.type = 'button';
    onwards.value='Continue';
    onwards.id = "continue-button";
    onwards.className = "fancyButton";

    onwards.onclick = function() {
        $("#build_main").hide();
        mainGame();
    };

    bottomParent.appendChild(onwards);

    document.body.appendChild(topLevel);
}