import Phaser from 'phaser'
import Arc from './Arc'
import StateMachine from '../../../statemachine/StateMachine'

export default class ArcController {
	private scene: Phaser.Scene
	private player: Phaser.GameObjects.Arc
	private pointer: Phaser.Input.Pointer
	private stateMachine: StateMachine
	private clickDownTime: number
	private enemies?: Phaser.Physics.Arcade.Group
	private arc?: Phaser.GameObjects.Arc

	constructor(
		scene: Phaser.Scene,
		player: Phaser.GameObjects.Arc,
		pointer: Phaser.Input.Pointer,
		enemies?: Phaser.Physics.Arcade.Group
	) {
		this.scene = scene
		this.player = player
		this.clickDownTime = 0
		this.pointer = pointer
		this.enemies = enemies

		this.stateMachine = new StateMachine(this, 'weapon-controller')

		const angle = Phaser.Math.Angle.Between(
			this.player.x,
			this.player.y,
			this.pointer.x,
			this.pointer.y
		)

		const deg = Phaser.Math.RadToDeg(angle)
		this.clickDownTime = this.pointer.upTime - this.pointer.downTime
		const lineWidth = Phaser.Math.Clamp(this.clickDownTime * 0.02, 1, 7)
		const radius =
			this.player.radius +
			Phaser.Math.Clamp(this.clickDownTime * 0.01, 1, 7)

		const arc = this.scene.physics.scene.add.arc(
			this.player.x,
			this.player.y,
			radius,
			deg - 90,
			deg + 90
		)
		arc.setStrokeStyle(lineWidth, 0x00ff00)
		arc.setClosePath(false)

		this.scene.physics.world.enableBody(arc)
		this.scene.physics.moveTo(arc, this.pointer.x, this.pointer.y, 600)

		if (this.enemies) {
			this.scene.physics.add.collider(
				arc,
				this.enemies,
				this.handleArcEnemyCollision,
				undefined,
				this
			)
		}

		this.arc = arc
	}

	private handleArcEnemyCollision() {
		//
	}

	getWeapons() {
		const weapons = this.arc
		return weapons
	}
}
