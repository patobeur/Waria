"use strict";
class MobsManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("MobsManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.roadDatas = roaddatas
		this.mobsDatasLOCAL = LEVELMOBS[this.playerDatas.roadlv]
		this.mobDivGenerator()
	}
	mobDivGenerator() {
		if (WDEV) console.log('mobDivGenerator:' + this.mobsDatasLOCAL.mobs.length + " mobs")

		if (WDEV) console.log("------------- DISPLAY INITIAL LEVELMOBS -------------")
		for (let index = 0; index < this.mobsDatasLOCAL.mobs.length; index++) {
			if (WDEV) console.log(this.mobsDatasLOCAL.mobs[index])
		}

		if (WDEV) console.log("------------- replace x by alea from 300 to 500  -------------")
		for (let index = 0; index < this.mobsDatasLOCAL.mobs.length; index++) {
			let aleaX = this.aleaEntreBornes(300, 500)
			this.mobsDatasLOCAL.mobs[index].x = aleaX
			if (WDEV) console.log('--- before -- MobX:' + index + " " + this.mobsDatasLOCAL.mobs[index].x + " -> (Newalea=" + aleaX + ")")
			// this.creatediv(index, aleaX)
		}

		if (WDEV) console.log("------------- DISPLAY DONE LEVELMOBS  -------------")
		for (let index = 0; index < this.mobsDatasLOCAL.mobs.length; index++) {
			if (WDEV) console.log('--- after --- MobX:' + index + " -> " + this.mobsDatasLOCAL.mobs[index].x)
		}
		for (let index = 0; index <= this.mobsDatasLOCAL.mobs.length; index++) {
		}
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
	creatediv(index, aleaX) {
		// console.log(parseInt(this.mobsDatasLOCAL.mobs[index].x * this.playerDatas.display.displayratio) + PX)
		if (WDEV) console.log("------------- creatediv  -------------")
		if (WDEV) console.log((this.mobsDatasLOCAL.mobs[index]))
		let mob = document.createElement('div')
		mob.id = 'mob-' + index
		mob.setAttribute("data-mob", this.mobsDatasLOCAL.mobs[index].name)
		mob.classList.add('mob')
		mob.style.position = "absolute"
		mob.style.top = parseInt((this.roadDatas.floorY - this.mobsDatasLOCAL.mobs[index].h) * this.playerDatas.display.displayratio) + PX

		let newposX = parseInt((aleaX * this.playerDatas.display.displayratio))
		mob.style.left = newposX + PX
		mob.style.width = parseInt(this.mobsDatasLOCAL.mobs[index].w * this.playerDatas.display.displayratio) + PX
		mob.style.height = parseInt(this.mobsDatasLOCAL.mobs[index].h * this.playerDatas.display.displayratio) + PX
		mob.style.backgroundImage = "url(" + MOBIMGPATH + this.mobsDatasLOCAL.mobs[index].bgimg + ")"
		MOBSDOM.prepend(mob)
		if (WDEV) console.log('mob:' + index)
		if (WDEV) console.log(this.mobsDatasLOCAL.mobs[index])
		// BUGUED
		// this.mobsDatasLOCAL.mobs[index].spawned = true
	}
	mobs_refresh() {
		let collide = false
		let actualRatio = this.playerDatas.display.displayratio
		//let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

		for (let index = 0; index < this.mobsDatasLOCAL.mobs.length; index++) {
			// let actualMobX = parseInt(this.mobsDatasLOCAL.mobs[index].x * actualRatio)
			// let actualMode = this.mobsDatasLOCAL.mobs[index].mode


			MOBSDOM.querySelector("#mob-" + index).innerHTML = "#:" + index + "<br/>" +
				parseInt(this.mobsDatasLOCAL.mobs[index].x) + PX +
				"<br/>mode:" + this.mobsDatasLOCAL.mobs[index].mode + "<br/>P:" +
				parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * actualRatio)

			if (this.mobsDatasLOCAL.mobs[index].x >
				(
					this.playerDatas.display.playerx
					+ this.playerDatas.display.defaultplayerx
					+ (this.mobsDatasLOCAL.mobs[index].w / 2)
				)
			) {
				// margin mob in front of player
				let marge = ((this.mobsDatasLOCAL.mobs[index].w * actualRatio))// + (this.mobsDatasLOCAL.mobs[index].w * index * actualRatio)

				// this.mobsDatasLOCAL.mobs[index].x = parseInt(this.mobsDatasLOCAL.mobs[index].x - (this.mobsDatasLOCAL.mobs[index].speed))
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatasLOCAL.mobs[index].x * actualRatio) + PX
				// teleporte to end right when run out left side
				if (this.mobsDatasLOCAL.mobs[index].x < -200) {
					this.mobsDatasLOCAL.mobs[index].x = (this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
				}
			}
			//  MODE RULES
			if (this.mobsDatasLOCAL.mobs[index].mode === 0) {

			}


			// if (this.mobsDatasLOCAL.mobs[index].mode === 0) {

			// 	if (this.mobsDatasLOCAL.mobs[index].x >= (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)) {
			// 		// update mobsDatasLOCAL x pos
			// 		this.mobsDatasLOCAL.mobs[index].x = parseInt(this.mobsDatasLOCAL.mobs[index].x - this.mobsDatasLOCAL.mobs[index].speed)
			// 		// move div mob
			// 		MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatasLOCAL.mobs[index].x) + PX

			// 	}
			// 	// if (
			// 	// 	actualMobX === (actualPlayerX + (marge * 1))
			// 	// 	&& actualMobX < (actualPlayerX + (marge * 1) + marge)
			// 	// ) {
			// 	// 	actualMode = 1
			// 	// 	this.mobsDatasLOCAL.mobs[index].mode = 1
			// 	// 	MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
			// 	// }
			// 	}
			// 	else if (actualMode === 1) {
			// 		MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
			// 		// 	// if (actualMobX > ((this.mobsDatasLOCAL.mobs[index].w * actualRatio))) {
			// 		// 	//move mob
			// 		// this.mobsDatasLOCAL.mobs[index].x = parseInt(this.mobsDatasLOCAL.mobs[index].x - this.mobsDatasLOCAL.mobs[index].speed)
			// 		// not at the right place ???
			// 		// MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatasLOCAL.mobs[index].x) + PX
			// 		// MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"

			// 		if (this.mobsDatasLOCAL.mobs[index].x < actualPlayerX) {
			// 			actualMode = 2
			// 			this.mobsDatasLOCAL.mobs[index].mode = 2
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 		if (this.mobsDatasLOCAL.mobs[index].x > actualPlayerX + marge) {
			// 			actualMode = 0
			// 			this.mobsDatasLOCAL.mobs[index].mode = 0
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 	}
			// 	else if (actualMode === 2) {
			// 		// 	// if (actualMobX > ((this.mobsDatasLOCAL.mobs[index].w * actualRatio))) {
			// 		// 	//move mob
			// 		this.mobsDatasLOCAL.mobs[index].x = parseInt(this.mobsDatasLOCAL.mobs[index].x - this.mobsDatasLOCAL.mobs[index].speed)
			// 		// not at the right place ???
			// 		MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatasLOCAL.mobs[index].x) + PX

			// 		if (this.mobsDatasLOCAL.mobs[index].x < (0 - this.mobsDatasLOCAL.mobs[index].w)) {
			// 			actualMode = 3
			// 			this.mobsDatasLOCAL.mobs[index].mode = 3
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 		if (this.mobsDatasLOCAL.mobs[index].x > actualPlayerX + marge + 20) {
			// 			actualMode = 0
			// 			this.mobsDatasLOCAL.mobs[index].mode = 0
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 	}
			// 	else if (actualMode === 3) {
			// 	// if (actualMobX > ((this.mobsDatasLOCAL.mobs[index].w * actualRatio))) {
			// 	this.mobsDatasLOCAL.mobs[index].x = this.mobsDatasLOCAL.mobs[index].psx[1]
			// 	this.mobsDatasLOCAL.mobs[index].mode = 0
			// 	actualMobX = 1000
			// 	actualMode = 0

			// }

			// if (actualMobX > actualPlayerX && actualMobX < actualPlayerX + marge) {//this.playerDatas.display.defaultplayerx) {
			// 	// colliding X return hit point
			// 	// collide = this.mobsDatasLOCAL.mobs[index].hit
			// }


			// this.mobsDatasLOCAL.mobs[index].mode = actualMode
		}
		return collide
	}
}
