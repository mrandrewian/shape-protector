import Phaser from 'phaser'

export default class Circle extends Phaser.GameObjects.Arc {
	constructor(scene, x, y) {
		super(scene, x, y)
		this.scene = scene

		this.radius = 15
		this.fillColor = 0xff00000
		this.isFilled = true
		this.startAngle = 0
		this.endAngle = 360
	}
}
