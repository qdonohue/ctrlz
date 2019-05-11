// Helper class that will check when to update player position locations

class TemporalManagement {

    constructor() {
        this.lastTracked = NaN;
    }

    update() {
        var curTime = new Date();

        if (this.lastTracked !== NaN) {
            var ellapsed = curTime - this.lastTracked;

            if (ellapsed < TIME_BETWEEN_POSITIONS) return; // don't update positions if time between is too small
        }

        this.lastTracked = curTime;

        player.updatePosition();
    }
}