"use strict";
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(playerdatas) {
		// if (WLOG) console.log("SlidingRoadManager Class Mounting!")
		this.divId = 'road-slider';
		this.playerdatas = playerdatas;
		// --
		this.levelDatas = {
			1: { nbpan: 6, name: "#NiceDaytoBoot !", bossname: "HashTagmHell", panW: 500 },
			2: { nbpan: 8, name: "Falling Shit Cascading", bossname: "SeeDouble Ace", panW: 500 },
			3: { nbpan: 8, name: "Bottom:Root Path", bossname: "Silver Ass", panW: 500 },
			4: { nbpan: 8, name: "Java's Crypte", bossname: "JiAce", panW: 500 },
			5: { nbpan: 8, name: "Last Level", bossname: "ConsoleLog", panW: 500 }
		}
		this.roadDatas = this.levelDatas[playerdatas.lv]
		this.roadXMax = ((this.roadDatas.nbpan - 1) * this.roadDatas.panW)  // pixel to win 
		// this.roadWidth = ((this.roadDatas.nbpan) * this.roadDatas.panW) // pixels 
	}
	get_LevelDatas() {
		return this.roadDatas
	}
	playforward(playerdatas) {
		// if (WLOG) console.log('playerdatas')
		// if (WLOG) console.log(playerdatas)

		if (playerdatas.isKeyPressed === true) {
			if (playerdatas.actions.goRight && !playerdatas.actions.goLeft) {
				if (playerdatas.playerx < (this.roadXMax + playerdatas.stats.movesize)) {
					playerdatas.playerx = parseInt(playerdatas.playerx + playerdatas.stats.movesize)
					ROADDOM.style.left = -(playerdatas.playerx * playerdatas.displayratio) + "px"
					PLAYERDOM.style.left = ((playerdatas.playerx + playerdatas.defaultplayerx) * playerdatas.displayratio) + "px"
				}
			}
			if (playerdatas.actions.goLeft && !playerdatas.actions.goRight) {
				if (playerdatas.playerx > 0) {
					playerdatas.playerx = parseInt(playerdatas.playerx - playerdatas.stats.movesize)
					ROADDOM.style.left = -(playerdatas.playerx * playerdatas.displayratio) + "px"
					PLAYERDOM.style.left = ((playerdatas.playerx + playerdatas.defaultplayerx) * playerdatas.displayratio) + "px"
				}
			}
			this.playerdatas = playerdatas
			return playerdatas
		}
		else {
			// 	// do nothing ??
			// return false
			return playerdatas
		}
	}

}
