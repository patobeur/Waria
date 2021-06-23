"use strict";
const PLAYERDOM = document.getElementById('player')
// ------------------------------------- PLAYER CLASS ---------------
class PlayerManager {
	constructor(playername, archetype, information) {
		this.archetypeActions = {
			"Warrior": {
				"stats": { movesize: 2, playerx: 100, health: 5 },
				"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
			},
			// "Wizard": {
			// 	"stats": { movesize: 2, playerx: 100, health: 3},
			// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
			// }
		}
		this.playerDatas = {
			lv: 1,
			name: playername,
			archetype: archetype,
			information: information,
			actions: this.archetypeActions[archetype].actions,
			stats: this.archetypeActions[archetype].stats,
			defaultplayerx: 100,
			isKeyPressed: false
		}
		this.playerActions = this.archetypeActions[this.playerDatas.archetype].actions
		// this.isKeyPressed = false
		if (WLOG) console.log("PlayerManager Class Mounted!")

	}
	set_Actions(actions, isKeyPressed) {
		this.playerDatas.actions = actions
		this.playerDatas.isKeyPressed = isKeyPressed
		// this.isKeyPressed = isKeyPressed
		// console.log(this.playerActions)
	}
	// set_Action(actionname, action, isKeyPressed) {
	// 	this.playerActions[actionname] = action
	// // }
}
