"use strict";
class KeyboardManager {
	constructor(playerdatas) {
		if (WLOG) console.log("KeyboardManager Class Mounted!")
		this.nbKeyPressed = 0
		this.isKeyPressed = false
		this.playerDatas = playerdatas
		//this.Wactions = { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
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
		if (this.playerDatas.stats.hp > 0) {
			this.keys[WLANG].forEach(element => {// find if pressed key exist
				if (element.keycode === eventkeydown.keyCode) {
					this.playerDatas.actions = {
						goRight: (element.acting === "run") ? (element.facing === "right" ? true : false) : false,
						goLeft: (element.acting === "run") ? (element.facing === "left" ? true : false) : false,
						facing: (element.facing != "") ? element.facing : this.playerDatas.actions.facing,
						acting: (element.acting != "") ? element.acting : this.playerDatas.actions.acting,
						standing: (element.standing != "") ? element.standing : this.playerDatas.actions.standing,
					}
					if (element.whilepressed && this.nbKeyPressed < 1) {
						this.nbKeyPressed++
						this.set_isKeyPressed()
					}
					if (element.actionF) {
						Journey.set_Paused()
					}
					Journey.set_ActionsAndPlay(this.playerDatas.actions, this.isKeyPressed)
					this.set_acting()
				}
			});
		}
	}
	detectKeyUnPress(event) {
		if (this.playerDatas.stats.hp > 0) {
			if (event.code === "ArrowRight" || event.code === "KeyD") {
				this.playerDatas.actions.goRight = false
				this.playerDatas.actions.acting = ""
				this.playerDatas.actions.standing = "" // stand up when run
				if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
			}
			if (event.code === "ArrowLeft" || event.code === "KeyA") {
				this.playerDatas.actions.goLeft = false
				this.playerDatas.actions.acting = ""
				this.playerDatas.actions.standing = "" // stand up when run
				if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
			}
			if (event.code === "ControlLeft") {
				this.playerDatas.actions.acting = ""
				if (this.nbKeyPressed > 0) { this.nbKeyPressed-- }
			}
			// if (27 === event.keyCode) {
			// 	Journey.set_Paused()
			// }
			this.set_isKeyPressed()
			Journey.set_ActionsAndPlay(this.playerDatas.actions, this.isKeyPressed)
			this.set_acting()
		}
	}
	set_isKeyPressed() {
		if (this.nbKeyPressed === 0) {
			this.playerDatas.isKeyPressed = false
			if (this.playerDatas.actions.acting != "idle") {
				this.playerDatas.actions.acting = "idle"
			}
		}
		else if (this.nbKeyPressed > 0) {
			this.playerDatas.isKeyPressed = true
		}
		else {
			if (WLOG) console.log("error while counting pressed key !!!")
		}
		this.displayConsole(false)
	}
	set_acting() {
		if (this.playerDatas.isKeyPressed === false) {
			this.playerDatas.actions.acting = "idle"
		}
		else {
			if (this.playerDatas.actions.acting === "") {
				this.playerDatas.actions.acting = "idle"
			}
		}
		PLAYERDOM.setAttribute("class", this.playerDatas.actions.acting + " " + this.playerDatas.actions.facing + " " + this.playerDatas.actions.standing)
	}
	displayConsole() {
		document.getElementById("isKeyPressed").innerHTML = "isKeyPressed:" + (this.playerDatas.isKeyPressed ? "true" : "false");
		document.getElementById("nbKeyPressed").innerHTML = "nbKeyPressed:" + this.nbKeyPressed;
		document.getElementById("acting").innerHTML = "acting:" + this.playerDatas.actions.acting;
		document.getElementById("facing").innerHTML = "facing:" + this.playerDatas.actions.facing;
		document.getElementById("standing").innerHTML = "standing:" + this.playerDatas.actions.standing;
		document.getElementById("hp").innerHTML = "hp:" + this.playerDatas.stats.hp;
		document.getElementById("maxhp").innerHTML = "maxhp:" + this.playerDatas.stats.maxhp;
		document.getElementById("px").innerHTML = "playerx:" + parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) * this.playerDatas.display.displayratio)
		document.getElementById("py").innerHTML = "playery:" + parseInt((this.playerDatas.display.playery + this.playerDatas.display.defaultplayery) * this.playerDatas.display.displayratio)
	}
}
// display console on/off
CONSOLE.addEventListener('click', (e) => {
	CONSOLE.classList.contains('active')
		? CONSOLE.classList.remove('active')
		: CONSOLE.classList.add('active')
})
