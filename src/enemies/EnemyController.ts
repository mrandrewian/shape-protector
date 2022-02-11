import Phaser from 'phaser'
import Circle from './circle/Circle'
import CircleController from './circle/CircleController'

export default class EnemyController {
	private scene: Phaser.Scene
	private player?: Phaser.GameObjects.Arc
	private circleController?: CircleController
	// private arcs: Phaser.Physics.Arcade.Group

	constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Arc) {
		this.scene = scene
		this.player = player

		this.circleController = new CircleController(this.scene, player)
	}

	getEnemies() {
		const circles = this.circleController?.getCircles()
		return circles
	}
}
