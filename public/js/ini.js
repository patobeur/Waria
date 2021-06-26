"use strict";
const WLOG = true;
const WLANG = 'fr_FR';
const WVERS = 'alpha.0.2';
const REFRESHINTERV = 2000 // microsec interval refresh
const PAUSEDDOM = document.getElementById('paused')
const PX = "px"
// slidingroadmanager
const LEVELDATAS = {
	1: { nbpan: 2, name: "#NiceDayToRun !", bossname: "HashTagMHell", panW: 1000, panH: 350, floorY: 270, bgimg: "bg_lvl_1.jpg" },
	2: { nbpan: 8, name: "Falling Shit Cascading", bossname: "SeeDouble Ace", panW: 500, panH: 350, floorY: 330, bgimg: "fond2.gif" },
	3: { nbpan: 8, name: "Bottom:Root Path", bossname: "Silver Ass", panW: 1000, panH: 350, floorY: 325, bgimg: "fond3.png" },
	4: { nbpan: 8, name: "Java's Crypte", bossname: "JiAce", panW: 626, panH: 375, floorY: 332, bgimg: "fond4.jpg" },
	5: { nbpan: 8, name: "Last Level", bossname: "ConsoleLog", panW: 1000, panH: 350, floorY: 330, bgimg: "fond.jpg" },
}
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
