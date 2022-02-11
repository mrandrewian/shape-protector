import Phaser from 'phaser'
import ArcController from './arc/ArcController'

export default class WeaponController {
	private scene: Phaser.Scene
	private player: Phaser.GameObjects.Arc
	private pointer: Phaser.Input.Pointer
	private arcController?: ArcController
	private weapons?: Phaser.Physics.Arcade.Group
	constructor(
		scene: Phaser.Scene,
		player: Phaser.GameObjects.Arc,
		pointer: Phaser.Input.Pointer
	) {
		this.scene = scene
		this.player = player
		this.pointer = pointer
		if (!this.weapons) {
			this.weapons = new Phaser.Physics.Arcade.Group(
				this.scene.physics.world,
				this.scene
			)
		}

		this.spawnArc(1)
	}

	private spawnArc(num: number) {
		this.arcController = new ArcController(
			this.scene,
			this.player,
			this.pointer
		)
	}

	getWeapons() {
		const arc = this.arcController?.getWeapons()
		if (arc) {
			return arc
		}
	}

	update(time: number, delta: number): void {}
}
