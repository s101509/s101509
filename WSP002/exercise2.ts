interface Attack {
	damage: number
}

class BowAndArrow implements Attack {
	//Bow and Arrow Attack here
	damage: number
	constructor(damage: number) {
		this.damage = damage
	}
}

class ThrowingSpear implements Attack {
	// Throwing Spear Attack here
	damage: number
	constructor(damage: number) {
		this.damage = damage
	}
}

interface Player {
	attack(monster: Monster): void
	switchAttack(): void
	gainExperience(exp: number): void
}

class Amazon implements Player {
	private name: string
	private primary: Attack
	private secondary: Attack
	private usePrimaryAttack: boolean
	constructor(name: string) {
		this.primary = new BowAndArrow(30)
		this.secondary = new ThrowingSpear(40)
		// TODO: set the default value of usePrimaryAttack
		this.name = name
		this.usePrimaryAttack = false
	}

	attack(monster: Monster): void {
		let damage = 0
		if (this.usePrimaryAttack) {
			// TODO: use primary attack
			damage = this.primary.damage
		} else {
			// TODO: use secondary attack
			damage = this.secondary.damage
		}

		while (monster.getHP() > 0) {
			let strengthFactor = 1

			if (Math.random() < 1 / 3) {
				strengthFactor *= 2
			}

			monster.injure(damage * strengthFactor)
			let result = `Player ${
				this.name
			} attacks a monster (HP: ${monster.getHP()})`
			if (strengthFactor > 1) {
				result += ` [CRITICAL]`
			}
			console.log(result)
			this.gainExperience(damage * strengthFactor)
		}
	}

	switchAttack() {
		// TODO: Change the attack mode for this player
		if (this.usePrimaryAttack) {
			this.usePrimaryAttack = false
		} else {
			this.usePrimaryAttack = true
		}
	}

	//.. The remaining methods.
	gainExperience(exp: number) {}
}

class Monster {
	// Think of how to write injure
	private hp: number
	private name: string

	constructor() {
		this.hp = 100
		this.name = 'Monster'
	}

	injure(attack: number) {
		this.hp -= attack
		if (this.hp < 0) {
			this.hp = 0
		}
		return this.hp
	}

	getHP(): number {
		return this.hp
	}
}

const player = new Amazon('Peter')
const monster = new Monster()
player.attack(monster)
