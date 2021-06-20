"use strict";
const WLOG = true; // console.log actif
const WLANG = 'fr_FR';
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
class KeyboardManager {
	constructor() {
		this.nbPressedKey = 0
		this.Wactions = {}
		this.keys = {
			"fr_FR": [
				{ key: 'ArrowDown', eventcode: 'ArrowDown', keycode: 40, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'c', eventcode: 'KeyC', keycode: 67, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'ControlLeft', eventcode: 'ControlLeft', keycode: 17, facing: "attack", acting: "", standing: "", whilepressed: true },
				{ key: 'ArrowRight', eventcode: 'ArrowRight', keycode: 39, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'd', eventcode: 'KeyD', keycode: 68, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'ArrowLeft', eventcode: 'ArrowLeft', keycode: 37, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'q', eventcode: 'KeyA', keycode: 81, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'Escape', eventcode: 'Escape', keycode: 27, facing: "", acting: "", standing: "", endingcode: true }
			]
		}
		document.onkeydown = (eventkeydown) => { this.detectKeyPress(eventkeydown) };
	}
	get_PlayerDomInfo_Once() {
	}
	detectKeyPress(eventkeydown) {
		console.log(eventkeydown.keyCode)
		this.keys[WLANG].forEach(element => {
			if (element.keycode === eventkeydown.keyCode) {
				this.Wactions = {
					goRight: (element.acting === "run") ? (facing === "right" ? true : false) : false,
					goLeft: (element.acting === "run") ? (facing === "left" ? true : false) : false,
					facing: (element.facing != "") ? element.facing : facing,
					acting: "idle",
					standing: "",
				}
				WariaGame.set_Actions(this.Wactions)// console.log(this.Wactions)
			}
			// console.log(eventkeydown.code)
		});
		// if (event.code === "Escape") {
		// 	clearInterval(run)
		// 	console.log("interval cleared")
		// }
		// if (event.code === "ControlLeft") {
		// 	acting = "attack"
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowDown" || event.code === "KeyC") {
		// 	standing = "crouch"
		// 	// if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowRight" || event.code === "KeyD") {
		// 	goRight = true
		// 	facing = "right"
		// 	acting = "run"
		// 	standing = ""
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowLeft" || event.code === "KeyA") {
		// 	goLeft = true
		// 	facing = "left"
		// 	acting = "run"
		// 	standing = ""
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
	}
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
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Screen = new ScreenManager();
		this.Keyboarder = new KeyboardManager();
		this.Wactions = { 'one': 'one' }
		// this.slidingRoad = new SlidingRoad('level1', 640, 480);
		// this.PlayerOne = new Player(playername, archetype, information)

		this.movesize = 2 // pixels
		this.intervalSize = 5; // microsec interval roadslider playforward
		setInterval(this.playScene, 1000)
	}
	set_Actions(datas) {
		this.Wactions = datas
		console.log('set_Actions:' + this.Wactions)
	}
	get_ScreenDomInfo_Once() {

	}
	playScene() {
		// render scene
		console.log(this.Wactions)
	}
	set_nextLevel() {
		this.levelCurrent++
	}
	set_LocalStorage(playername, archetype, information) {
		// initialize
		if (!(localStorage.WCoin && localStorage.WCoin >= 0)) {
			localStorage.WCoin = 0
			localStorage.WLv = 1
			localStorage.WName = playername
			localStorage.WArchetype = archetype
			localStorage.Winfo = information
		}
	}
}

let NewGame = new WariaGame("Waria", "Warrior", "what else !!")

// Calculate the viewport size
// window.addEventListener('resize', (e) => { NewGame.Screen.calcWinsize() });
window.onresize = (eventResize) => { NewGame.Screen.calcWinSizeRatio() };
// document.onkeyup = unlogKey;
