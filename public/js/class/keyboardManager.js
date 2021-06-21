"use strict";
// ------------------------------------- CLASS ----------------------
class KeyboardManager {
	constructor() {
		this.nbPressedKey = 0
		this.Wactions = { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
		this.keys = {
			"fr_FR": [
				{ key: 'ArrowDown', eventcode: 'ArrowDown', keycode: 40, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'c', eventcode: 'KeyC', keycode: 67, facing: "crouch", acting: "", standing: "", whilepressed: true },
				{ key: 'ControlLeft', eventcode: 'ControlLeft', keycode: 17, facing: "attack", acting: "", standing: "", whilepressed: true },
				{ key: 'ArrowRight', eventcode: 'ArrowRight', keycode: 39, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'd', eventcode: 'KeyD', keycode: 68, facing: "right", acting: "run", standing: "", whilepressed: true },
				{ key: 'ArrowLeft', eventcode: 'ArrowLeft', keycode: 37, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'q', eventcode: 'KeyA', keycode: 81, facing: "left", acting: "run", standing: "", whilepressed: true },
				{ key: 'Escape', eventcode: 'Escape', keycode: 27, facing: "", acting: "", standing: "", endingcode: true }
			]
		}
		document.onkeydown = (eventkeydown) => { this.detectKeyPress(eventkeydown) };
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
					facing: (element.facing != "") ? element.facing : facing,
					acting: "idle",
					standing: "",
				}
				this.nbPressedKey++
				NewGame.set_Actions(this.Wactions)
			}
		});
		// if (event.code === "Escape") {
		// 	clearInterval(run)
		// 	console.log("interval cleared")
		// }
		// if (event.code === "ControlLeft") {
		// 	acting = "attack"
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowDown" || event.code === "KeyC") {
		// 	standing = "crouch"
		// 	// if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowRight" || event.code === "KeyD") {
		// 	goRight = true
		// 	facing = "right"
		// 	acting = "run"
		// 	standing = ""
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
		// if (event.code === "ArrowLeft" || event.code === "KeyA") {
		// 	goLeft = true
		// 	facing = "left"
		// 	acting = "run"
		// 	standing = ""
		// 	if (this.nbPressedKey < 1) { this.nbPressedKey++ }
		// }
	}
	detectKeyUnPress() { }
	addAction() { }
}
