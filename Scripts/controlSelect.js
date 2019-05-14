// handle special cases
function fromCharCode(keyCode) {
    if(keyCode == 32) return "space";
    if(keyCode == 13) return "enter";
    if(keyCode == 8) return "delete";
    return String.fromCharCode(keyCode);
}
// check if key already exists as a control
function checkKey(keyCode) {
    var controls = Object.keys(Input.keys);
    for(var i = 0; i < controls.length;i++){
        //controls[i] for key
        if(Input.keys[controls[i]] == keyCode) {
            return false;
        }
        //dictionary[controls[i]] for the value
     }
     return true;
}

function unselectAll(keyContainers) {
    for (var i = 0; i < keyContainers.length; i++) {
        keyContainers[i].className = "control";
    }
}
function selectControls(p1) {
    var keyContainers = [];
    var selected = "";
    var listener;
    var topLevel = document.createElement('div');
    topLevel.id = "select_main";

    // instructional text
    var text = document.createElement('div');
    text.id = "instructions";
    var playerName = "Player 1 ";
    if (!p1) {
        playerName = "Player 2 ";
    }
    var instructionString = playerName + 'Controls';
    text.innerHTML = instructionString;
    topLevel.appendChild(text);

    // instruction box
    var instrContainer = document.createElement('div');
    instrContainer.id = "instr";

    // UP CONTROLS
    var upContainer = document.createElement('div');
    upContainer.className = "control-div";
    // up text
    var upText = document.createElement('div');
    upText.innerHTML = "Up: ";
    upContainer.appendChild(upText);
    
    //up control selector
    var upControl = document.createElement('div');
    upControl.className = "control";
    upControl.innerHTML = fromCharCode(Input.keys.forward);
    if(!p1) upControl.innerHTML = fromCharCode(Input.keys.forward2);
    upContainer.appendChild(upControl);
    upControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "up") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "up";
            upControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["forward"] = event.keyCode;
                        upControl.innerHTML = fromCharCode(Input.keys["forward"]);
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["forward2"] = event.keyCode;
                        upControl.innerHTML = fromCharCode(Input.keys["forward2"]);
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(upControl);
    instrContainer.appendChild(upContainer);

    // DOWN CONTROLS
    var downContainer = document.createElement('div');
    downContainer.className = "control-div";
    // down text
    var downText = document.createElement('div');
    downText.innerHTML = "Down: ";
    downContainer.appendChild(downText);
    
    //down control selector
    var downControl = document.createElement('div');
    downControl.className = "control";
    downControl.innerHTML = fromCharCode(Input.keys.backwards);
    if(!p1) downControl.innerHTML = fromCharCode(Input.keys.backwards2);
    downContainer.appendChild(downControl);
    downControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "down") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "down";
            downControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["backwards"] = event.keyCode;
                        downControl.innerHTML = fromCharCode(Input.keys["backwards"]);
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["backwards2"] = event.keyCode;
                        downControl.innerHTML = fromCharCode(Input.keys["backwards2"]);
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(downControl);
    instrContainer.appendChild(downContainer);

    // LEFT CONTROLS
    var leftContainer = document.createElement('div');
    leftContainer.className = "control-div";
    // left text
    var leftText = document.createElement('div');
    leftText.innerHTML = "Left: ";
    leftContainer.appendChild(leftText);
    
    //left control selector
    var leftControl = document.createElement('div');
    leftControl.className = "control";
    leftControl.innerHTML = fromCharCode(Input.keys.left);
    if(!p1) leftControl.innerHTML = fromCharCode(Input.keys.left2);
    leftContainer.appendChild(leftControl);
    leftControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "left") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "left";
            leftControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["left"] = event.keyCode;
                        leftControl.innerHTML = fromCharCode(Input.keys["left"]);
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["left2"] = event.keyCode;
                        leftControl.innerHTML = fromCharCode(Input.keys["left"]);
                        if(event.keyCode == 32) leftControl.innerHTML = "space";
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(leftControl);
    instrContainer.appendChild(leftContainer);

    // RIGHT CONTROLS
    var rightContainer = document.createElement('div');
    rightContainer.className = "control-div";
    // up text
    var rightText = document.createElement('div');
    rightText.innerHTML = "Right: ";
    rightContainer.appendChild(rightText);
    
    //right control selector
    var rightControl = document.createElement('div');
    rightControl.className = "control";
    rightControl.innerHTML = fromCharCode(Input.keys.right);
    if(!p1) rightControl.innerHTML = fromCharCode(Input.keys.right2);
    rightContainer.appendChild(rightControl);
    rightControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "right") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "right";
            rightControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["right"] = event.keyCode;
                        rightControl.innerHTML = fromCharCode(Input.keys["right"]);
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["right2"] = event.keyCode;
                        rightControl.innerHTML = fromCharCode(Input.keys["right2"]);
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(rightControl);
    instrContainer.appendChild(rightContainer);

    // SHOOT CONTROLS
    var shootContainer = document.createElement('div');
    shootContainer.className = "control-div";
    // shoot text
    var shootText = document.createElement('div');
    shootText.innerHTML = "Shoot: ";
    shootContainer.appendChild(shootText);
    
    //shoot control selector
    var shootControl = document.createElement('div');
    shootControl.className = "control"; 
    shootControl.innerHTML = fromCharCode(Input.keys.shoot);
    if(!p1) shootControl.innerHTML = fromCharCode(Input.keys.shoot2);
    shootContainer.appendChild(shootControl);
    shootControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "shoot") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "shoot";
            shootControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["shoot"] = event.keyCode;
                        shootControl.innerHTML = fromCharCode(Input.keys["shoot"]);
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["shoot2"] = event.keyCode;
                        shootControl.innerHTML = fromCharCode(Input.keys["shoot2"]);
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(shootControl);
    instrContainer.appendChild(shootContainer);

    // SWITCH CONTROLS
    var switchContainer = document.createElement('div');
    switchContainer.className = "control-div";
    // switch text
    var switchText = document.createElement('div');
    switchText.innerHTML = "Switch: ";
    switchContainer.appendChild(switchText);
    
    // switch control selector
    var switchControl = document.createElement('div');
    switchControl.className = "control";
    switchControl.innerHTML = fromCharCode(Input.keys.switch);
    if(!p1) switchControl.innerHTML = fromCharCode(Input.keys.switch2);
    switchContainer.appendChild(switchControl);
    switchControl.onclick = function() {
        unselectAll(keyContainers);
        if(selected == "switch") {
            selected = "";
            document.removeEventListener('keyup', listener);
        }
        else {
            selected = "switch";
            switchControl.className = "control-selected";
            if(p1) {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["switch"] = event.keyCode;
                        switchControl.innerHTML = fromCharCode(Input.keys["switch"]);
                        if(event.keyCode == 32) switchControl.innerHTML = "space";
                    }
                }
            }
            else {
                listener = function(event) {
                    if(checkKey(event.keyCode)) {
                        Input.keys["switch2"] = event.keyCode;
                        switchControl.innerHTML = fromCharCode(Input.keys["switch2"]);
                        if(event.keyCode == 32) switchControl.innerHTML = "space";
                    }
                }
            }
            document.addEventListener('keyup', listener);
        }
    }
    keyContainers.push(switchControl);
    instrContainer.appendChild(switchContainer);

    // Continue button
    var onwards = document.createElement('INPUT');
    onwards.type = 'button';
    if (p1) {
        onwards.value='Set';
    } else {
        onwards.value='Next';
    }
    onwards.id = "continue-button";
    onwards.className = "fancyButton";

    onwards.onclick = function() {
        $("#select_main").remove();
        if (p1) {
            selectControls(false);
        } else {
            buildBoard(p1BlockOrder, p1BlockType, IS_PLAYER_1);
        }
    };

    instrContainer.appendChild(onwards);
    if(listener) document.removeEventListener('keyup', listener);

    topLevel.appendChild(instrContainer);
    document.body.appendChild(topLevel);
}