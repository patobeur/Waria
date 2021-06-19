"use strict";
console.log('Waria game rules js up')
console.log('Try to clean this mess doing some classes.')
console.log('1rst Point : screen must be % display to match device ?')
const OrgiginalScreenW = 640;
const OrgiginalScreenH = 480;
let FinalScreenW = window.innerWidth
let FinalScreenH = window.innerHeight
const ScreenRatio = FinalScreenW / OrgiginalScreenW
const ScreenW = OrgiginalScreenW * ScreenRatio
const ScreenH = OrgiginalScreenH * ScreenRatio
console.log(ScreenW, ScreenH)


// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class Board {
	constructor(name, hauteur, largeur) {
		this.divId = 'road-slider';
		this.name = name;
		this.hauteur = hauteur;
		this.largeur = largeur;
		this.movesize = 2 // pixels
		this.intervalSize = 5; // microsec interval roadslider playforward
	}
	get_ScreenDomInfo_Once() {

	}
	AdjustBoardDomInfo() {

	}
}
// ------------------------------------- CLASS ----------------------
// adjusting the road (% ?? or pixels)
// and make it move when keys [->,<-,Q or D] are pressed
class SlidingRoad {
	constructor(name, hauteur, largeur) {
		this.divId = 'road-slider';
		this.name = name;
		this.hauteur = hauteur;
		this.largeur = largeur;
		this.movesize = 2 // pixels
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
// ------------------------------------- CLASS ----------------------
class Waria {
	constructor(name, divW, divH) {
		this.xp = 0
		this.lv = 1
		this.heart = 3 // player heart
		// this.health = this.heart * 100 * this.lv // player hp
		this.name = name;
		this.divW = divW;
		this.divH = divH;
	}
	get_PlayerDomInfo_Once() {

	}
	detectKeyPress() { }
	detectKeyUnPress() { }
	addAction() { }
}
// ------------------------------------- CLASS ----------------------
class Keyboard {
	constructor(name, divW, divH) {
		this.keys = {
			// key : [ facing , acting, standing, whilepressed , endingcode]
			'ArrowDown': ["crouch", "", "", true],
			'KeyC': ["crouch", "", "", true],

			'ControlLeft': ["attack", "", "", false],

			'ArrowRight': ["right", "run", "", true],
			'KeyD': ["right", "run", "", true],

			'ArrowLeft': ["left", "run", "", true],
			'KeyA': ["left", "run", "", true],

			'Escape': ["", "", "", false, "stop"],
		}
	}
	get_PlayerDomInfo_Once() {

	}
	detectKeyPress() { }
	detectKeyUnPress() { }
	addAction() { }
}
