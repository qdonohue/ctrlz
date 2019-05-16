
// Helper class that will check when to update player position locations
class TemporalManagement {

    constructor(players) {
        this.players = players;
        this.lastTrackedP = NaN;
        this.lastFiredCannon = NaN;
        this.lastFiredTurret = NaN;
        this.started = false;
        this.begun = false;
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

    checkCannons() {
        var curTime = new Date();
        if (this.lastFiredCannon !== NaN) {
            var ellapsed = curTime - this.lastFiredCannon;

            if (ellapsed < TIME_BETWEEN_CANNON_SHOTS) return;

            for (var i = 0; i < cannons.length; i++) {
                cannons[i].shoot();
            }

            this.lastFiredCannon = curTime;
            return;
        }
        this.lastFiredCannon = curTime;
    }

    checkTurrets() {
        var curTime = new Date();
        if (this.lastFiredTurret !== NaN) {
            var ellapsed = curTime - this.lastFiredTurret;

            if (ellapsed < TIME_BETWEEN_TURRET_SHOTS) return;

            for (var i = 0; i < turrets.length; i++) {
                turrets[i].shoot();
            }

            this.lastFiredTurret = curTime;
            return;
        }
        this.lastFiredTurret = curTime;
    }

    

    update() {
        this.checkPosition();
        if (!this.started) {
            this.startTime = new Date();
            this.started = true;
            return;
        }

        var curTime = new Date();
        if (curTime - this.startTime < TIME_GRACE_PERIOD && !this.begun) return;
        this.begun = true;
        this.checkCannons();
        this.checkTurrets();
    }
}