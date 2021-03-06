"use strict";
const WLOG = false
const WDEV = true
const WVERS = 'alpha.0.3'
let WLANG = 'fr_FR'
let HEALTHLOSS = true
let REFRESHINTERV = 50 // microsec interval refresh
const PAUSEDDOM = document.getElementById('paused')
const ENDDOM = document.getElementById('end')
const PX = "px"

// console
const CONSOLEON = true
const CONSOLE = document.getElementById('console')
// ScreenManager
// const SCREENDOM = document.getElementById('screen')
const BOARDDOM = document.getElementById('board')
const ROADDOM = document.getElementById('road-slider')
const HEALTHDOM = document.getElementById('health')
const HEARTDOM = document.getElementById('heart')
const CURSORDOM = document.getElementById('cursor')
const PROGRESSDOM = document.getElementById('progress')
const IMGPATH = "assets/maps/"
const MOBIMGPATH = "assets/mobs/"
const SCREEN = { w: 640, h: 480 }
const HEALTH = { w: 250, h: 32 }

// PlayerManager
const PLAYERDOM = document.getElementById('player')
const PLAYERARCHETYPES = {
	"Warrior": {
		"stats": { movesize: 4, playerx: 100, hp: 250, maxhp: 250, range: 1, basehit: 100 },
		"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	},
	// "Wizard": {
	// 	"stats": { movesize: 3, playerx: 100, hp: 150, maxhp: 250, range: 10, basehit: 100 },
	// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	// },
	// "Ranger": {
	// 	"stats": { movesize: 4, playerx: 100, hp: 200, maxhp: 250, range: 5, basehit: 100 },
	// 	"actions": { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
	// }
}


// OriginalPlayerW: 64 * 2,
// OriginalPlayerH: 44 * 2,
// mobsManager
const MOBSDOM = document.getElementById('mobs')
const MOBS = {
	// x,   name,		spawned,triggerx, posx,   aoe,hp,hpmax,h,   w,   speed,xp,hit, mode, bgimg, out, delay(currentdelay,delay)
	1: [0, "guard1", false, 300, [SCREEN.w, 2000], 20, 1, 1, 96, 96, 3, 100, 5, 0, "run_l.gif", false, [0, 50]],
	2: [0, "guard2", false, 300, [SCREEN.w, 2000], 20, 1, 1, 96, 96, 3, 100, 10, 0, "run_l.gif", false, [0, 60]],
	3: [0, "guard2", false, 300, [SCREEN.w, 2000], 30, 500, 500, 96, 96, 1, 300, 10, 0, "run_l.gif", false, [0, 80]],
	4: [0, "gwaria", false, 300, [SCREEN.w, 2000], 40, 1000, 1000, 88, 128, 1, 1000, 50, 0, "run_l.gif", false, [0, 80]],
}
const LEVELMOBS = {
	1: {
		mobs: [ // mob list level 1 (0)
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[1]),
			new Mob(...MOBS[3])
		],
		boss: [ // boss level 1 (0)
			new Mob(...MOBS[4]),
		]
	},
	2: {
		mobs: [new Mob(...MOBS[2]), new Mob(...MOBS[2]), new Mob(...MOBS[2])], boss: [new Mob(...MOBS[3])]
	}
}

// slidingroadmanager
const LEVELDATAS = {
	1: { nbpan: 2, lv: 1, name: "#NiceDayToRun !", bossname: "HashTagMHell", panW: 1000, panH: 350, floorY: 270, bgimg: "bg_lvl_1.jpg", nbmob: 10 },
	2: { nbpan: 8, lv: 2, name: "Falling Sheet Cascading", bossname: "SeeDouble Ace", panW: 500, panH: 350, floorY: 330, bgimg: "fond2.gif", nbmob: 10 },
	3: { nbpan: 8, lv: 3, name: "Bottom:Root Path", bossname: "Silver Ass", panW: 1000, panH: 350, floorY: 325, bgimg: "fond3.png", nbmob: 10 },
	4: { nbpan: 8, lv: 4, name: "Java's Crypte", bossname: "JiAce", panW: 626, panH: 375, floorY: 332, bgimg: "fond4.jpg", nbmob: 10 },
	5: { nbpan: 8, lv: 5, name: "Last Level", bossname: "ConsoleLog", panW: 1000, panH: 350, floorY: 330, bgimg: "fond.jpg", nbmob: 10 },
}
