import Phaser, {Time} from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import WeaponController from './weapons/WeaponController'

export default class PlayerController {
	private scene: Phaser.Scene
	private pointer!: Phaser.Input.Pointer
	private player: Phaser.GameObjects.Arc
	private weaponController?: WeaponController

	private stateMachine: StateMachine

	private isFiring: boolean

	constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Arc) {
		this.scene = scene
		this.player = player
		this.isFiring = false

		this.stateMachine = new StateMachine(this, 'player-controller')

		this.stateMachine
			.addState('idle', {
				onEnter: this.idleOnEnter,
			})
			.setState('idle')
	}

	update(time: number, delta: number): void {
		this.weaponController?.update(time, delta)
	}

	private idleOnEnter() {
		this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
			this.isFiring = true
		})
		this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
			this.weaponController = new WeaponController(
				this.scene,
				this.player,
				pointer
			)
			this.isFiring = false
		})
	}

	private handlePlayerEnemyCollision(obj1, obj2) {
		// console.log('handlePlayerEnemyCollision', obj1, obj2)
	}

	getWeapons() {
		const weapons = this.weaponController?.getWeapons()
		return weapons
	}
}
