// Pave the way for future updates such as weapon spawns/ammo
class Weapon {
    constructor(name, damage, recharge, accuracy) {
        this.name = name;
        this.damage = damage;
        this.recharge = recharge;
        this.accuracy = accuracy;
    }

    getDamage() {
        return this.damage;
    }

    getRecharge() {
        return this.recharge;
    }
}