import Phaser, {Time} from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import WeaponController from './WeaponController'

export default class PlayerController {
	private scene: Phaser.Scene
	private pointer!: Phaser.Input.Pointer
	private player: Phaser.GameObjects.Arc
	private enemies: Phaser.Physics.Arcade.Group
	private weaponController?: WeaponController

	private stateMachine: StateMachine

	constructor(
		scene: Phaser.Scene,
		player: Phaser.GameObjects.Arc,
		enemies: Phaser.Physics.Arcade.Group
	) {
		this.scene = scene
		this.player = player
		this.enemies = enemies

		this.stateMachine = new StateMachine(this, 'player-controller')

		this.stateMachine
			.addState('idle', {
				onEnter: this.idleOnEnter,
			})
			.setState('idle')

		this.scene.physics.add.collider(
			this.player,
			this.enemies,
			this.handlePlayerEnemyCollision,
			undefined,
			this
		)
	}

	create() {}

	update(time: number, delta: number): void {}

	private idleOnEnter() {
		this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			this.weaponController = new WeaponController(
				this.scene,
				this.player,
				this.enemies,
				pointer
			)
		})
	}

	private handlePlayerEnemyCollision(obj1, obj2) {
		// console.log('handlePlayerEnemyCollision', obj1, obj2)
	}
}
