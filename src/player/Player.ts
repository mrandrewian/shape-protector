import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Arc {
	private gameWidth: number
	private gameHeight: number

	constructor(scene, x, y, radius, startAngle, endAngle) {
		super(scene, x, y, radius, startAngle, endAngle)
		this.scene = scene
		this.x = x
		this.y = y
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle

		this.gameWidth = 0
		this.gameHeight = 0
	}

	create() {
		this.gameWidth = this.scene.sys.game.canvas.width
		this.gameHeight = this.scene.sys.game.canvas.height
		const player = this.scene.physics.scene.add
			.circle(this.gameWidth / 2, this.gameHeight / 2, 10, 0xffffff)
			.setOrigin(0.5, 0.5)
		this.scene.physics.world.enableBody(player)
	}
}
