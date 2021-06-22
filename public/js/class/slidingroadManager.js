"use strict";
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(slideDatas, name, hauteur, largeur, nbpan) {
		if (WLOG) console.log("SlidingRoadManager Class Mounting!")
		if (WLOG) console.log('slideDatas:' + slideDatas.nbpan)
		this.divId = 'road-slider';
		// this.name = name;
		// this.hauteur = hauteur;
		// this.largeur = largeur;
		this.nbPan = nbpan;
		this.playerX = 0;
		this.actualX = 0;
		this.movesize = 2 // pixels move when sliding forward or backward

		const panWidth = 500 // pixels 
		const nbPan = 6 // pan number for road width
		const roadXMax = ((nbPan - 1) * panWidth)  // pixel to win 
		const roadWidth = ((nbPan) * panWidth) // pixels 

	}
	get_RoadDomInfo_Once() {

	}
	playforward(actions, isPressedKey) {
		// this.Screen.get_slideDatas()
		if (WLOG) console.log('slideDatas:WWWWWWWWWWW')
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
