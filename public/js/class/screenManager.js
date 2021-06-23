"use strict";
const SCREENDOM = document.getElementById('screen')
const BOARDDOM = document.getElementById('board')
const ROADDOM = document.getElementById('road-slider')

// ------------------------------------- CLASS ----------------------
// adjusting the road (% ?? or pixels)
// and make it move when keys [->,<-,Q or D] are pressed
// ------------------------------------- CLASS ----------------------
// creating and adjusting the board to screen
class ScreenManager {
	constructor(leveldatas) {
		if (WLOG) console.log('ScreenManagerleveldatas:'+leveldatas)
		// default -------------------------------------------------
		this.nbPan = leveldatas.nbpan;
		this.OriginalMoovingSpeed = 2 // pixels per refresh
		this.OriginalScreenW = 640 // pixels
		this.OriginalScreenH = 480 // pixels
		this.OriginalPanW = this.OriginalScreenW // pixels
		this.OriginalPanH = 350 // pixels

		this.OriginalroadTop = 0 // pixels per refresh
		this.OriginalPlayerW = 64 * 2
		this.OriginalPlayerH = 44 * 2
		this.OriginalPlayerTop = 0 // pixels from top
		this.OriginalroadFloorY = 272// pixels from top
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
		ROADDOM.style.backgroundSize = "auto 100%"
		// BOARDDOM.style.width = "100%"
		// SCREENDOM.style.width = "100%"
		// SCREENDOM.style.height = "100vh"
		if (WLOG) console.log("ScreenManager Class Mounted!")
	}
	get_slideDatas() {
		console.log('slideDatas:')
		console.log({
			nbpan: this.nbPan,
			panWidth: this.OriginalPanW,
			movesize: this.MoovingSpeed
		})
		return {
			nbpan: this.nbPan,
			panWidth: this.OriginalPanW,
			movesize: this.MoovingSpeed
		}
	}
	get_ScreenDomInfo_Once() {

	}
	AdjustScreenManagerDomInfo() {
		ROADDOM.style.width = parseInt(this.nbPan * this.OriginalScreenW * this.ScreenRatio) + "px"
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.ScreenRatio) + "px"
		PLAYERDOM.style.top = this.playerTop + "px"
		PLAYERDOM.style.width = this.PlayerW + "px"
		PLAYERDOM.style.height = this.PlayerH + "px"
		BOARDDOM.style.height = parseInt(this.OriginalPanH * this.ScreenRatio) + "px"

	}
	calcWinSizeRatio = () => {
		this.ScreenRatio = window.innerWidth / this.OriginalScreenW
		this.ScreenW = parseInt(this.OriginalScreenW * this.ScreenRatio)
		this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		this.PlayerW = parseInt(this.OriginalPlayerW * this.ScreenRatio) // pixels
		this.PlayerH = parseInt(this.OriginalPlayerH * this.ScreenRatio) // pixels
		this.roadFloorY = parseInt(this.OriginalroadFloorY * this.ScreenRatio) // pixels from top
		this.MoovingSpeed = parseInt(this.OriginalMoovingSpeed * this.ScreenRatio) // pixels
		this.playerTop = this.roadFloorY - this.PlayerH // pixels from top
		this.roadTop = parseInt(((this.OriginalScreenH - this.OriginalPanH) / 2) * this.ScreenRatio)
		// ------------------------------
		this.AdjustScreenManagerDomInfo()
	};
}
