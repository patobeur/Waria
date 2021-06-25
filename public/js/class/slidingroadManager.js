"use strict";
const LEVELDATAS = {
	1: { nbpan: 2, name: "#NiceDaytoBoot !", bossname: "HashTagmHell", panW: 1000, panH: 350, floorY: 305, bgimg: "fond5.jpg" },
	2: { nbpan: 8, name: "Falling Shit Cascading", bossname: "SeeDouble Ace", panW: 500, panH: 350, floorY: 330, bgimg: "fond2.gif" },
	3: { nbpan: 8, name: "Bottom:Root Path", bossname: "Silver Ass", panW: 1000, panH: 350, floorY: 325, bgimg: "fond3.png" },
	4: { nbpan: 8, name: "Java's Crypte", bossname: "JiAce", panW: 626, panH: 375, floorY: 332, bgimg: "fond4.jpg" },
	5: { nbpan: 8, name: "Last Level", bossname: "ConsoleLog", panW: 1000, panH: 350, floorY: 330, bgimg: "fond.jpg" },
}
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(playerdatas) {
		// if (WLOG) console.log("SlidingRoadManager Class Mounting!")
		this.divId = 'road-slider';
		this.playerDatas = playerdatas;
		// --
		this.roadDatas = LEVELDATAS[this.playerDatas.lv]
		this.playerDatas.display.targetx = ((this.roadDatas.nbpan - 1) * this.roadDatas.panW)  // pixel limite to win 
		this.roadWidth = this.playerDatas.display.targetx - this.playerDatas.display.playerx //((this.roadDatas.nbpan) * this.roadDatas.panW) // pixels 

	}
	playforward(playerdatas) { // called by set_ActionsAndPlay in WariaGame.js
		// if (WLOG) console.log('playerdatas')
		this.playerDatas = playerdatas;
		if (this.playerDatas.isKeyPressed === true) {
			if (this.playerDatas.actions.goRight && !this.playerDatas.actions.goLeft) {
				if (this.playerDatas.display.playerx < (this.playerDatas.display.targetx + this.playerDatas.stats.movesize - (this.playerDatas.stats.playerx * this.playerDatas.display.displayratio))) {
					this.playerDatas.display.playerx = parseInt(this.playerDatas.display.playerx + this.playerDatas.stats.movesize)
				}
			}
			if (this.playerDatas.actions.goLeft && !this.playerDatas.actions.goRight) {
				if (this.playerDatas.display.playerx > 0) {
					this.playerDatas.display.playerx = parseInt(this.playerDatas.display.playerx - this.playerDatas.stats.movesize)
				}
			}
			ROADDOM.style.left = -(this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + "px"
			PLAYERDOM.style.left = ((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) * this.playerDatas.display.displayratio) + "px"

			// if (WLOG) console.log(playerdatas) // ralentis le client de ouf !!!
			return this.playerDatas
		}
		else {
			// 	// do nothing ??
			// return false
			return playerdatas
		}
	}

}
