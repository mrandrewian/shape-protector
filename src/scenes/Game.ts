import Phaser from 'phaser'
import EnemyController from '../enemies/EnemyController'
import Circle from '../enemies/Circle'
import PlayerController from '~/player/PlayerController'
import Player from '../player/Player'

export default class Game extends Phaser.Scene {
	private clickDownTime: number
	private enemyCircleController?: EnemyController
	private playerController?: PlayerController
	private weaponArcs: EnemyController[] = []
	private weaponArc?: Phaser.GameObjects.Arc
	private player!: Player

	private gameWidth: number
	private gameHeight: number
	private maxCircles: number

	constructor() {
		super('game')
		this.clickDownTime = 0
		this.gameWidth = 0
		this.gameHeight = 0
		this.maxCircles = 10
	}

	create() {
		this.gameWidth = this.sys.game.canvas.width
		this.gameHeight = this.sys.game.canvas.height

		//Spawn Player
		const player = this.physics.scene.add
			.circle(this.gameWidth / 2, this.gameHeight / 2, 10, 0xffffff)
			.setOrigin(0.5, 0.5)
		this.physics.world.enableBody(player)

		//Spawn Enemies
		const enemyCircles = this.physics.add.group({
			classType: Circle,
		})
		for (let i = 0; i < this.maxCircles; i++) {
			const x = Phaser.Math.Between(10, this.gameWidth - 10)
			const y = Phaser.Math.Between(10, this.gameHeight - 10)
			const enemyCircle = enemyCircles.get(x, y)
			this.physics.world.enableBody(enemyCircle)
			this.physics.moveTo(enemyCircle, player.x, player.y)
		}

		//Controllers
		this.enemyCircleController = new EnemyController(
			this,
			player,
			enemyCircles
		)
		this.playerController = new PlayerController(this, player, enemyCircles)
	}

	update(time: number, delta: number): void {
		if (this.playerController) {
			this.playerController?.update(time, delta)
		}
	}
}

// var ball = balls.create(game.world.randomX, game.world.randomY, 'ball');
