"use strict";
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Player = new PlayerManager(playername, archetype, information);
		this.SlidingRoad = new SlidingRoadManager(this.Player.playerDatas);
		this.Screen = new ScreenManager(
			this.SlidingRoad.get_LevelDatas(),
			this.Player.playerDatas
		);
		this.Keyboard = new KeyboardManager();
		this.paused = false

		setInterval(this.renderScene(), REFRESHINTERV)
		if (WLOG) console.log("WariaGame Class Mounted!")
	}

	// set_nextLevel() {
	// 	this.levelCurrent++
	// 	this.SlidingRoad.nextLevel()
	// }
	set_ActionsAndPlay(actions, isPressedKey) { // call from detectKeyPress() & detectKeyUnPress() in class keyboardManager.js
		this.Player.set_Actions(actions, isPressedKey)
		this.Player.playerDatas = this.SlidingRoad.playforward(this.Player.playerDatas) // need callback return
		// if (WLOG) console.log(this.Player.playerDatas)
	}
	// set_Action(actionname, action, isPressedKey) { // call from KeyboardManager
	// 	this.Player.set_Action(actionname, action, isPressedKey)
	// }
	set_Paused() { // call from KeyboardManager
		this.paused = !this.paused // ???
		// if (this.paused === true) {
		// 	this.paused = false
		// 	// setInterval(this.renderScene(), REFRESHINTERV)
		// } else {
		// 	this.paused = true
		// 	// clearInterval(this.renderScene)
		// }
		console.log("Useless -> Paused:" + (this.paused ? "true" : "false"))
	}
	renderScene() {
		if (!this.paused) {
			// render scene
			// do that

			// spam MOB -> mobile objects behaviour 
		}
		else {
			console.log("game paused !")
		}
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
