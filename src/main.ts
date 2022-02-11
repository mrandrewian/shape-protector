import Phaser from 'phaser'

import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1200,
	height: 900,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: true,
		},
	},
	scene: [Game, GameUI],
}

export default new Phaser.Game(config)
