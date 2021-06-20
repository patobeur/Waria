"use strict";
// ------------------------------------- CLASS ----------------------
class SlidingRoadManager {
	constructor(name, hauteur, largeur, nbpan) {

		this.intervalSize = 5; // microsec interval roadslider playScene()

		this.divId = 'road-slider';
		this.name = name;
		this.hauteur = hauteur;
		this.largeur = largeur;
		this.nbPan = nbpan;
		this.movesize = 2 // pixels move when sliding forward or backward
		this.intervalSize = 5; // microsec interval roadslider playforward
	}
	get_RoadDomInfo_Once() {

	}
	playforward() {
		if (isPressedKey) {
			actualX = roadSlider.style.left
			actualX = parseInt(actualX.replace('px', ''))
			if (goRight && !goLeft) {
				if (playerX + playerLeft + playerWidth < roadXMax) {
					playerX = playerX + movesize;
					actualX = actualX - movesize;
					roadSlider.style.left = actualX + "px"
				}
			}
			if (goLeft && !goRight) {
				if (actualX < 0) {
					playerX = playerX - movesize;
					actualX = actualX + movesize;
					roadSlider.style.left = actualX + "px"
				}
			}
		}
		else {
			// do nothing ??
		}
	}
}
