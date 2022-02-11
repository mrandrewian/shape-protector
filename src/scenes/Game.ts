import Phaser, {Physics} from 'phaser'
import EnemyController from '../enemies/EnemyController'
import PlayerController from '../player/PlayerController'
import {events} from '../events/EventCenter'

export default class Game extends Phaser.Scene {
	private enemyController?: EnemyController
	private enemies?: Phaser.Physics.Arcade.Group
	private playerController?: PlayerController
	private weapon?: Phaser.GameObjects.Arc

	private gameWidth: number
	private gameHeight: number

	constructor() {
		super('game')
		this.gameWidth = 0
		this.gameHeight = 0
	}

	create() {
		this.scene.launch('game-ui')
		//For some reason these can't be set in the constructor
		this.gameWidth = this.sys.game.canvas.width
		this.gameHeight = this.sys.game.canvas.height

		//Spawn Player
		const player = this.physics.scene.add
			.circle(this.gameWidth / 2, this.gameHeight / 2, 10, 0xf0f0f0)
			.setOrigin(0.5, 0.5)
		this.physics.world.enableBody(player)
		//Controllers
		this.enemyController = new EnemyController(this, player)
		this.playerController = new PlayerController(this, player)

		this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			this.weapon = this.playerController?.getWeapons()
			this.enemies = this.enemyController?.getEnemies()
			if (this.weapon && this.enemies) {
				this.physics.add.collider(
					this.weapon,
					this.enemies,
					this.handleWeaponEnemyCollision,
					undefined,
					this
				)
			}
		})
	}

	private handleWeaponEnemyCollision(weapon, enemy) {
		events.emit('enemy-destroyed', [weapon, enemy])
		weapon.destroy()
		enemy.destroy()
	}

	update(time: number, delta: number): void {
		if (this.playerController) {
			this.playerController?.update(time, delta)
		}
	}
}
