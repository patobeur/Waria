"use strict";
const WLOG = true;
const WLANG = 'fr_FR';
const WVERS = 'alpha.0.3';
const REFRESHINTERV = 200 // microsec interval refresh
const PAUSEDDOM = document.getElementById('paused')
const PX = "px"

// console
const CONSOLE = document.getElementById('console')
// ScreenManager
// const SCREENDOM = document.getElementById('screen')
const BOARDDOM = document.getElementById('board')
const ROADDOM = document.getElementById('road-slider')
const HEALTHDOM = document.getElementById('health')
const CURSORDOM = document.getElementById('cursor')
const PROGRESSDOM = document.getElementById('progress')
const IMGPATH = "assets/maps/"
const SCREEN = { w: 640, h: 480 }

// PlayerManager
const PLAYERDOM = document.getElementById('player')
const PLAYERARCHETYPES = {
	"Warrior": {
		"stats": { movesize: 4, playerx: 100, health: 5, range: 1 },
		"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	},
	// "Wizard": {
	// 	"stats": { movesize: 3, playerx: 100, health: 3, range: 10 },
	// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	// },
	// "Ranger": {
	// 	"stats": { movesize: 4, playerx: 100, health: 4, range: 5 },
	// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	// }
}

// slidingroadmanager
const LEVELDATAS = {
	1: { nbpan: 2, name: "#NiceDayToRun !", bossname: "HashTagMHell", panW: 1000, panH: 350, floorY: 270, bgimg: "bg_lvl_1.jpg", nbmob: 10 },
	2: { nbpan: 8, name: "Falling Sheet Cascading", bossname: "SeeDouble Ace", panW: 500, panH: 350, floorY: 330, bgimg: "fond2.gif", nbmob: 10 },
	3: { nbpan: 8, name: "Bottom:Root Path", bossname: "Silver Ass", panW: 1000, panH: 350, floorY: 325, bgimg: "fond3.png", nbmob: 10 },
	4: { nbpan: 8, name: "Java's Crypte", bossname: "JiAce", panW: 626, panH: 375, floorY: 332, bgimg: "fond4.jpg", nbmob: 10 },
	5: { nbpan: 8, name: "Last Level", bossname: "ConsoleLog", panW: 1000, panH: 350, floorY: 330, bgimg: "fond.jpg", nbmob: 10 },
}

// mobs
const MOBS = {
	1: { name: "lambdaMob", aoe: 20, helath: 1, x: 0, h: 350, w: 270, speed: 4, bgimg: "mob1.gif" }
}
