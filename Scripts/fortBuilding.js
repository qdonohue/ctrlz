function updateBlockOrder(index) {
    for (var j = index; j < BLOCK_COUNT - 1; j++) {
        blockOrder[j] = blockOrder[j + 1];
        blockLocations[blockOrder[j]] = j; // so blockLocations points correctly
    }

    updateBlockLabels();
}

function updateBlockLabels() {
    var selectedItems = $(".selected-grid-item");
    selectedItems.each(function (){
        var curID = $(this).attr('id');
        var newNumber = blockLocations[curID];
        $(this).html(newNumber);
    });
}

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

            if (this.className === "selected-grid-item") { // it has already been selected
                this.className = "unselected-grid-item";
                this.innerHTML = "";
                blockOrder[blockLocations[id]] = NaN;
                updateBlockOrder(blockLocations[id]);
                blockLocations[id] = NaN;
                highestBlockIndex--;
            } else {
                this.className = "selected-grid-item";
                var orderNumber = highestBlockIndex;
                highestBlockIndex++;
                blockLocations[id] = orderNumber;
                blockOrder[orderNumber] = id;
                this.innerHTML = orderNumber;
            }
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