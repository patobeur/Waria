"use strict";
// adjusting the board (% ?? or pixels)
// adjusting the road centered (% ?? or pixels)
class ScreenManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("ScreenManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.roadDatas = roaddatas
		this.mobsDatas = false
		// --
		this.screenDisplayVertical = false // <------ SCREEN DISPLAY
		this.OriginalPanH = this.roadDatas.panH
		this.OriginalPanW = this.roadDatas.panW
		ROADDOM.style.backgroundImage = "url('" + IMGPATH + this.roadDatas.bgimg + "')"
		// --
		this.getRatioAndResizeScreen()
	}
	resizeScreenElements() {
		// Board
		BOARDDOM.style.width = (
			this.screenDisplayVertical
				? parseInt(SCREEN.h * this.playerDatas.display.displayratio)
				: parseInt(SCREEN.w * this.playerDatas.display.displayratio)
		) + PX
		// road sizing
		ROADDOM.style.width = parseInt(this.roadDatas.nbpan * SCREEN.w * this.playerDatas.display.displayratio) + PX
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.playerDatas.display.displayratio) + PX
		// road sliding
		ROADDOM.style.left = parseInt(-(this.playerDatas.display.playerx * this.playerDatas.display.displayratio)) + PX
		// player
		PLAYERDOM.style.top = parseInt((this.roadDatas.floorY - this.playerDatas.display.OriginalPlayerH) * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.width = parseInt(this.playerDatas.display.OriginalPlayerW * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.height = parseInt(this.playerDatas.display.OriginalPlayerH * this.playerDatas.display.displayratio) + PX
		PLAYERDOM.style.left = parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * this.playerDatas.display.displayratio) + PX
		// cursor
		// ??
		CURSORDOM.style.left = parseInt(8 * this.playerDatas.display.displayratio) + PX
		// hp 
		// ??
		HEALTHDOM.style.top = parseInt((16 * this.playerDatas.display.displayratio)) + PX
		HEALTHDOM.style.left = parseInt((this.playerDatas.display.playerx * this.playerDatas.display.displayratio) + (8 * this.playerDatas.display.displayratio)) + PX
		// SET DISPLAY
		// this.screenDisplayVertical
		// 	? BOARDDOM.classList.add('vertical') // vetical ratio
		// 	: BOARDDOM.classList.remove('vertical') // horizontal ratio

		if (this.mobsDatas) {
			for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
				console.log('Ntop' + parseInt((this.roadDatas.floorY - this.mobsDatas.mobs[index].h) * this.playerDatas.display.displayratio) + PX)
				console.log('Nleft' + parseInt(this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio) + PX)
				console.log('Nheight' + parseInt(this.mobsDatas.mobs[index].h * this.playerDatas.display.displayratio) + PX)
				console.log('Nwidth' + parseInt(this.mobsDatas.mobs[index].w * this.playerDatas.display.displayratio) + PX)

				document.getElementById("mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio) + PX
				document.getElementById("mob-" + index).style.top = parseInt((this.roadDatas.floorY - this.mobsDatas.mobs[index].h) * this.playerDatas.display.displayratio) + PX

				document.getElementById("mob-" + index).style.width = parseInt(this.mobsDatas.mobs[index].w * this.playerDatas.display.displayratio) + PX
				document.getElementById("mob-" + index).style.height = parseInt(this.mobsDatas.mobs[index].h * this.playerDatas.display.displayratio) + PX
			}
		}

	}

	getRatioAndResizeScreen = () => {
		// update Player Datas
		this.playerDatas.display.displayratio = this.screenDisplayVertical
			? window.innerHeight / SCREEN.h // vetical ratio
			: window.innerWidth / SCREEN.w // horizontal ratio

		// refresh BoardScreen
		this.resizeScreenElements()

		// resizeScreenmobs
		// to do
		// this.resizeScreenMobs()

	};
}
