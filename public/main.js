"use strict";
console.log('ok!strict:main.js')
const movesize = 2 // pixels
const intervalSize = 5; // microsec interval roadslider
//-------------------
let health = 3
let iconhealth = "★"
let score = 0
//-------------------
let roadX = 0
let actualX = 0
let playerLeft = 100 // player Left pos in pixels
let playerX = 0 // playerX pos in pixels
let playerWidth = 128 // playerWidth in pixels
const panWidth = 500 // pixels 
const nbPan = 6 // pan number for road width
const roadXMax = ((nbPan - 1) * panWidth)  // pixel to win 
const roadWidth = ((nbPan) * panWidth) // pixels 
const roadHeight = 350 // pixels 

const player = document.getElementById('player') // sliding map
player.style.left = playerLeft + 'px';
const roadSlider = document.getElementById('road-slider') // sliding map
roadSlider.style.left = roadX + 'px';
roadSlider.style.width = roadWidth + 'px';
roadSlider.style.height = roadHeight + 'px';
const ratioCursor = document.getElementById('ratio-cursor') // ratio display

let ratioX = 0

let nbPressedKey = 0
let isPressedKey = false
let goRight = false
let goLeft = false
let facing = "left"
let acting = "idle"
let standing = ""
// console.log(`ratioX ${ratioX}`)

function logKey(event) {
	if (event.code === "Escape") {
		clearInterval(run)
		console.log("interval cleared")
	}
	if (event.code === "ControlLeft") {
		acting = "attack"
		if (nbPressedKey < 1) { nbPressedKey++ }
	}
	if (event.code === "ArrowDown" || event.code === "KeyC") {
		standing = "crouch"
		// if (nbPressedKey < 1) { nbPressedKey++ }
	}
	if (event.code === "ArrowRight" || event.code === "KeyD") {
		goRight = true
		facing = "right"
		acting = "run"
		standing = ""
		if (nbPressedKey < 1) { nbPressedKey++ }
	}
	if (event.code === "ArrowLeft" || event.code === "KeyA") {
		goLeft = true
		facing = "left"
		acting = "run"
		standing = ""
		if (nbPressedKey < 1) { nbPressedKey++ }
	}
	console.log(event.code)
	set_isPressedKey()
	get_acting()
	displayratioX()
}
function unlogKey(event) {
	if (event.code === "ArrowRight" || event.code === "KeyD") {
		goRight = false
		acting = ""
		if (nbPressedKey > 0) { nbPressedKey-- }
	}
	if (event.code === "ArrowLeft" || event.code === "KeyA") {
		goLeft = false
		acting = ""
		if (nbPressedKey > 0) { nbPressedKey-- }
	}
	if (event.code === "ControlLeft") {
		acting = "idle"
		if (nbPressedKey > 0) { nbPressedKey-- }
	}
	set_isPressedKey()
	get_acting()
}


function set_isPressedKey() {
	if (nbPressedKey === 0) {
		isPressedKey = false
		acting = "idle"
	}
	if (nbPressedKey > 0) {
		isPressedKey = true
	}
}
function displayConsole() {
	document.getElementById("isPressedKey").innerHTML = "isPressedKey:" + (isPressedKey ? "true" : "false");
	document.getElementById("nbPressedKey").innerHTML = "nbPressedKey:" + nbPressedKey;
	document.getElementById("acting").innerHTML = "acting:" + acting;
	document.getElementById("facing").innerHTML = "facing:" + facing;
	document.getElementById("standing").innerHTML = "standing:" + standing;
}


function get_acting() {
	if (isPressedKey === false) {
		acting = "idle"
	}
	else {
		if (acting === "") {
			acting = "idle"
		}
	}
	player.setAttribute("class", acting + " " + facing + " " + standing)
}
function playforward() {
	// console.log("pressed ? : " + isPressedKey)
	if (isPressedKey) {
		actualX = roadSlider.style.left
		// console.log(`key pressed actualX ${actualX}`)
		actualX = parseInt(actualX.replace('px', ''))

		if (goRight && !goLeft) {
			if (playerX + playerLeft + playerWidth < roadXMax) {
				playerX = playerX + movesize;
				actualX = actualX - movesize;
				roadSlider.style.left = actualX + "px"
			}
		}
		if (goLeft && !goRight) {
			if (actualX < 0) {
				playerX = playerX - movesize;
				actualX = actualX + movesize;
				roadSlider.style.left = actualX + "px"
			}
		}
	}
	else {
	}
	displayConsole()
}




















// Ration calculation
// bof bof mérite un grosse revue
function displayratioX() {
	// console.log('roadXMax:' + roadXMax)
	// console.log('roadWidth:' + roadWidth)
	// console.log('playerX:' + playerX)
	// console.log('actualX:' + actualX)
	ratioX = parseInt(((playerX + playerLeft + playerWidth) / (roadXMax)) * 100)
	ratioCursor.innerHTML = ratioX + "%"
	ratioCursor.style.width = ratioX + "%"
}
















document.onkeydown = logKey;
document.onkeyup = unlogKey;
// others methodes
// document.addEventListener('keydown', logKey);
// document.addEventListener('keyup', unlogKey);
// document.onkeypress = logKey;

var run = setInterval(playforward, intervalSize)
// others methodes
// var run = setTimeout(playforward, intervalSize)
// clearTimeout(run);
// clearInterval(run);

