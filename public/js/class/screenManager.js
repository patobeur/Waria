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
	constructor(leveldatas, playerdatas) {
		// if (WLOG) console.log('ScreenManagerleveldatas:' + leveldatas)
		// if (WLOG) console.log(playerdatas)
		// default -------------------------------------------------
		this.nbPan = leveldatas.nbpan;
		this.OriginalMoovingSpeed = 2 // pixels per refresh
		this.OriginalScreenW = 640
		this.OriginalScreenH = 480
		this.OriginalPanW = this.OriginalScreenW
		this.OriginalPanH = 350

		this.OriginalroadTop = 0
		this.OriginalPlayerW = 64 * 2
		this.OriginalPlayerH = 44 * 2
		this.OriginalPlayerX = playerdatas.defaultplayerx // pixels from left

		this.OriginalroadFloorY = 272// pixels from top
		// Init ----------------------------------------------------
		this.ScreenW = this.OriginalScreenW
		this.ScreenH = this.OriginalScreenH
		this.roadTop = this.OriginalroadTop
		this.roadFloorY = this.OriginalroadFloorY
		this.MoovingSpeed = this.OriginalMoovingSpeed
		this.PlayerW = this.OriginalPlayerW
		this.PlayerH = this.OriginalPlayerH
		this.playerTop = this.roadFloorY - this.PlayerH
		this.PlayerX = this.OriginalPlayerX
		this.ScreenRatio = 1 // <---------------------- SCREEN RATIO
		this.ScreenDisplayVertical = false // <------ SCREEN DISPLAY
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
		this.MoovingSpeed = parseInt(this.OriginalMoovingSpeed * this.ScreenRatio)
		this.ScreenW = parseInt(this.OriginalScreenW * this.ScreenRatio)
		this.ScreenH = parseInt(this.OriginalScreenH * this.ScreenRatio)
		this.PlayerW = parseInt(this.OriginalPlayerW * this.ScreenRatio)
		this.PlayerH = parseInt(this.OriginalPlayerH * this.ScreenRatio)
		this.roadFloorY = parseInt(this.OriginalroadFloorY * this.ScreenRatio)
		this.roadTop = parseInt(((this.OriginalScreenH - this.OriginalPanH) / 2) * this.ScreenRatio)
		this.PlayerX = parseInt(this.OriginalPlayerX * this.ScreenRatio)
		// ------------------------------
		this.playerTop = this.roadFloorY - this.PlayerH
		// ------------------------------
		let px = "px"
		BOARDDOM.style.height = "100vh" //this.ScreenH + px
		BOARDDOM.style.width = (this.ScreenDisplayVertical ? this.ScreenH : this.ScreenW) + px
		// ------------------------------
		ROADDOM.style.width = parseInt(this.nbPan * this.OriginalScreenW * this.ScreenRatio) + px
		ROADDOM.style.height = parseInt(this.OriginalPanH * this.ScreenRatio) + px
		// ------------------------------
		PLAYERDOM.style.top = this.playerTop + px
		PLAYERDOM.style.width = this.PlayerW + px
		PLAYERDOM.style.height = this.PlayerH + px
		PLAYERDOM.style.left = this.PlayerX + px
		// SET DISPLAY ------------------
		this.ScreenDisplayVertical
			? BOARDDOM.classList.add('vertical') // vetical ratio
			: BOARDDOM.classList.remove('vertical') // horizontal ratio
	}

	calcWinSizeRatio = () => {
		// this.ScreenDisplayVertical = (window.innerHeight < window.innerWidth) ? false : true
		this.ScreenRatio = this.ScreenDisplayVertical
			? window.innerHeight / this.OriginalScreenH // vetical ratio
			: window.innerWidth / this.OriginalScreenW // horizontal ratio
		this.AdjustScreenManagerDomInfo()
	};
}
