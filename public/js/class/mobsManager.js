"use strict";
class MobsManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("MobsManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.roadDatas = roaddatas

		this.nbmob = this.roadDatas.nbmob
		this.ratio = this.playerDatas.display.displayratio
		this.roadwidth = this.roadDatas.nbpan * this.roadDatas.panW

		this.mobsDatas = { mobs: [MOBS[1], MOBS[2]] }
		// 1: { name: "lambdaMob", spawned: false, triggerx: 300, x: 400, aoe: 20, hp: 1, h: 88, w: 150, speed: 4, bgimg: "idle.gif" }

		console.log("----------------")
		console.log(this.mobsDatas)
		// console.log("player roadlv:" + this.playerDatas.roadlv)
		// console.log("player lv:" + this.playerDatas.lv)
		// console.log("this.nbmob:" + this.nbmob)
		// console.log("this.ratio:" + this.ratio)
		// console.log("this.roadwidth:" + this.roadwidth)
		this.mobDivGenerator()
	}
	mobs_refresh() {
		console.log(this.mobsDatas)
	}
	add_mobDiv() {
		console.log(this.mobsDatas)
	}
	mobDivGenerator() {
		console.log(this.mobsDatas.mobs)
		this.mobsDatas.mobs.forEach(element => {
			let nbm = 0
			if (!element.spawned) {
				nbm++
				let mob = document.createElement('div')
				mob.id = 'mob-' + nbm
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
		});
	}
}
