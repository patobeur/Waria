"use strict";
class MobsManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("MobsManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.roadDatas = roaddatas

		// this.nbmob = this.roadDatas.nbmob
		// this.ratio = this.playerDatas.display.displayratio
		// this.roadwidth = this.roadDatas.nbpan * this.roadDatas.panW

		// this.mobsDatas = {
		// 	mobs: [
		// 		MOBS[0],
		// 		MOBS[1],
		// 		MOBS[0]
		// 	]
		// }
		this.mobsDatas = LEVELMOBS[0]
		this.mobDivGenerator()
	}
	mobs_refresh() {
		let collide = false
		let actualRatio = this.playerDatas.display.displayratio
		let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			// let actualMobX = parseInt(this.mobsDatas.mobs[index].x * actualRatio)
			// let actualMode = this.mobsDatas.mobs[index].mode


			MOBSDOM.querySelector("#mob-" + index).innerHTML = parseInt(this.mobsDatas.mobs[index].x) + PX + "<br/>mode:" + this.mobsDatas.mobs[index].mode + "<br/>P:" + parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * actualRatio)

			if (this.mobsDatas.mobs[index].x >
				(
					this.playerDatas.display.playerx
					+ this.playerDatas.display.defaultplayerx
					+ (this.mobsDatas.mobs[index].w)
				)
			) {
				// margin mob in front of player
				let marge = ((this.mobsDatas.mobs[index].w * actualRatio))// + (this.mobsDatas.mobs[index].w * index * actualRatio)

				this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - (this.mobsDatas.mobs[index].speed))
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x * actualRatio) + PX
				if (this.mobsDatas.mobs[index].x < -200) { this.mobsDatas.mobs[index].x = (this.roadDatas.nbpan * this.roadDatas.panW * actualRatio) }
			}
			//  MODE RULES
			if (this.mobsDatas.mobs[index].mode === 0) {

			}


			// if (this.mobsDatas.mobs[index].mode === 0) {

			// 	if (this.mobsDatas.mobs[index].x >= (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)) {
			// 		// update mobsDatas x pos
			// 		this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
			// 		// move div mob
			// 		MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX

			// 	}
			// 	// if (
			// 	// 	actualMobX === (actualPlayerX + (marge * 1))
			// 	// 	&& actualMobX < (actualPlayerX + (marge * 1) + marge)
			// 	// ) {
			// 	// 	actualMode = 1
			// 	// 	this.mobsDatas.mobs[index].mode = 1
			// 	// 	MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
			// 	// }
			// 	}
			// 	else if (actualMode === 1) {
			// 		MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
			// 		// 	// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
			// 		// 	//move mob
			// 		// this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
			// 		// not at the right place ???
			// 		// MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX
			// 		// MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"

			// 		if (this.mobsDatas.mobs[index].x < actualPlayerX) {
			// 			actualMode = 2
			// 			this.mobsDatas.mobs[index].mode = 2
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 		if (this.mobsDatas.mobs[index].x > actualPlayerX + marge) {
			// 			actualMode = 0
			// 			this.mobsDatas.mobs[index].mode = 0
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 	}
			// 	else if (actualMode === 2) {
			// 		// 	// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
			// 		// 	//move mob
			// 		this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
			// 		// not at the right place ???
			// 		MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX

			// 		if (this.mobsDatas.mobs[index].x < (0 - this.mobsDatas.mobs[index].w)) {
			// 			actualMode = 3
			// 			this.mobsDatas.mobs[index].mode = 3
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 		if (this.mobsDatas.mobs[index].x > actualPlayerX + marge + 20) {
			// 			actualMode = 0
			// 			this.mobsDatas.mobs[index].mode = 0
			// 			MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
			// 		}
			// 	}
			// 	else if (actualMode === 3) {
			// 	// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
			// 	this.mobsDatas.mobs[index].x = this.mobsDatas.mobs[index].psx[1]
			// 	this.mobsDatas.mobs[index].mode = 0
			// 	actualMobX = 1000
			// 	actualMode = 0

			// }

			// if (actualMobX > actualPlayerX && actualMobX < actualPlayerX + marge) {//this.playerDatas.display.defaultplayerx) {
			// 	// colliding X return hit point
			// 	// collide = this.mobsDatas.mobs[index].hit
			// }


			// this.mobsDatas.mobs[index].mode = actualMode
		}
		return collide
	}
	mobDivGenerator() {

		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			// this is bugged
			// console.log(this.mobsDatas.mobs[index].spawned)
			// console.log("------------------")
			// console.log(this.playerDatas.display.playerx)
			// console.log(this.playerDatas.display.defaultplayerx)
			// console.log(this.roadDatas.panW)
			// console.log(this.playerDatas.display.displayratio)
			// if (!this.mobsDatas.mobs[index].spawned) {
			// let newMobx = parseInt(
			// 	(
			// 		this.playerDatas.display.playerx
			// 		+ this.playerDatas.display.defaultplayerx
			// 		+ this.roadDatas.panW
			// 		+ this.aleaEntreBornes(0, this.roadDatas.panW)
			// 	)
			// 	* this.playerDatas.display.displayratio
			// )
			// // console.log("newMobx:" + newMobx)
			// this.mobsDatas.mobs[index].x = newMobx
			this.creatediv(index)
			// }
		}
	}
	creatediv(index) {
		// console.log(parseInt(this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio) + PX)
		// console.log((this.mobsDatas.mobs[index]))
		let mob = document.createElement('div')
		mob.id = 'mob-' + index
		mob.setAttribute("data-mob", this.mobsDatas.mobs[index].name)
		mob.classList.add('mob')
		mob.style.position = "absolute"
		// console.log(this.roadDatas)
		// console.log(this.mobsDatas.mobs[index].h)
		// console.log(this.playerDatas.display.displayratio)
		mob.style.top = parseInt((this.roadDatas.floorY - this.mobsDatas.mobs[index].h) * this.playerDatas.display.displayratio) + PX

		this.mobsDatas.mobs[index].x = this.aleaEntreBornes(150, 1000)
		// console.log("left mob #" + index + ":" + parseInt(this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio))
		// console.log(index)
		console.log('kkk' + parseInt((this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio)) + PX)
		// console.log(this.playerDatas.display.displayratio)
		// this.mobsDatas.mobs[index].x = parseInt((this.mobsDatas.mobs[index].x) * this.playerDatas.display.displayratio) + PX
		mob.style.left = parseInt((this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio)) + PX

		mob.style.width = parseInt(this.mobsDatas.mobs[index].w * this.playerDatas.display.displayratio) + PX
		mob.style.height = parseInt(this.mobsDatas.mobs[index].h * this.playerDatas.display.displayratio) + PX
		mob.style.backgroundImage = "url(" + MOBIMGPATH + this.mobsDatas.mobs[index].bgimg + ")"
		MOBSDOM.prepend(mob)
		// BUGUED
		// this.mobsDatas.mobs[index].spawned = true
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
}
