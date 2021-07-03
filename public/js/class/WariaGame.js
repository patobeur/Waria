"use strict";
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		if (WLOG) console.log("WariaGame Class Mounted!")
		// this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0
		this.Player = new PlayerManager(playername, archetype, information)
		this.SlidingRoad = new SlidingRoadManager(this.Player.playerDatas)

		this.Screen = new ScreenManager(
			this.SlidingRoad.roadDatas,
			this.Player.playerDatas
		)

		this.Mobs = new MobsManager(this.SlidingRoad.roadDatas, this.Player.playerDatas)
		// console.log('*******************************')
		// console.log(this.Mobs)
		this.Screen.mobsData = this.Mobs
		this.Keyboard = new KeyboardManager(this.Player.playerDatas)


		// this.Collisions = new collisionsManager(this.Mobs);
		this.paused = false
		this.Iteration = 1
		setInterval(this.renderScene, REFRESHINTERV)
	}

	set_ActionsAndPlay(actions, isPressedKey) { // call from detectKeyPress() & detectKeyUnPress() in class keyboardManager.js
		this.Player.playerDatas.actions = actions
		// this.Player.playerDatas.isKeyPressed = isPressedKey
		this.SlidingRoad.playerDatas = this.Player.playerDatas
		let moove = this.SlidingRoad.playforward()
		this.Player.playerDatas = moove ? moove : this.Player.playerDatas
	}
	set_Paused() { // call from KeyboardManager
		// this.paused = !this.paused // ???
		if (this.paused === true) {
			this.paused = false
			// this.Player.playerDatas.actions.standing = ""
			PAUSEDDOM.classList.remove('active')
			// clearInterval(this.renderScene)
		}
		else {
			this.paused = true
			PAUSEDDOM.classList.add('active')
			// setInterval(this.renderScene, REFRESHINTERV)
		}
	}
	set_End() { // call from KeyboardManager
		console.log('you die')
		// this.paused = !this.paused // ???
		// PAUSEDDOM.classList.remove('active')
		ENDDOM.classList.add('active')
		// clearInterval(this.renderScene)
	}
	// SCENE RENDER
	renderScene = () => {
		if (!this.paused & this.Player.playerDatas.stats.hp >= 1) {
			this.Iteration++
			if (WLOG) console.log("iteration:")// + this.Iteration)
			// mobile objects  
			this.getCollision()

			this.Keyboard.displayConsole()
		}
	}
	getCollision() {
		let collide = false //this.Mobs.mobs_refresh()
		if (collide) {
			// not in the good scope ;( ??? good place neither ;(
			this.Player.playerDatas.stats.hp -= collide
		}
		if (this.Player.playerDatas.stats.hp < 1) {
			// you die ;(
			this.set_End()
		}
	}


	// SCENE RENDER
	getRatioAndResizeScreen() {
		this.Screen.playerDatas = this.Player.playerDatas
		this.Screen.mobsDatas = this.Mobs.mobsDatas
		this.Screen.getRatioAndResizeScreen()
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
