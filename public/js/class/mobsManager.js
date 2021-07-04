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
		mob.style.backgroundImage = "url(" + MOBIMGPATH + this.WTFmobsDatas.mobs[index].name + "/" + this.WTFmobsDatas.mobs[index].bgimg + ")"
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
		console.log('mobs_refresh')
		let actualRatio = this.playerDatas.display.displayratio
		let collide = false
		let mobsToRemove = []
		for (let index = 0; index < this.WTFmobsDatas.mobs.length; index++) {
			// comment gerer la marge ???
			let marge = (((this.WTFmobsDatas.mobs[index].w / 1.5)))// + (this.WTFmobsDatas.mobs[index].w * index * actualRatio)
			// let actualMobX = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio)
			// let actualMode = this.WTFmobsDatas.mobs[index].mode
			let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

			//this.mobs_refreshMobInfoDiv(index)

			let distanceContact = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx + marge)
			let distanceHorsPortee = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)
			// stop runningmob in front of player
			if (this.playerDatas.stats.hp < 1) {
				if (this.WTFmobsDatas.mobs[index].mode === 2 &&
					this.WTFmobsDatas.mobs[index].x >= 1000 &&
					mobsToRemove.length < this.WTFmobsDatas.mobs.length) {
					mobsToRemove.push(index)
				}
				else {
					this.WTFmobsDatas.mobs[index].mode = 2
				}
			}
			else if (this.WTFmobsDatas.mobs[index].x <= distanceContact
				&& this.WTFmobsDatas.mobs[index].x > distanceHorsPortee
			) {
				this.WTFmobsDatas.mobs[index].mode = 1
			}
			else if (this.WTFmobsDatas.mobs[index].x < distanceHorsPortee) {
				this.WTFmobsDatas.mobs[index].mode = 0
			}
			else if (this.WTFmobsDatas.mobs[index].x > distanceContact) {
				this.WTFmobsDatas.mobs[index].mode = 0
			}


			//  MODE RULES
			if (this.WTFmobsDatas.mobs[index].mode === 0) {
				this.WTFmobsDatas.mobs[index].x = parseInt(this.WTFmobsDatas.mobs[index].x - (this.WTFmobsDatas.mobs[index].speed))
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio) + PX
				MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + this.WTFmobsDatas.mobs[index].name + "/run_l.gif)"

				// teleporte to end right when run out left side
				if (this.WTFmobsDatas.mobs[index].x < -200) {
					this.WTFmobsDatas.mobs[index].x = 2500//(this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
				}
			}
			if (this.WTFmobsDatas.mobs[index].mode === 1) {
				MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + this.WTFmobsDatas.mobs[index].name + "/attack_l.gif)"

				// COLLIDING HEALTH LOSS
				// --
				if (this.WTFmobsDatas.mobs[index].x > actualPlayerX && this.WTFmobsDatas.mobs[index].x < actualPlayerX + marge) {//this.playerDatas.display.defaultplayerx) {
					// colliding X return hit point
					collide = HEALTHLOSS ? this.WTFmobsDatas.mobs[index].hit : 0
				}
			}
			if (this.WTFmobsDatas.mobs[index].mode === 2) {
				this.WTFmobsDatas.mobs[index].x = parseInt(this.WTFmobsDatas.mobs[index].x + (this.WTFmobsDatas.mobs[index].speed))
				MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio) + PX
				MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + this.WTFmobsDatas.mobs[index].name + "/run.gif)"

			}
		}

		if (mobsToRemove.length > 0) {
			for (let index2 = 0; index2 < mobsToRemove.length; index2++) {
				console.log("remove id:" + mobsToRemove[index2])
				MOBSDOM.querySelector("#mob-" + mobsToRemove[index2]).remove
				this.WTFmobsDatas.mobs.splice(mobsToRemove[index2], 1);
			}
			mobsToRemove = []
		}
		return collide
	}
}
