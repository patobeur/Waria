"use strict";
class MobsManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("MobsManager Class Mounted!")
		// local Datas
		this.playerDatas = playerdatas
		this.roadDatas = roaddatas
		this.WTFmobsDatas = LEVELMOBS[this.playerDatas.roadlv]
		this.mobDivGenerator()
	}
	mobDivGenerator() {
		for (let index = 0; index < this.WTFmobsDatas.mobs.length; index++) {
			let NewAlea = this.aleaEntreBornes(500, 1500);
			console.log("ff" + this.WTFmobsDatas.mobs[index].x)
			this.WTFmobsDatas.mobs[index].x = NewAlea;
			this.creatediv(index, NewAlea)
		}
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	}
	creatediv(index, aleaX) {
		let mob = document.createElement('div')
		mob.id = 'mob-' + index
		mob.setAttribute("data-mob", this.WTFmobsDatas.mobs[index].name)
		mob.classList.add('mob')
		mob.style.position = "absolute"
		mob.style.top = parseInt((this.roadDatas.floorY - this.WTFmobsDatas.mobs[index].h) * this.playerDatas.display.displayratio) + PX

		let newposX = parseInt((aleaX * this.playerDatas.display.displayratio))
		mob.style.left = newposX + PX
		mob.style.width = parseInt(this.WTFmobsDatas.mobs[index].w * this.playerDatas.display.displayratio) + PX
		mob.style.height = parseInt(this.WTFmobsDatas.mobs[index].h * this.playerDatas.display.displayratio) + PX
		mob.style.backgroundImage = "url(" + MOBIMGPATH + this.WTFmobsDatas.mobs[index].bgimg + ")"
		MOBSDOM.prepend(mob)

		this.WTFmobsDatas.mobs[index].spawned = true
	}


	mobs_refreshMobInfoDiv(ref) {
		MOBSDOM.querySelector("#mob-" + ref).innerHTML = "#:" + ref + "<br/>" +
			parseInt(this.WTFmobsDatas.mobs[ref].x) + PX +
			"<br/>mode:" + this.WTFmobsDatas.mobs[ref].mode + "<br/>P:" +
			parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * this.playerDatas.display.displayratio)
	}


	mobs_refresh() {
		let actualRatio = this.playerDatas.display.displayratio
		let collide = false
		for (let index = 0; index < this.WTFmobsDatas.mobs.length; index++) {
			let marge = (((this.WTFmobsDatas.mobs[index].w / 2)))// + (this.WTFmobsDatas.mobs[index].w * index * actualRatio)
			// let actualMobX = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio)
			// let actualMode = this.WTFmobsDatas.mobs[index].mode
			let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

			//this.mobs_refreshMobInfoDiv(index)


			// stop runningmob in front of player
			if (this.WTFmobsDatas.mobs[index].x > (
				this.playerDatas.display.playerx
				+ this.playerDatas.display.defaultplayerx
				+ marge
			)) {

				this.WTFmobsDatas.mobs[index].x = parseInt(this.WTFmobsDatas.mobs[index].x - (this.WTFmobsDatas.mobs[index].speed))
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio) + PX
				// teleporte to end right when run out left side
				if (this.WTFmobsDatas.mobs[index].x < -200) {
					this.WTFmobsDatas.mobs[index].x = (this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
				}
			}

			//  MODE RULES
			// if (this.WTFmobsDatas.mobs[index].mode === 0) {
			// }
			// this.WTFmobsDatas.mobs[index].mode = actualMode

			if (this.WTFmobsDatas.mobs[index].x > actualPlayerX && this.WTFmobsDatas.mobs[index].x < actualPlayerX + marge) {//this.playerDatas.display.defaultplayerx) {
				// colliding X return hit point
				collide = this.WTFmobsDatas.mobs[index].hit
			}
		}
		return collide
	}
}
