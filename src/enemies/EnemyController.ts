import Phaser from 'phaser'

export default class EnemyController {
	private scene: Phaser.Scene
	private player: Phaser.GameObjects.Arc
	private circles: Phaser.Physics.Arcade.Group
	// private arcs: Phaser.Physics.Arcade.Group

	constructor(
		scene: Phaser.Scene,
		player: Phaser.GameObjects.Arc,
		circles: Phaser.Physics.Arcade.Group
		// arcs: Phaser.Physics.Arcade.Group
	) {
		this.scene = scene
		this.player = player
		this.circles = circles
		// this.arcs = arcs

		this.scene.physics.add.collider(
			this.player,
			this.circles,
			this.handleEnemyPlayerCollision,
			undefined,
			this
		)
	}

	private handleEnemyPlayerCollision(obj1, obj2) {
		// console.log('EC: ', obj1, obj2)
	}
}
