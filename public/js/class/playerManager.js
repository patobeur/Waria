"use strict";
class PlayerManager {
	constructor(playername, archetype = "Warrior", information = "Warrior defaut") {
		if (WLOG) console.log("PlayerManager Class Mounted!")
		this.playerDatas = {
			lv: 1,
			roadlv: 1,
			name: playername,
			archetype: archetype,
			information: information,
			isKeyPressed: false,
			actions: PLAYERARCHETYPES[archetype].actions,
			stats: PLAYERARCHETYPES[archetype].stats,
			display: {
				OriginalPlayerW: 64 * 2,
				OriginalPlayerH: 44 * 2,
				playerx: 0,
				playery: 0, // testing
				defaultplayerx: 100,
				defaultplayery: 0,
				displayratio: 1,
			},
			targetx: 0, // px limit to win this lv /// refreshed by sliderroad
			coins: 0
		}
	}

	// set_Action(actionname, action) {
	// 	this.playerDatas.actions[actionname] = action
	// 	// console.log(this.playerDatas.actions[actionname])
	// 	// console.log(this.playerDatas)
	// }

	// set_nextlv() {
	// 	this.playerDatas.lv = this.playerDatas.lv +1
	// 	this.SlidingRoad.nextLevel(this.playerDatas.lv)
	// }

}
