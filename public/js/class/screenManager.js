"use strict";
// const SCREENDOM = document.getElementById('screen')
const BOARDDOM = document.getElementById('board')
const ROADDOM = document.getElementById('road-slider')
const IMGPATH = "assets/PixelsAssets/"
// ------------------------------------- CLASS ----------------------
// adjusting the board (% ?? or pixels)
// adjusting the road centered (% ?? or pixels)

class ScreenManager {
	constructor(leveldatas, playerdatas) {
		if (WLOG) console.log("ScreenManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.levelDatas = leveldatas
		// --
		this.screenDisplayVertical = false // <------ SCREEN DISPLAY
		// default fixed communs datas ------------------------------
		this.screenW = 640
		this.screenH = 480
		this.OriginalPanH = this.levelDatas.panH
		this.OriginalPanW = this.levelDatas.panW
		ROADDOM.style.backgroundImage = "url('" + IMGPATH + this.levelDatas.bgimg + "')"
		// --
		this.getRatioAndResizeScreen()
	}
	resizeScreenElements() {
		let px = "px"
		// Board
		BOARDDOM.style.width = (this.screenDisplayVertical ? parseInt(this.screenH * this.playerDatas.display.displayratio) : parseInt(this.screenW * this.playerDatas.display.displayratio)) + px
		// road sizing
		ROADDOM.style.width = parseInt(this.levelDatas.nbpan * this.screenW * this.playerDatas.display.displayratio) + px
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.playerDatas.display.displayratio) + px
		// road sliding
		ROADDOM.style.left = -(this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + px
		// player
		PLAYERDOM.style.top = parseInt((this.levelDatas.floorY - this.playerDatas.display.OriginalPlayerH) * this.playerDatas.display.displayratio) + px
		PLAYERDOM.style.width = parseInt(this.playerDatas.display.OriginalPlayerW * this.playerDatas.display.displayratio) + px
		PLAYERDOM.style.height = parseInt(this.playerDatas.display.OriginalPlayerH * this.playerDatas.display.displayratio) + px
		PLAYERDOM.style.left = parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * this.playerDatas.display.displayratio) + px
		// cursor
		// ??

		// health 
		// ??

		// SET DISPLAY
		// this.screenDisplayVertical
		// 	? BOARDDOM.classList.add('vertical') // vetical ratio
		// 	: BOARDDOM.classList.remove('vertical') // horizontal ratio

	}

	getRatioAndResizeScreen = () => {
		// update Player Datas
		this.playerDatas.display.displayratio = this.screenDisplayVertical
			? window.innerHeight / this.screenH // vetical ratio
			: window.innerWidth / this.screenW // horizontal ratio
		// refresh BoardScreen
		this.resizeScreenElements()
	};
}
