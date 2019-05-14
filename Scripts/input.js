// Heavily inspired by keyboard input from: https://github.com/juanferrer/red-palito
// Modified for two players / changed control scheme --> but methodology is the same
class Input {

    // track what keys are pressed
    static keyBoardInit() {
        window.addEventListener("keydown", e => {
            Input.keydown(e.keyCode);
        });

        window.addEventListener("keyup", e => {
            Input.keyup(e.keyCode);
        }, true);
    }

    static keydown(keyCode) {
        Input.keyState[keyCode] = true;
    }

    static keyup(keyCode) {
        Input.keyState[keyCode] = false;
    }

    // get keys pressed since last frame
    static resolveInput(players) {

        // left (a)
        if (Input.keyState[Input.keys.left]) {
            // handle player go left
            players[0].rotateLeft();
        }
        // left player 2 (j)
        if (Input.keyState[Input.keys.left2]) {
            // handle player go left
            players[1].rotateLeft();
        }
        // right (d)
        if (Input.keyState[Input.keys.right]) {
            // handle player go right
            players[0].rotateRight();
        }
        // right player 2 (l)
        if (Input.keyState[Input.keys.right2]) {
            // handle player go left
            players[1].rotateRight();
        }
        // forward (w)
        if (Input.keyState[Input.keys.forward]) {
            // handle player go forward
            players[0].moveForward();
        }
        // forward player 2 (i)
        if (Input.keyState[Input.keys.forward2]) {
            // handle player go left
            players[1].moveForward();
        }
        // backwards (s)
        if (Input.keyState[Input.keys.backwards]) {
            // handle player go back
            players[0].moveBackward();
        }
        // backwards player 2 (k)
        if (Input.keyState[Input.keys.backwards2]) {
            // handle player go left
            players[1].moveBackward();
        }
        // shoot (space)
        if (Input.keyState[Input.keys.shoot]) {
            // fire bullet from player
            players[0].shoot();
        }
        // shoot player 2(enter)
        if (Input.keyState[Input.keys.shoot2]) {
            // fire bullet from player
            players[1].shoot();
        }

        if (Input.keyState[Input.keys.switch]) {
            // switch weapon
            players[0].switchWeapon();
        }

        if (Input.keyState[Input.keys.debug]) {
            players[0].goBack(5);
            players[0].debug();
        }

    }
}

Input.keyState = {};
Input.keys = {
    "forward": 87,
    "backwards": 83,
    "left": 65,
    "right": 68,
    "debug": 16, // this is shift
    "shoot": 32, // this is space
    "switch": 80, // this is p
    "forward2": 73, // i
    "backwards2": 75, // k
    "left2": 74, // j
    "right2": 76, // l
    "shoot2": 13 // enter

};

Input.CAMERA_MOVE_SPEED = .1;
Input.CAMERA_ROTATE_SPEED = .01;
