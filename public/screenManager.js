"use strict";
const PLAYERDOM = document.getElementById('player')
const SCREENDOM = document.getElementById('screen')
const ROADDOM = document.getElementById('road-slider')

// ------------------------------------- CLASS ----------------------
// adjusting the road (% ?? or pixels)
// and make it move when keys [->,<-,Q or D] are pressed
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class ScreenManager {
	constructor() {
		// default -------------------------------------------------
		this.nbPan = 6;
		this.OriginalMoovingSpeed = 2 // pixels per refresh
		this.OriginalScreenW = 640 // pixels
		this.OriginalScreenH = 480 // pixels
		this.OriginalPanW = this.OriginalScreenW // pixels
		this.OriginalPanH = 350 // pixels

		this.OriginalroadTop = 0 // pixels per refresh
		this.OriginalPlayerW = 64 * 2
		this.OriginalPlayerH = 44 * 2
		this.OriginalPlayerTop = 0 // pixels from top
		this.OriginalroadFloorY = 335// pixels from top
		// Init ----------------------------------------------------
		this.ScreenRatio = 1
		this.ScreenW = this.OriginalScreenW
		this.ScreenH = this.OriginalScreenH
		this.roadTop = this.OriginalroadTop
		this.roadFloorY = this.OriginalroadFloorY
		this.MoovingSpeed = this.OriginalMoovingSpeed// pixels
		this.PlayerW = this.OriginalPlayerW// pixels
		this.PlayerH = this.OriginalPlayerH// pixels

		this.playerTop = this.roadFloorY // pixels from top
		this.calcWinSizeRatio()

	}
	get_ScreenDomInfo_Once() {

	}
	AdjustScreenManagerDomInfo() {
		SCREENDOM.style.width = this.ScreenW + "px"
		SCREENDOM.style.height = this.ScreenH + "px"

		ROADDOM.style.width = parseInt(this.nbPan * this.OriginalScreenW * this.ScreenRatio) + "px"
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.ScreenRatio) + "px"
		ROADDOM.style.top = this.roadTop + "px"
		ROADDOM.style.backgroundSize = "auto 100%"
		PLAYERDOM.style.top = this.playerTop + "px"
		PLAYERDOM.style.width = this.PlayerW + "px"
		PLAYERDOM.style.height = this.PlayerH + "px"

	}
	calcWinSizeRatio = () => {
		if (window.innerWidth < window.innerHeight) {
			this.ScreenRatio = window.innerWidth / this.OriginalScreenW
			this.ScreenW = parseInt(this.OriginalScreenW * this.ScreenRatio)
			this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		}
		else {
			this.ScreenRatio = window.innerHeight / this.OriginalScreenH
			// this.ScreenW = window.innerWidth
			this.ScreenW = parseInt(this.OriginalScreenW * this.ScreenRatio)
			this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		}

		this.PlayerW = parseInt(this.OriginalPlayerW * this.ScreenRatio) // pixels
		this.PlayerH = parseInt(this.OriginalPlayerH * this.ScreenRatio) // pixels
		this.roadTop = parseInt(((this.OriginalScreenH - this.OriginalPanH) / 2) * this.ScreenRatio)
		this.roadFloorY = parseInt(this.OriginalroadFloorY * this.ScreenRatio) // pixels from top
		this.MoovingSpeed = parseInt(this.OriginalMoovingSpeed * this.ScreenRatio) // pixels
		this.playerTop = this.roadFloorY - this.PlayerH // pixels from top
		console.log(this.roadFloorY)
		console.log(this.OriginalroadFloorY)
		this.AdjustScreenManagerDomInfo()
	};
}
