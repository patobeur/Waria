"use strict";
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(playerdatas) {
		if (WLOG) console.log("SlidingRoadManager Class Mounting!")
		// if (WLOG) console.log(playerdatas)
		this.divId = 'road-slider';
		this.playerdatas = playerdatas;
		// --
		this.levelDatas = {
			1: { nbpan: 6 }
		}
		this.roadDatas = this.levelDatas[playerdatas.lv]
		// this.name = name;
		// this.hauteur = hauteur;
		// this.largeur = largeur;
		this.nbPan = this.roadDatas.nbpan // pan number for road width
		this.playerX = 0;
		this.actualX = 0;
		this.movesize = 2 // pixels move when sliding forward or backward

		this.panWidth = 500 // pixels 
		this.roadXMax = ((this.nbPan - 1) * this.panWidth)  // pixel to win 
		this.roadWidth = ((this.nbPan) * this.panWidth) // pixels 

	}
	get_LevelDatas() {
		return this.roadDatas
	}
	playforward(playerdatas) {
		if (playerdatas.isKeyPressed) {
			let actualX = playerdatas.defaultplayerx//ROADDOM.style.left
			if (WLOG) console.log("actualX!" + playerdatas.defaultplayerx)
			// actualX = parseInt(actualX.replace('px', ''))
			if (playerdatas.actions.goRight && !playerdatas.actions.goLeft) {
				if (this.actualX < this.roadXMax) {
					// 	this.playerX = this.playerX + playerdatas.stats.movesize;
					this.actualX = this.actualX - playerdatas.stats.movesize;
					ROADDOM.style.left = this.actualX + "px"
				}
			}
			if (playerdatas.actions.goLeft && !playerdatas.actions.goRight) {
				if (this.actualX < 0) {
					this.playerX = this.playerX - playerdatas.stats.movesize;
					this.actualX = actualX + playerdatas.stats.movesize;
					ROADDOM.style.left = this.actualX + "px"
				}
			}
			return this.actualX
		}
		// else {
		// 	// do nothing ??
		// }
	}
}
