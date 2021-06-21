"use strict";
// ------------------------------------- CLASS ----------------------
class KeyboardManager {
	constructor() {
		this.nbPressedKey = 0
		this.isPressedKey = false
		this.Wactions = { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
		this.keys = {
			"fr_FR": [
				{ key: 'ArrowDown', eventcode: 'ArrowDown', keycode: 40, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'c', eventcode: 'KeyC', keycode: 67, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'ControlLeft', eventcode: 'ControlLeft', keycode: 17, facing: "", acting: "attack", standing: "", whilepressed: true },
				{ key: 'ArrowRight', eventcode: 'ArrowRight', keycode: 39, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'd', eventcode: 'KeyD', keycode: 68, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'ArrowLeft', eventcode: 'ArrowLeft', keycode: 37, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'q', eventcode: 'KeyA', keycode: 81, facing: "left", acting: "run", standing: "", whilepressed: true },
				// { key: 'Escape', eventcode: 'Escape', keycode: 27, facing: "", acting: "", standing: "", endingcode: true }
			]
		}
		document.onkeydown = (eventkeydown) => { this.detectKeyPress(eventkeydown) };
		document.onkeyup = (eventkeydown) => { this.detectKeyUnPress(eventkeydown) };
	}
	get_PlayerDomInfo_Once() {
	}
	detectKeyPress(eventkeydown) {
		if (WLOG) console.log(eventkeydown.keyCode, eventkeydown.code)
		this.keys[WLANG].forEach(element => {// find if pressed key exist
			if (element.keycode === eventkeydown.keyCode) {
				this.Wactions = {
					goRight: (element.acting === "run") ? (element.facing === "right" ? true : false) : false,
					goLeft: (element.acting === "run") ? (element.facing === "left" ? true : false) : false,
					facing: (element.facing != "") ? element.facing : "",
					acting: element.acting,
					standing: "",
				}
				if (element.whilepressed && this.nbPressedKey < 1) {
					this.nbPressedKey++
					this.set_isPressedKey()
				}
				NewGame.set_Actions(this.Wactions, this.isPressedKey)
			}
			// else if (27 === eventkeydown.keyCode) {
			// 	NewGame.set_Paused(true)
			// }
		});
	}
	detectKeyUnPress(event) {
		if (WLOG) console.log(event.keyCode, event.code)
		if (event.code === "ArrowRight" || event.code === "KeyD") {
			this.Wactions.goRight = false
			this.Wactions.acting = ""
			if (this.nbPressedKey > 0) { this.nbPressedKey-- }
		}
		if (event.code === "ArrowLeft" || event.code === "KeyA") {
			this.Wactions.goLeft = false
			this.Wactions.acting = ""
			if (this.nbPressedKey > 0) { this.nbPressedKey-- }
		}
		if (event.code === "ControlLeft") {
			this.Wactions.acting = "idle"
			if (this.nbPressedKey > 0) { this.nbPressedKey-- }
		}
		this.set_isPressedKey()
		NewGame.set_Actions(this.Wactions, this.isPressedKey)
	}
	set_isPressedKey() {
		if (this.nbPressedKey === 0) {
			this.isPressedKey = false
			if (this.Wactions.acting != "idle") {
				this.Wactions.acting = "idle"
			}
		}
		else if (this.nbPressedKey > 0) {
			this.isPressedKey = true
		}
		else {
			if (WLOG) console.log("error while counting pressed key !!!")
		}
		this.displayConsole()
	}
	displayConsole() {
		document.getElementById("isPressedKey").innerHTML = "isPressedKey:" + (this.isPressedKey ? "true" : "false");
		document.getElementById("nbPressedKey").innerHTML = "nbPressedKey:" + this.nbPressedKey;
		document.getElementById("acting").innerHTML = "acting:" + this.Wactions.acting;
		document.getElementById("facing").innerHTML = "facing:" + this.Wactions.facing;
		document.getElementById("standing").innerHTML = "standing:" + this.Wactions.standing;
	}
	addAction() { }
}
