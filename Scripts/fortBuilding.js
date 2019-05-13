function updateBlockOrder(index, blockOrder, blockType, blockLocations) {
    for (var j = index; j < BLOCK_COUNT - 1; j++) {
        blockOrder[j] = blockOrder[j + 1];
        blockType[j] = blockType[j + 1];
        blockLocations[blockOrder[j]] = j; // so blockLocations points correctly
    }

    updateBlockLabels(blockLocations);
}

function updateBlockLabels(blockLocations) {
    var selectedItems = $(".selected-grid-item");
    selectedItems.each(function (){
        var curID = $(this).attr('id');
        var newNumber = blockLocations[curID];
        $(this).html(newNumber);
    });
}

function fixUnselected(counterContainers, cur) {
    for (var i = 0; i < 3; i++) {
        if (i == cur) continue;
        counterContainers[i].className = "counter";
    }
}

function updateCounterNumbers(placeable) {
    $("#box-count").html(placeable[BOX_TYPE]);
    $("#turret-count").html(placeable[TURRET_TYPE]);
    $("#cannon-count").html(placeable[CANNON_TYPE]);
}

function matchOrderAndType(order, type) {
    var matched = Array(BLOCK_COUNT).fill(NaN);

    for (var i = 0; i < order.length; i++) {
        matched[i] = type[order[i]];
    }

    console.log(matched);

    return matched;
}

function buildBoard(blockOrder, blockType) {
    // variables we'll need
    var blockLocations = Array(BLOCK_COUNT).fill(NaN);
    var highestBlockIndex = 0;
    var currentlySelected = 0;
    
    var placeable = [BOX_SUPPLY, TURRET_SUPPLY, CANNON_SUPPLY];
    var counterClassNames = ["box-selected", "turret-selected", "cannon-selected"];
    var counterContainers = [];

    // What's gonna hold all our shit
    var topLevel = document.createElement('div');
    topLevel.id = "build_main";

    // Instructional text
    var text = document.createElement('div');
    text.id = "instructions";
    text.innerHTML = 'Click to place / remove a block';
    topLevel.appendChild(text);

    // Hold grid board, and label of which unit is selected / how many you have
    var midParent = document.createElement('div');
    midParent.id = "mid-parent";


    // Set up unit selection
    var typeSelector = document.createElement('div');
    typeSelector.className = "type-box";

    // for box
    var boxContainer = document.createElement('div');
    boxContainer.className = "counter-selected";
    boxContainer.onclick = function() {
        if (placeable[BOX_TYPE] > 0) {
            currentlySelected = BOX_TYPE;
            boxContainer.className = "counter-selected";
            fixUnselected(counterContainers, currentlySelected);
        }
    }
    var boxLabel = document.createElement('div');
    boxLabel.className = "label";
    boxLabel.innerHTML = "Box: ";
    boxContainer.appendChild(boxLabel);
    var boxCount = document.createElement('div');
    boxCount.id = "box-count";
    boxCount.innerHTML = BOX_SUPPLY;
    boxContainer.appendChild(boxCount);
    typeSelector.appendChild(boxContainer);
    counterContainers.push(boxContainer);

    // turret
    var turretContainer = document.createElement('div');
    turretContainer.className = "counter";
    turretContainer.onclick = function() {
        if (placeable[TURRET_TYPE] > 0) {
            currentlySelected = TURRET_TYPE;
            turretContainer.className = "counter-selected";
            fixUnselected(counterContainers, currentlySelected);
        }
    }
    var turretLabel = document.createElement('div');
    turretLabel.className = "label";
    turretLabel.innerHTML = "Turret: ";
    turretContainer.appendChild(turretLabel);
    var turretCount = document.createElement('div');
    turretCount.id = "turret-count";
    turretCount.innerHTML = TURRET_SUPPLY;
    turretContainer.appendChild(turretCount);
    typeSelector.appendChild(turretContainer);
    counterContainers.push(turretContainer);

    // cannon
    var cannonContainer = document.createElement('div');
    cannonContainer.className = "counter";
    cannonContainer.onclick = function() {
        if (placeable[CANNON_TYPE] > 0) {
            currentlySelected = CANNON_TYPE;
            cannonContainer.className = "counter-selected";
            fixUnselected(counterContainers, currentlySelected);
        }
    }
    var cannonLabel = document.createElement('div');
    cannonLabel.className = "label";
    cannonLabel.innerHTML = "Cannon: ";
    cannonContainer.appendChild(cannonLabel);
    var cannonCount = document.createElement('div');
    cannonCount.id = "cannon-count";
    cannonCount.innerHTML = CANNON_SUPPLY;
    cannonContainer.appendChild(cannonCount);
    typeSelector.appendChild(cannonContainer);
    counterContainers.push(cannonContainer);

    midParent.appendChild(typeSelector);

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

            if (blockLocations[id] >= 0) { // it has already been selected
                this.className = "unselected-grid-item";
                this.innerHTML = "";
                var orderNumber = blockLocations[id];
                placeable[blockType[orderNumber]]++;
                blockOrder[orderNumber] = NaN;
                blockType[orderNumber] = NaN;
                updateBlockOrder(blockLocations[id], blockOrder, blockType, blockLocations);
                blockLocations[id] = NaN;
                highestBlockIndex--;
                updateCounterNumbers(placeable);
            } else if (placeable[currentlySelected] > 0) {
                this.className = counterClassNames[currentlySelected];
                var orderNumber = highestBlockIndex;
                highestBlockIndex++;
                blockLocations[id] = orderNumber;
                blockType[orderNumber] = currentlySelected;
                blockOrder[orderNumber] = id;
                this.innerHTML = orderNumber;
                placeable[blockType[orderNumber]]--;
                updateCounterNumbers(placeable);
            } else {
                alert("You can't place any more of those block types!");
            }
        }
        
        gridParent.appendChild(gridObject);
    }

    midParent.appendChild(gridParent); // add our grid in

    // spacing
    var spacing = document.createElement('div');
    spacing.className = "spacingMid";
    midParent.appendChild(spacing);

    topLevel.appendChild(midParent);


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
        blockType = matchOrderAndType(blockOrder, blockType);
        mainGame();
    };

    bottomParent.appendChild(onwards);

    document.body.appendChild(topLevel);
}