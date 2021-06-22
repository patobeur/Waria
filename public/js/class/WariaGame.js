"use strict";
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Screen = new ScreenManager();
		this.Player = new PlayerManager(playername, archetype, information);
		this.Keyboard = new KeyboardManager();
		// this.SlidingRoad = new SlidingRoadManager();
		this.paused = false
		// this.slidingRoad = new SlidingRoad('level1', 640, 480);
		// this.PlayerOne = new Player(playername, archetype, information)

		this.intervalSize = 1000; // microsec interval renderScene
		setInterval(this.renderScene(), this.intervalSize)
		if (WLOG) console.log("WariaGame Class Mounted!")
	}
	set_Actions(actions, isPressedKey) { // call from KeyboardManager
		this.Player.set_Actions(actions, isPressedKey)
		// this.SlidingRoad.playforward(actions, isPressedKey)
	}
	set_Action(actionname, action, isPressedKey) { // call from KeyboardManager
		this.Player.set_Action(actionname, action, isPressedKey)
	}
	set_Paused() { // call from KeyboardManager
		// this.paused = !this.paused // ???
		if (this.paused === true) {
			this.paused = false
			// setInterval(this.renderScene(), this.intervalSize)
		} else {
			this.paused = true
			// clearInterval(this.renderScene)
			console.log("game paused")
		}

	}
	get_ScreenDomInfo_Once() {

	}
	renderScene() {
		if (!this.paused) {
			// render scene
			// do that
		}
		else {
			console.log("game paused !")
		}
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
