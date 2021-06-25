"use strict";
const PAUSEDDOM = document.getElementById('paused')
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Player = new PlayerManager(playername, archetype, information);
		this.SlidingRoad = new SlidingRoadManager(this.Player.playerDatas);

		this.Screen = new ScreenManager(
			this.SlidingRoad.roadDatas,
			this.Player.playerDatas
		);
		this.Keyboard = new KeyboardManager();
		this.paused = false;
		this.Iteration = 1;
		setInterval(this.renderScene, REFRESHINTERV)
		if (WLOG) console.log("WariaGame Class Mounted!")
	}

	set_ActionsAndPlay(actions, isPressedKey) { // call from detectKeyPress() & detectKeyUnPress() in class keyboardManager.js
		this.Player.set_Actions(actions)
		this.Player.set_IsKeyPressed(isPressedKey)
		this.Player.set_PlayerDatas(
			this.SlidingRoad.playforward(this.Player.playerDatas)
		)
	}
	set_Paused() { // call from KeyboardManager
		// this.paused = !this.paused // ???
		if (this.paused === true) {
			this.paused = false
			PAUSEDDOM.classList.remove('active')
			setInterval(this.renderScene, REFRESHINTERV)
		} else {
			this.paused = true
			PAUSEDDOM.classList.add('active')
			clearInterval(this.renderScene)
		}
		console.log("Useless -> Paused:" + (this.paused ? "true" : "false"))
	}
	renderScene = () => {
		if (!this.paused) {
			this.Iteration++
			if (WLOG) console.log("iteration:")// + this.Iteration)
			// do that
			// spam MOB -> mobile objects behaviour 
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
