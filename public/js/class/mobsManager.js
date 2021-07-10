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


		let hpmobbar = document.createElement('div')
		hpmobbar.style.width = "100%"
		hpmobbar.classList.add('mobhp')
		mob.prepend(hpmobbar)
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

			let THEFORCEBEWITHYOU = this.WTFmobsDatas.mobs[index]
			if (THEFORCEBEWITHYOU.out === false && THEFORCEBEWITHYOU.hp > 0) {
				// comment gerer la marge ???
				let marge = (((THEFORCEBEWITHYOU.w / 1.5)))// + (THEFORCEBEWITHYOU.w * index * actualRatio)
				// let actualMobX = parseInt(THEFORCEBEWITHYOU.x * actualRatio)
				// let actualMode = THEFORCEBEWITHYOU.mode

				let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))

				//this.mobs_refreshMobInfoDiv(index)

				if (this.playerDatas.actions.acting === "attack") {
					// console.log(this.playerDatas.actions.acting)
					marge = THEFORCEBEWITHYOU.w + this.playerDatas.display.OriginalPlayerW
				}
				let distanceContact = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx + marge)
				let distanceHorsPortee = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)

				// if mob is not out
				// -----------------------
				// this need to be refactored ;(
				// monkey business ;()
				// -----------------------
				if (THEFORCEBEWITHYOU.out === false) {
					let playeract = this.playerDatas.actions.acting
					// stop runningmob in front of player
					if (this.playerDatas.stats.hp < 1) {
						if (THEFORCEBEWITHYOU.mode > 1 &&
							THEFORCEBEWITHYOU.x >= 500 &&
							mobsToRemove.length < this.WTFmobsDatas.mobs.length
						) {
							THEFORCEBEWITHYOU.mode = 3
							mobsToRemove.push([index, "#mob-" + (index)])
						}
						else {
							THEFORCEBEWITHYOU.mode = 2
						}
					}
					// hit and swing
					else if (THEFORCEBEWITHYOU.x <= distanceContact
						&& THEFORCEBEWITHYOU.x > distanceHorsPortee
					) {
						THEFORCEBEWITHYOU.mode = 1
					}
					// to far to hit ? then run again
					else if (THEFORCEBEWITHYOU.x < distanceHorsPortee
						&& THEFORCEBEWITHYOU.mode === 1) {
						THEFORCEBEWITHYOU.mode = 0
					}
					else if (THEFORCEBEWITHYOU.x > distanceContact) {
						THEFORCEBEWITHYOU.mode = 0
					}

					// MODE RULES
					// ----------------
					if (THEFORCEBEWITHYOU.mode === 0) {
						THEFORCEBEWITHYOU.x = parseInt(THEFORCEBEWITHYOU.x - (THEFORCEBEWITHYOU.speed))
						MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(THEFORCEBEWITHYOU.x * actualRatio) + PX
						MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + THEFORCEBEWITHYOU.name + "/run_l.gif)"

						// teleporte to end right when run out left side
						if (THEFORCEBEWITHYOU.x < -200) {
							THEFORCEBEWITHYOU.x = 2500//(this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
						}
					}
					if (THEFORCEBEWITHYOU.mode === 1) {
						MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + THEFORCEBEWITHYOU.name + "/attack_l.gif)"

						// COLLIDING HEALTH LOSS
						// --
						if (THEFORCEBEWITHYOU.x > actualPlayerX && THEFORCEBEWITHYOU.x < actualPlayerX + (THEFORCEBEWITHYOU.w / 1.5)) {//this.playerDatas.display.defaultplayerx) {

							// ------------------------------------------
							// getting damages
							// ------------------------------------------
							if (this.playerDatas.actions.acting === "attack") {
								// console.log(this.playerDatas.actions.acting)
								THEFORCEBEWITHYOU.hp -= this.playerDatas.stats.basehit

							}
							if (THEFORCEBEWITHYOU.hp <= 0) {
								MOBSDOM.querySelector("#mob-" + index + " .mobhp").style.width = "0%"
								MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + THEFORCEBEWITHYOU.name + "/death.png)"
								THEFORCEBEWITHYOU.mode === 3
							}
							// ------------------------------------------
							// colliding X return hit point
							// ------------------------------------------
							collide = HEALTHLOSS ? THEFORCEBEWITHYOU.hit : 0
						}
					}
					if (THEFORCEBEWITHYOU.mode === 2) {
						THEFORCEBEWITHYOU.x = parseInt(THEFORCEBEWITHYOU.x + (THEFORCEBEWITHYOU.speed))
						MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(THEFORCEBEWITHYOU.x * actualRatio) + PX
						MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + THEFORCEBEWITHYOU.name + "/run.gif)"
					}
					if (THEFORCEBEWITHYOU.mode === 3) {

					}
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
