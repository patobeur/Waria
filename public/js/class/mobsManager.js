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

		this.mobsDatas = { mobs: [MOBS[0], MOBS[1]] }

		this.mobDivGenerator()
	}
	mobs_refresh() {
		let collide = false
		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			const element = this.mobsDatas.mobs[index];
			if (this.mobsDatas.mobs[index].x > this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) {
				this.mobsDatas.mobs[index].x = (this.mobsDatas.mobs[index].x - this.mobsDatas.mobs[index].speed)
				MOBSDOM.querySelector("#mob-" + index).style.left = (this.mobsDatas.mobs[index].x * this.playerDatas.display.displayratio) + PX
			}
			if (this.mobsDatas.mobs[index].x === this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx) {
				// colliding X return hit point
				collide = this.mobsDatas.mobs[index].hit
			}
		}
		return collide
	}
	mobDivGenerator() {
		for (let index = 0; index < this.mobsDatas.mobs.length; index++) {
			const element = this.mobsDatas.mobs[index];
			console.log(element)
			if (!element.spawned) {
				let mob = document.createElement('div')
				mob.id = 'mob-' + index
				mob.classList.add('mob')
				mob.style.position = "absolute"
				console.log(this.roadDatas)
				console.log(element.h)
				console.log(this.playerDatas.display.displayratio)
				mob.style.top = parseInt((this.roadDatas.floorY - element.h) * this.playerDatas.display.displayratio) + PX
				mob.style.left = (element.x * this.playerDatas.display.displayratio) + PX
				mob.style.width = (element.w * this.playerDatas.display.displayratio) + PX
				mob.style.height = (element.h * this.playerDatas.display.displayratio) + PX
				mob.style.backgroundImage = "url(" + MOBIMGPATH + element.bgimg + ")"
				MOBSDOM.prepend(mob)
			}
		}
	}
}
