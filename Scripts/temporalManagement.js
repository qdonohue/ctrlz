// Helper class that will check when to update player position locations

class TemporalManagement {

    constructor(players) {
        this.players = players;
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

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].updatePosition();
            }

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

            for (var i = 0; i < this.players.length; i++) {
                this.players[i].placeNextBlock();
            }
            
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