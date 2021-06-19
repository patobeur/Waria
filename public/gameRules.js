"use strict";
console.log('Waria game rules js up')
console.log('Try to clean this mess doing some classes.')
console.log('1rst Point : screen must be % display to match device ?')
const playerDom = document.getElementById('player')
const screenDom = document.getElementById('screen')
const roadDom = document.getElementById('road-slider')

// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.levelCurrent = 1;
		this.Screen = new ScreenManager();
		// this.slidingRoad = new SlidingRoad('level1', 640, 480);
		// this.PlayerOne = new Player(playername, archetype, information)

		this.movesize = 2 // pixels
		this.intervalSize = 5; // microsec interval roadslider playforward
	}
	get_ScreenDomInfo_Once() {

	}
	playScene() {
		// render scene
	}
	nextLevel() {
		// update next lv
	}
}
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class ScreenManager {
	constructor() {
		this.nbPan = 6;
		this.OriginalScreenW = 640 // pixels
		this.OriginalScreenH = 480 // pixels
		this.OriginalPanW = this.OriginalScreenW // pixels
		this.OriginalPanH = 350 // pixels
		this.movesize = 2 * this.ScreenRatio // pixels
		this.roadTop = 0 // pixels
		this.calcWinsize()
	}
	get_ScreenDomInfo_Once() {

	}
	AdjustScreenManagerDomInfo() {

	}
	calcWinsize = () => {
		if (window.innerWidth < window.innerHeight) {
			this.ScreenRatio = window.innerWidth / this.OriginalScreenW
			this.ScreenW = parseInt(this.OriginalScreenW * this.ScreenRatio)
			this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		}
		else {
			this.ScreenRatio = window.innerHeight / this.OriginalScreenH
			this.ScreenW = window.innerWidth
			this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		}

		screenDom.style.width = parseInt(this.ScreenW) + "px"
		screenDom.style.height = parseInt(this.ScreenH) + "px"

		roadDom.style.width = parseInt(this.nbPan * this.OriginalScreenW * this.ScreenRatio) + "px"
		roadDom.style.height = parseInt(this.OriginalPanH * this.ScreenRatio) + "px"
		this.roadTop = parseInt(((this.OriginalScreenH - this.OriginalPanH) / 2) * this.ScreenRatio)
		roadDom.style.top = this.roadTop + "px"

		roadDom.style.backgroundSize = "auto 100%"

		console.log("-----")
		console.log('Origin ScreenW:' + this.ScreenW + ' ScreenH:' + this.ScreenH)
		console.log('Final ScreenW:' + parseInt(this.ScreenW * this.ScreenRatio) + ' ScreenH:' + parseInt(this.OriginalPanH * this.ScreenRatio))
		console.log('ScreenRatio:' + this.ScreenRatio)
		console.log('size:' + (100 * this.ScreenRatio) + "%")
		// console.log({ width: window.innerWidth, height: window.innerHeight })
	};
}
// ------------------------------------- CLASS ----------------------
// adjusting the road (% ?? or pixels)
// and make it move when keys [->,<-,Q or D] are pressed
class SlidingRoad {
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
// ------------------------------------- CLASS ----------------------
class Collisions {
	constructor() {

	}
}

// ------------------------------------- PLAYER CLASS ---------------
class Player {
	constructor(playername, archetype, information) {
		this.xp = 0
		this.lv = 1
		this.heart = 3 // player heart
		// this.health = this.heart * 100 * this.lv // player hp
		this.playername = playername;
		this.archetype = archetype;
		this.information = information;
		this.divW = 64 * 2; // pixels (fixed *2 to fit my needs for testing)
		this.divH = 44 * 2; // pixels (fixed *2 to fit my needs for testing)
		this.acting = "idle"; // default empty = idle {'', 'idle','run'}
		this.facing = ""; // default empty = right {'', 'right','left'}
		this.standing = ""; // default empty = not crouch {'', 'crouch','jump'} ???
		// run and jump ?? or run Or jump ??
		this.alive()
	}
	get_PlayerDomInfo_Once() {
		// stuff do do
		// then
		display_Player_Once()
	}
	display_Player_Once() {
		// display and\or create player div in DOM
	}
	refreshPlayerDomInfo() {
		// set div attributs in Dom
		// called each cycle of refreshing
		// by Class SlidingRoad->playforward
	}
	detectKeyPress() { }
	detectKeyUnPress() { }
	addAction() { }
	alive() {
		console.log(this.playername + " is alive !")
	}
}

let NewGame = new WariaGame("Waria", "Warrior", "what else !!")

// Calculate the viewport size
// let winsize = calcWinsize();
window.addEventListener('resize', (e) => NewGame.Screen.calcWinsize());
