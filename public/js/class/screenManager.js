"use strict";
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
		this.OriginalPanH = this.levelDatas.panH
		this.OriginalPanW = this.levelDatas.panW
		ROADDOM.style.backgroundImage = "url('" + IMGPATH + this.levelDatas.bgimg + "')"
		// --
		this.getRatioAndResizeScreen()
	}
	resizeScreenElements() {
		// Board
		BOARDDOM.style.width = (this.screenDisplayVertical ? parseInt(SCREEN.h * this.playerDatas.display.displayratio) : parseInt(SCREEN.w * this.playerDatas.display.displayratio)) + PX
		// road sizing
		ROADDOM.style.width = parseInt(this.levelDatas.nbpan * SCREEN.w * this.playerDatas.display.displayratio) + PX
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.playerDatas.display.displayratio) + PX
		// road sliding
		ROADDOM.style.left = -(this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + PX
		// player
		PLAYERDOM.style.top = parseInt((this.levelDatas.floorY - this.playerDatas.display.OriginalPlayerH) * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.width = parseInt(this.playerDatas.display.OriginalPlayerW * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.height = parseInt(this.playerDatas.display.OriginalPlayerH * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.left = parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * this.playerDatas.display.displayratio) + PX
		// cursor
		// ??
		CURSORDOM.style.left = (8 * this.playerDatas.display.displayratio) + PX
		// health 
		// ??
		HEALTHDOM.style.top = parseInt((16 * this.playerDatas.display.displayratio)) + PX
		HEALTHDOM.style.left = parseInt((this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + (8 * this.playerDatas.display.displayratio)) + PX
		// SET DISPLAY
		// this.screenDisplayVertical
		// 	? BOARDDOM.classList.add('vertical') // vetical ratio
		// 	: BOARDDOM.classList.remove('vertical') // horizontal ratio

	}

	getRatioAndResizeScreen = () => {
		// update Player Datas
		this.playerDatas.display.displayratio = this.screenDisplayVertical
			? window.innerHeight / SCREEN.h // vetical ratio
			: window.innerWidth / SCREEN.w // horizontal ratio
		// refresh BoardScreen
		this.resizeScreenElements()
	};
}
