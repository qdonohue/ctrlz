class Weapon {
    constructor(name, damage, recharge, accuracy) {
        this.name = name;
        this.damage = damage;
        this.recharge = recharge;
        this.accuracy = accuracy;
    }

    getRecharge() {
        return this.recharge;
    }
}