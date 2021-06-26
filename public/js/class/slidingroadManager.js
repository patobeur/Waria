"use strict";
class SlidingRoadManager {
	constructor(playerdatas) {
		if (WLOG) console.log("SlidingRoadManager Class Mounting!")
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
			ROADDOM.style.left = -(this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + PX
			PLAYERDOM.style.left = ((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) * this.playerDatas.display.displayratio) + PX

			HEALTHDOM.style.left = parseInt((this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + (8 * this.playerDatas.display.displayratio)) + PX
			CURSORDOM.style.left = parseInt((this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + (8 * this.playerDatas.display.displayratio)) + PX
			return this.playerDatas
		}
		else {
			// do nothing ??
			// return false ??
			return playerdatas
		}
	}

}
