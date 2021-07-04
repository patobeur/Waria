"use strict";
class MobsManager {
	constructor(roaddatas, playerdatas) {
		if (WLOG) console.log("MobsManager Class Mounted!")
		// local Datas
		this.nbRefreshAfterDeath = 50
		this.counterRefreshAfterDeath = 0
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
		console.log('creation de div')
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


	mobs_refresh_ifMobs() {
		if (this.counterRefreshAfterDeath < this.nbRefreshAfterDeath) {
			console.log('mobs_refresh')
			return this.mobs_refresh()
		}
		return false;
	}
	mobs_refresh() {
		let actualRatio = this.playerDatas.display.displayratio
		let collide = false
		let mobsToRemove = [] // despawn : stacking mobs to delete from "WTFmobsDatas.mobs" (will removing div)
		if (this.playerDatas.stats.hp < 1) {
			this.counterRefreshAfterDeath++
		}
		for (let index = 0; index < this.WTFmobsDatas.mobs.length; index++) {
			// comment gerer la marge ???
			let marge = (((this.WTFmobsDatas.mobs[index].w / 1.5)))// + (this.WTFmobsDatas.mobs[index].w * index * actualRatio)
			// let actualMobX = parseInt(this.WTFmobsDatas.mobs[index].x * actualRatio)
			// let actualMode = this.WTFmobsDatas.mobs[index].mode
			let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

			//this.mobs_refreshMobInfoDiv(index)

			let distanceContact = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx + marge)
			let distanceHorsPortee = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)

			// if mob is not out
			// -----------------------
			// this need to be refactored ;(
			// monkey business ;()
			// -----------------------
			if (this.WTFmobsDatas.mobs[index].out === false) {
				// stop runningmob in front of player
				if (this.playerDatas.stats.hp < 1) {
					if (this.WTFmobsDatas.mobs[index].mode > 1 &&
						this.WTFmobsDatas.mobs[index].x >= 1000 &&
						mobsToRemove.length < this.WTFmobsDatas.mobs.length
					) {
						this.WTFmobsDatas.mobs[index].mode = 3
						mobsToRemove.push([index, "#mob-" + (index)])
					}
					else {
						this.WTFmobsDatas.mobs[index].mode = 2
					}
				}
				// hit and swing
				else if (this.WTFmobsDatas.mobs[index].x <= distanceContact
					&& this.WTFmobsDatas.mobs[index].x > distanceHorsPortee
				) {
					this.WTFmobsDatas.mobs[index].mode = 1
				}
				// to far to hit ? then run again
				else if (this.WTFmobsDatas.mobs[index].x < distanceHorsPortee
					&& this.WTFmobsDatas.mobs[index].mode === 1) {
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
				if (this.WTFmobsDatas.mobs[index].mode === 3) {

				}
			}
		} // end for

		// if (mobsToRemove.length >= 1) {
		// 	console.log(mobsToRemove)
		// 	console.log(this.WTFmobsDatas.mobs)
		// 	for (let ref = 0; ref < mobsToRemove.length; ref++) {
		// 		console.log("remove id:" + mobsToRemove[ref][0] + " class:" + mobsToRemove[ref][1])
		// 		MOBSDOM.querySelector(mobsToRemove[ref][1]).remove
		// 		// console.log(this.WTFmobsDatas.mobs)
		// 		delete this.WTFmobsDatas.mobs[mobsToRemove[ref][1]]
		// 		// console.log(this.WTFmobsDatas.mobs)
		// 		// refreshmob will stop when all mobs despawn
		// 	}
		// 	mobsToRemove.length = 0
		// }
		return collide
	}
}
