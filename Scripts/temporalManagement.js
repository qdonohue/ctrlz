// Helper class that will check when to update player position locations

class TemporalManagement {

    constructor() {
        this.lastTrackedP = NaN;
        this.lastTrackedB = NaN;
    }

    checkPosition() {
        var curTime = new Date();

        if (this.lastTrackedP !== NaN) {
            var ellapsedP = curTime - this.lastTrackedP;

            if (ellapsedP < TIME_BETWEEN_POSITIONS) {
                return;
            }
        
            player.updatePosition();
            this.lastTrackedP = curTime;
            return;
        }
        this.lastTrackedP = curTime;
    }

    checkBlockPlacement() {
        var curTime = new Date();

        if (this.lastTrackedB !== NaN) {
            var ellapsedB = curTime - this.lastTrackedB;

            if (ellapsedB < TIME_BETWEEN_BLOCK_PLACEMENT) {
                return;
            }
        
            player.placeNextBlock();
            this.lastTrackedB = curTime;
            return;
        }
        this.lastTrackedB = curTime;
    }

    update() {
        //this.checkBlockPlacement();
        this.checkPosition();
    }
}