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

		this.mobsDatas = {
			mobs: [
				MOBS[0],
				MOBS[1],
				MOBS[0]
			]
		}
		// this.mobsDatas = LEVELMOBS[0]
		this.mobDivGenerator()
	}
	mobs_refresh() {
		let collide = false
		let actualRatio = this.playerDatas.display.displayratio
		let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) * actualRatio)
		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			const element = this.mobsDatas.mobs[index];
			let actualMobX = parseInt(this.mobsDatas.mobs[index].x * actualRatio)
			let actualMode = this.mobsDatas.mobs[index].mode

			// margin mob in front of player
			let marge = (this.mobsDatas.mobs[index].w * actualRatio)// + (this.mobsDatas.mobs[index].w * index * actualRatio)

			//  MODE RULES
			if (actualMode === 0) {
				if (actualMobX >= actualPlayerX + ((index + 1) * marge)) {
					// update mobx
					this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
					// move div mob
					MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX

				}
				if (actualMobX < actualPlayerX + marge + 20) {
					actualMode = 1
					this.mobsDatas.mobs[index].mode = 1
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
				}
			}
			else if (actualMode === 1) {
				MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"
				// 	// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
				// 	//move mob
				// this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
				// not at the right place ???
				// MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX
				// MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "attack.gif" + ")"

				if (this.mobsDatas.mobs[index].x < actualPlayerX) {
					actualMode = 2
					this.mobsDatas.mobs[index].mode = 2
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
				}
				if (this.mobsDatas.mobs[index].x > actualPlayerX + marge) {
					actualMode = 0
					this.mobsDatas.mobs[index].mode = 0
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
				}
			}
			else if (actualMode === 2) {
				// 	// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
				// 	//move mob
				this.mobsDatas.mobs[index].x = parseInt(this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
				// not at the right place ???
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.mobsDatas.mobs[index].x) + PX

				if (this.mobsDatas.mobs[index].x < (0 - this.mobsDatas.mobs[index].w)) {
					actualMode = 3
					this.mobsDatas.mobs[index].mode = 3
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
				}
				if (this.mobsDatas.mobs[index].x > actualPlayerX + marge + 20) {
					actualMode = 0
					this.mobsDatas.mobs[index].mode = 0
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + "idle.gif" + ")"
				}
			}
			else if (actualMode === 3) {
				// if (actualMobX > ((this.mobsDatas.mobs[index].w * actualRatio))) {
				this.mobsDatas.mobs[index].x = 1000
				this.mobsDatas.mobs[index].mode = 0
				actualMobX = 1000
				actualMode = 0

			}
			this.mobsDatas.mobs[index].mode = actualMode
			MOBSDOM.querySelector("#mob-" + index).innerHTML = parseInt(this.mobsDatas.mobs[index].x * actualRatio) + PX + "/mode:" + this.mobsDatas.mobs[index].mode


			if (actualMobX > actualPlayerX && actualMobX < actualPlayerX + marge) {//this.playerDatas.display.defaultplayerx) {
				// colliding X return hit point
				// collide = this.mobsDatas.mobs[index].hit
			}
		}
		return collide
	}
	mobDivGenerator() {

		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			// this is bugged
			// console.log(this.mobsDatas.mobs[index].spawned)
			// if (!this.mobsDatas.mobs[index].spawned) {
			this.creatediv(this.mobsDatas.mobs[index], index)
			// }
		}
	}
	creatediv(element, nbmob) {
		let mob = document.createElement('div')
		mob.id = 'mob-' + nbmob
		mob.setAttribute("data-mob", element.name)
		mob.classList.add('mob')
		mob.style.position = "absolute"
		// console.log(this.roadDatas)
		// console.log(element.h)
		// console.log(this.playerDatas.display.displayratio)
		mob.style.top = parseInt((this.roadDatas.floorY - element.h) * this.playerDatas.display.displayratio) + PX
		mob.style.left = (element.x * this.playerDatas.display.displayratio) + PX
		mob.style.width = (element.w * this.playerDatas.display.displayratio) + PX
		mob.style.height = (element.h * this.playerDatas.display.displayratio) + PX
		mob.style.backgroundImage = "url(" + MOBIMGPATH + element.bgimg + ")"
		MOBSDOM.prepend(mob)
		// BUGUED
		// this.mobsDatas.mobs[nbmob].spawned = true
	}
}
