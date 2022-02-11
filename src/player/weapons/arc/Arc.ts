import Phaser from 'phaser'

export default class Arc extends Phaser.GameObjects.Arc {
	constructor(scene, x, y, radius, startAngle, endAngle) {
		super(scene, x, y, radius, startAngle, endAngle)
		this.scene = scene
		this.x = x
		this.y = y
		this.radius = radius
		this.startAngle = startAngle
		this.endAngle = endAngle
		this.scene.physics.world.enableBody(this)
	}
}
