"use strict";
const PLAYERDOM = document.getElementById('player')
const RATIOCURSORDOM = document.getElementById('ratio-cursor')
// ------------------------------------- PLAYER CLASS ---------------
class PlayerManager {
	constructor(playername, archetype, information) {
		this.archetypeActions = {
			"Warrior": {
				"stats": { movesize: 4, playerx: 100, health: 5, range: 1 },
				"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
			},
			// "Wizard": {
			// 	"stats": { movesize: 3, playerx: 100, health: 3, range: 10 },
			// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
			// },
			// "Ranger": {
			// 	"stats": { movesize: 4, playerx: 100, health: 4, range: 5 },
			// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
			// }
		}
		this.playerDatas = {
			lv: 1,
			name: playername,
			archetype: archetype,
			information: information,
			defaultplayerx: 100,
			playerx: 0,
			isKeyPressed: false,
			displayratio: 1,
			actions: this.archetypeActions[archetype].actions,
			stats: this.archetypeActions[archetype].stats
		}
		this.playerActions = this.archetypeActions[this.playerDatas.archetype].actions
		// this.isKeyPressed = false
		// if (WLOG) console.log("PlayerManager Class Mounted!")

	}
	set_Actions(actions, isKeyPressed) {
		this.playerDatas.actions = actions
		this.playerDatas.isKeyPressed = isKeyPressed
	}
	// set_Action(actionname, action, isKeyPressed) {
	// 	this.playerActions[actionname] = action
	// // }
}
