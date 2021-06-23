"use strict";
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(level=1) {
		if (WLOG) console.log("SlidingRoadManager Class Mounting!")
		this.divId = 'road-slider';
		// --
		this.levelDatas = {
			1: {nbpan:6}
		}
		this.level = level
		this.roadDatas = this.levelDatas[this.level]
		// this.name = name;
		// this.hauteur = hauteur;
		// this.largeur = largeur;
		this.nbPan = this.roadDatas.nbpan;
		this.playerX = 0;
		this.actualX = 0;
		this.movesize = 2 // pixels move when sliding forward or backward

		const panWidth = 500 // pixels 
		const nbPan = 6 // pan number for road width
		const roadXMax = ((nbPan - 1) * panWidth)  // pixel to win 
		const roadWidth = ((nbPan) * panWidth) // pixels 

	}
	get_LevelDatas(){
		return this.roadDatas
	}
	set_nextLevel() {
		this.level++
	}
	set_LevelDatas(){
		this.roadDatas = this.levelDatas[this.level]
	}
	get_RoadDomInfo_Once() {

	}
	playforward(actions, isPressedKey) {
		// this.Screen.levelDatas()
		if (WLOG) console.log(this.get_LevelDatas())
		
		// if (isPressedKey) {
		// 	let actualX = ROADDOM.style.left
		// 	actualX = parseInt(actualX.replace('px', ''))
		// 	if (actions.goRight && !actions.goLeft) {
		// 		if (this.playerX + this.playerLeft + this.playerWidth < roadXMax) {
		// 			this.playerX = this.playerX + movesize;
		// 			this.actualX = actualX - movesize;
		// 			ROADDOM.style.left = this.actualX + "px"
		// 		}
		// 	}
		// 	if (actions.goLeft && !actions.goRight) {
		// 		if (actualX < 0) {
		// 			this.playerX = this.playerX - movesize;
		// 			this.actualX = actualX + movesize;
		// 			ROADDOM.style.left = this.actualX + "px"
		// 		}
		// 	}
		// }
		// else {
		// 	// do nothing ??
		// }
	}
}
