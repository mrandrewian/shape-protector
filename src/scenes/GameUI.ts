import Phaser from 'phaser'

import {events} from '../events/EventCenter'

export default class GameUI extends Phaser.Scene {
	private _points!: number

	constructor() {
		super({key: 'game-ui'})
	}

	create() {
		console.log('here')
		this._points = 0

		const pointsLabel = this.add.text(30, 30, '0', {
			fontFamily: 'Hoefler Text',
			fontSize: '32px',
			strokeThickness: 2,
			// stroke: '#ffffff',
		})

		events.on('points-changed', (points: number) => {
			this._points += points
			pointsLabel.text = this._points.toLocaleString()
		})

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			events.off('points-changed')
		})
	}
}
