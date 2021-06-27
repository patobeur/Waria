"use strict";
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		if (WLOG) console.log("WariaGame Class Mounted!")
		// this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Player = new PlayerManager(playername, archetype, information);
		this.SlidingRoad = new SlidingRoadManager(this.Player.playerDatas);
		// if (WLOG) console.log(this.SlidingRoad.roadDatas)
		// if (WLOG) console.log(this.Player.playerDatas)
		// if (WLOG) console.log("------------------------------------")
		this.Screen = new ScreenManager(
			this.SlidingRoad.roadDatas,
			this.Player.playerDatas
		);
		this.Mobs = new MobsManager(this.SlidingRoad.roadDatas, this.Player.playerDatas);

		this.Keyboard = new KeyboardManager(this.Player.playerDatas);


		// this.Collisions = new collisionsManager(this.Mobs);
		this.paused = false;
		this.Iteration = 1;
		setInterval(this.renderScene, REFRESHINTERV)
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
			// this.Player.playerDatas.actions.standing = ""
			PAUSEDDOM.classList.remove('active')
			clearInterval(this.renderScene)
		}
		else {
			this.paused = true
			PAUSEDDOM.classList.add('active')
			setInterval(this.renderScene, REFRESHINTERV)
		}
	}
	renderScene = () => {
		if (this.paused === true) {
		}
		else {
			this.Iteration++
			if (WLOG) console.log("iteration:")// + this.Iteration)
			// do that
			// spam MOB -> mobile objects behaviour 
		}
	}
	// set_LocalStorage(playername, archetype, information) {
	// 	// initialize
	// 	if (!(localStorage.WCoin && localStorage.WCoin >= 0)) {
	// 		localStorage.WCoin = 0
	// 		localStorage.WLv = 1
	// 		localStorage.WName = playername
	// 		localStorage.WArchetype = archetype
	// 		localStorage.Winfo = information
	// 	}
	// }
}
