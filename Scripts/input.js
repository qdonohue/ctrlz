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
    static resolveInput(player) {

        // left (a)
        if (Input.keyState[Input.keys.left]) {
            // handle player go left
            player.rotateLeft();
        }
        // right (d)
        if (Input.keyState[Input.keys.right]) {
            // handle player go right
            player.rotateRight();
        }
        // forward (w)
        if (Input.keyState[Input.keys.forward]) {
            // handle player go forward
            player.moveForward();
        }
        // backwards (s)
        if (Input.keyState[Input.keys.backwards]) {
            // handle player go back
            player.moveBackward();
        }

        if (Input.keyState[Input.keys.debug]) {
            player.goBack(5);
        }

    }
}

Input.keyState = {};
Input.keys = {
    "forward": 87,
    "backwards": 83,
    "left": 65,
    "right": 68,
    "debug": 16 // this is shift
};

Input.CAMERA_MOVE_SPEED = .1;
Input.CAMERA_ROTATE_SPEED = .01;