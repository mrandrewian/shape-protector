import Phaser from 'phaser'
import Circle from './Circle'
import {events} from '../../events/EventCenter'

export default class CircleController {
	private scene: Phaser.Scene
	private player: Phaser.GameObjects.Arc
	private circles?: Phaser.Physics.Arcade.Group

	private gameWidth: number
	private gameHeight: number
	private initCircles: number

	constructor(scene: Phaser.Scene, player: Phaser.GameObjects.Arc) {
		this.scene = scene
		this.player = player
		this.gameWidth = 0
		this.gameHeight = 0
		this.initCircles = 10
		this.gameWidth = this.scene.sys.game.canvas.width
		this.gameHeight = this.scene.sys.game.canvas.height

		this.circles = this.scene.physics.add.group({
			classType: Circle,
		})
		this.spawnCircles(this.initCircles)

		this.scene.physics.add.collider(
			this.player,
			this.circles,
			this.handleCirclePlayerCollision,
			undefined,
			this
		)

		events.on(
			'enemy-destroyed',
			(weapon: Phaser.GameObjects.Arc, enemy: Phaser.GameObjects.Arc) => {
				events.emit('points-changed', 10)
				this.spawnCircles(2)
			}
		)
	}

	private randXY(mod: number) {
		const x = Phaser.Math.Between(mod, this.gameWidth - mod)
		const y = Phaser.Math.Between(mod, this.gameHeight - mod)
		return {x, y}
	}

	private handleCirclePlayerCollision(obj1, obj2) {
		// console.log('EC: ', obj1, obj2)
	}

	private spawnCircles(num: number) {
		for (let i = 0; i < num; i++) {
			const {x, y} = this.randXY(10)
			const enemyCircle = this.circles!.get(x, y)
			this.scene.physics.world.enableBody(enemyCircle)
			this.scene.physics.moveTo(enemyCircle, this.player.x, this.player.y)
		}
	}

	getCircles() {
		const circles = this.circles
		return circles
	}
}
