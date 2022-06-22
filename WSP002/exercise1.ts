class Player {
    private strength: number;
    private name: string;
    private exp: number;
    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
        this.exp = 0;
    }

    getPlayerName() {
        return this.name
    }
    attack(monster: Monster) {
        monster.beingAttack(this)
    }

    gainExperience(exp: number) {
        this.exp += exp
    }

}
class Monster {
    private hp: number;


    constructor() {
        this.hp = 100

    }
    beingAttack(player: Player) {
        const critical = Math.floor(Math.random() * 2)

        if (critical) {
            this.hp -= 40;
            console.log(`Player ${player.getPlayerName()} attacks a monster [HP: ${this.hp}] (Critical!)`)
        } else {
            this.hp -= 20;
            console.log(`Player ${player.getPlayerName()} attacks a monster [HP: ${this.hp}]`)
        }

        if (this.hp <= 0) {
            console.log(`The monster is dead. ${player.getPlayerName()} killed it and gained 10 experience`);
            player.gainExperience(10)
        }
    }
    getMonsterHP() {
        return this.hp
    }
}


const player = new Player(20, 'Peter');
const monster = new Monster();
