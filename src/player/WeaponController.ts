import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'

export default class WeaponController {
	private scene: Phaser.Scene
	private player: Phaser.GameObjects.Arc
	private enemies: Phaser.Physics.Arcade.Group
	private pointer: Phaser.Input.Pointer
	private stateMachine: StateMachine
	private clickDownTime: number
	constructor(
		scene: Phaser.Scene,
		player: Phaser.GameObjects.Arc,
		enemies: Phaser.Physics.Arcade.Group,
		pointer: Phaser.Input.Pointer
	) {
		this.scene = scene
		this.player = player
		this.enemies = enemies
		this.clickDownTime = 0
		this.pointer = pointer

		this.stateMachine = new StateMachine(this, 'weapon-controller')
		console.log(pointer)

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

		const arc = this.scene.physics.scene.add
			.arc(this.player.x, this.player.y, radius, deg - 90, deg + 90)
			.setStrokeStyle(lineWidth, 0x00ff00)
			.setClosePath(false)
		this.scene.physics.world.enableBody(arc)
		this.scene.physics.moveTo(arc, this.pointer.x, this.pointer.y)
		//

		this.scene.physics.add.collider(
			arc,
			this.enemies,
			this.handleWeaponEnemyCollision,
			undefined,
			this
		)
	}

	private handleWeaponEnemyCollision(obj1, obj2) {
		console.log('handleWeaponEnemyCollisiono', obj1, obj2)
		obj1.destroy()
		obj2.destroy()
	}
}
