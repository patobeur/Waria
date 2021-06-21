"use strict";
const PLAYERDOM = document.getElementById('player')
// ------------------------------------- PLAYER CLASS ---------------
class PlayerManager {
	constructor(playername, archetype, information) {
		this.Pplayername = playername
		this.Parchetype = archetype
		this.Pinformation = information
		this.PisPressedKey = false
		this.Pactions = { goRight: false, goLeft: false, facing: "", acting: "", standing: "" }
		if (WLOG) console.log("PlayerManager Class Mounted!")
		PLAYERDOM.style.left = 100 + "px"

	}
	set_Actions(actions, isPressedKey) {
		this.Pactions = actions
		this.PisPressedKey = isPressedKey
		// console.log(this.Pactions)
		this.get_acting()
	}
	set_Action(actionname, action, isPressedKey) {
		this.Pactions[actionname] = action
	}
	get_acting() {
		if (this.PisPressedKey === false) {
			this.Pactions.acting = "idle"
		}
		else {
			if (this.Pactions.acting === "") {
				this.Pactions.acting = "idle"
			}
		}
		PLAYERDOM.setAttribute("class", this.Pactions.acting + " " + this.Pactions.facing + " " + this.Pactions.standing)
	}
}
