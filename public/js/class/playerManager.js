"use strict";
const PLAYERDOM = document.getElementById('player')
const RATIOCURSORDOM = document.getElementById('ratio')
const PLAYERARCHETYPES = {
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
// ------------------------------------- PLAYER CLASS ---------------
class PlayerManager {
	constructor(playername, archetype, information) {
		// if (WLOG) console.log("PlayerManager Class Mounted!")
		this.playerDatas = {
			lv: 1,
			name: playername,
			archetype: archetype,
			information: information,
			isKeyPressed: false,
			actions: PLAYERARCHETYPES[archetype].actions,
			stats: PLAYERARCHETYPES[archetype].stats,
			display: {
				OriginalPlayerW: 64 * 2,
				OriginalPlayerH: 44 * 2,
				playerx: 0, // test
				defaultplayerx: 100, // test
				displayratio: 1, // test
			},
			targetx: 0 // px limit to win this lv /// refreshed by sliderroad
		}
	}
	set_Actions(actions) { // called by set_ActionsAndPlay in WariaGame.js
		this.playerDatas.actions = actions
	}
	// set_Action(actionname, action) {
	// 	this.playerActions[actionname] = action
	// }
	set_IsKeyPressed(isKeyPressed) { // called by set_ActionsAndPlay in WariaGame.js
		this.playerDatas.isKeyPressed = isKeyPressed
	}
	set_PlayerDatas(playerDatas) { // called by set_ActionsAndPlay in WariaGame.js
		this.playerDatas = playerDatas
	}
	// set_nextlv() {
	// 	this.playerDatas.lv = this.playerDatas.lv +1
	// 	this.SlidingRoad.nextLevel(this.playerDatas.lv)
	// }

}
