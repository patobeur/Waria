"use strict";
class KeyboardManager {
	constructor(playerdatas) {
		if (WLOG) console.log("KeyboardManager Class Mounted!")
		this.nbKeyPressed = 0
		this.isKeyPressed = false
		this.playerDatas = playerdatas
		this.Wactions = { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
		this.keys = {
			"fr_FR": [
				{ key: 'ArrowDown', eventcode: 'ArrowDown', keycode: 40, facing: "", acting: "", standing: "crouch", whilepressed: true },
				{ key: 'c', eventcode: 'KeyC', keycode: 67, facing: "", acting: "", standing: "crouch", whilepressed: true },
				{ key: 'ControlLeft', eventcode: 'ControlLeft', keycode: 17, facing: "", acting: "attack", standing: "", whilepressed: true },
				{ key: 'ArrowRight', eventcode: 'ArrowRight', keycode: 39, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'd', eventcode: 'KeyD', keycode: 68, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'ArrowLeft', eventcode: 'ArrowLeft', keycode: 37, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'q', eventcode: 'KeyA', keycode: 81, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'Escape', eventcode: 'Escape', keycode: 27, facing: "", acting: "", standing: "crouch", whilepressed: false, actionF: "set_Paused" }
			]
		}
		document.onkeydown = (eventkeydown) => { this.detectKeyPress(eventkeydown) };
		document.onkeyup = (eventkeydown) => { this.detectKeyUnPress(eventkeydown) };
	}
	get_PlayerDomInfo_Once() {
	}
	detectKeyPress(eventkeydown) {
		this.keys[WLANG].forEach(element => {// find if pressed key exist
			if (element.keycode === eventkeydown.keyCode) {
				this.Wactions = {
					goRight: (element.acting === "run") ? (element.facing === "right" ? true : false) : false,
					goLeft: (element.acting === "run") ? (element.facing === "left" ? true : false) : false,
					facing: (element.facing != "") ? element.facing : this.Wactions.facing,
					acting: (element.acting != "") ? element.acting : this.Wactions.acting,
					standing: (element.standing != "") ? element.standing : this.Wactions.standing,
				}
				if (element.whilepressed && this.nbKeyPressed < 1) {
					this.nbKeyPressed++
					this.set_isKeyPressed()
				}
				if (element.actionF) {
					Journey.set_Paused()
				}
				Journey.set_ActionsAndPlay(this.Wactions, this.isKeyPressed)
				this.set_acting()
			}
		});
	}
	detectKeyUnPress(event) {
		if (event.code === "ArrowRight" || event.code === "KeyD") {
			this.Wactions.goRight = false
			this.Wactions.acting = ""
			this.Wactions.standing = "" // stand up when run
			if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
		}
		if (event.code === "ArrowLeft" || event.code === "KeyA") {
			this.Wactions.goLeft = false
			this.Wactions.acting = ""
			this.Wactions.standing = "" // stand up when run
			if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
		}
		if (event.code === "ControlLeft") {
			this.Wactions.acting = ""
			if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
		}
		// if (27 === event.keyCode) {
		// 	Journey.set_Paused()
		// }
		this.set_isKeyPressed()
		Journey.set_ActionsAndPlay(this.Wactions, this.isKeyPressed)
		this.set_acting()
	}
	set_isKeyPressed() {
		if (this.nbKeyPressed === 0) {
			this.isKeyPressed = false
			if (this.Wactions.acting != "idle") {
				this.Wactions.acting = "idle"
			}
		}
		else if (this.nbKeyPressed > 0) {
			this.isKeyPressed = true
		}
		else {
			if (WLOG) console.log("error while counting pressed key !!!")
		}
		this.displayConsole()
	}
	set_acting() {
		if (this.isKeyPressed === false) {
			this.Wactions.acting = "idle"
		}
		else {
			if (this.Wactions.acting === "") {
				this.Wactions.acting = "idle"
			}
		}
		PLAYERDOM.setAttribute("class", this.Wactions.acting + " " + this.Wactions.facing + " " + this.Wactions.standing)
	}
	displayConsole() {
		document.getElementById("isKeyPressed").innerHTML = "isKeyPressed:" + (this.isKeyPressed ? "true" : "false");
		document.getElementById("nbKeyPressed").innerHTML = "nbKeyPressed:" + this.nbKeyPressed;
		document.getElementById("acting").innerHTML = "acting:" + this.Wactions.acting;
		document.getElementById("facing").innerHTML = "facing:" + this.Wactions.facing;
		document.getElementById("standing").innerHTML = "standing:" + this.Wactions.standing;
	}
}
CONSOLE.addEventListener('click', (e) => {
	CONSOLE.classList.contains('active')
		? CONSOLE.classList.remove('active')
		: CONSOLE.classList.add('active')
})
