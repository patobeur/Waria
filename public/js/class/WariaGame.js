"use strict";
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class WariaGame {
	constructor(playername, archetype, information) {
		this.set_LocalStorage(playername, archetype, information)
		this.levelCurrent = 0;
		this.Screen = new ScreenManager();
		this.Keyboard = new KeyboardManager();
		this.Wactions = { 'one': 'one' }
		this.fffffff = "ffffffffffff"
		// this.slidingRoad = new SlidingRoad('level1', 640, 480);
		// this.PlayerOne = new Player(playername, archetype, information)

		this.movesize = 2 // pixels
		this.intervalSize = 5; // microsec interval roadslider playforward
		setInterval(this.playScene(), 1000)
	}
	set_Actions(datas) {
		this.Wactions = datas
		console.log('set_Actions:' + this.Wactions)
	}
	get_ScreenDomInfo_Once() {

	}
	playScene() {
		// render scene
		// console.log(this.Wactions)
		// console.log(this.fffffff)
		console.log(this.movesize)
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
