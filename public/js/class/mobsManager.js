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


		let hpmobbarcont = document.createElement('div')
		// hpmobbarcont.style.width = "100%"
		hpmobbarcont.classList.add('hpmobbarcont')

		let hpmobbar = document.createElement('div')
		hpmobbar.style.width = "100%"
		hpmobbar.classList.add('mobhp')
		hpmobbarcont.prepend(hpmobbar)

		mob.prepend(hpmobbarcont)

		let infobar = document.createElement('div')
		infobar.style.width = "100%"
		infobar.classList.add('infomob')
		mob.prepend(infobar)
		MOBSDOM.prepend(mob)

		this.WTFmobsDatas.mobs[index].spawned = true
	}


	mobs_refreshMobInfoDiv(ref) {
		let encounter = false
		if (encounter = MOBSDOM.querySelector("#mob-" + ref + " .infomob")) {
			MOBSDOM.querySelector("#mob-" + ref + " .infomob").innerHTML = "#:" + ref +
				// "<br/>" + parseInt(this.WTFmobsDatas.mobs[ref].x) + PX +
				"<br/>Mode:" + this.WTFmobsDatas.mobs[ref].mode +
				// "<br/>P:" + parseInt((this.playerDatas.display.defaultplayerx + this.playerDatas.display.playerx) * this.playerDatas.display.displayratio) +
				"<br/>hp:" + this.WTFmobsDatas.mobs[ref].hp
		}
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

			let ENCOUNTER = this.WTFmobsDatas.mobs[index]
			if (ENCOUNTER.out === false && ENCOUNTER.hp > 0) {
				// comment gerer la marge ???
				let marge = (((ENCOUNTER.w / 1.5)))// + (ENCOUNTER.w * index * actualRatio)
				// let actualMobX = parseInt(ENCOUNTER.x * actualRatio)
				// let actualMode = ENCOUNTER.mode

				let actualPlayerX = parseInt((this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx))


				if (this.playerDatas.actions.acting === "attack") {
					// console.log(this.playerDatas.actions.acting)
					marge = ENCOUNTER.w + this.playerDatas.display.OriginalPlayerW
				}
				let distanceContact = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx + marge)
				let distanceHorsPortee = (this.playerDatas.display.playerx + this.playerDatas.display.defaultplayerx)

				// if mob is not out
				// -----------------------
				// this need to be refactorised ;(
				// monkey business ;()
				// -----------------------
				// if (ENCOUNTER.out === false) {
				let playeract = this.playerDatas.actions.acting

				// stop runningmob in front of player
				if (this.playerDatas.stats.hp < 1) {
					if (ENCOUNTER.mode > 1 &&
						ENCOUNTER.x >= 500 &&
						mobsToRemove.length < this.WTFmobsDatas.mobs.length
					) {
						ENCOUNTER.mode = 3 // run home
						mobsToRemove.push([index, "#mob-" + (index)])
					}
					else {
						ENCOUNTER.mode = 2
					}
				}
				// hit and swing
				else if (ENCOUNTER.x <= distanceContact
					&& ENCOUNTER.x > distanceHorsPortee
					&& ENCOUNTER.mode != 1
				) {
					ENCOUNTER.mode = 1
				}
				// to far to hit ? then idle if waria aggressive
				else if (ENCOUNTER.x < distanceHorsPortee
					&& ENCOUNTER.mode != 5
					&& ENCOUNTER.mode === this.playerDatas.actions.acting === "attack") {
					ENCOUNTER.mode = 5
				}
				// to far to hit and idle then run again if waria not aggressive
				else if (ENCOUNTER.x < distanceHorsPortee
					&& ENCOUNTER.mode === 5
					&& !(ENCOUNTER.mode === this.playerDatas.actions.acting === "attack")) {
					ENCOUNTER.mode = 0
				}
				// to far to hit ? then run again if waria not aggressive
				else if (ENCOUNTER.x < distanceHorsPortee
					&& ENCOUNTER.mode === 1
					&& !(ENCOUNTER.mode === this.playerDatas.actions.acting === "attack")) {
					ENCOUNTER.mode = 0
				}
				else if (ENCOUNTER.x > distanceContact) {
					ENCOUNTER.mode = 0
				}

				// MODE RULES
				// ----------------
				if (ENCOUNTER.mode === 0) {
					ENCOUNTER.x = parseInt(ENCOUNTER.x - (ENCOUNTER.speed)) // move left
					MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(ENCOUNTER.x * actualRatio) + PX
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/run_l.gif)"
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(0,255,0,.2)'

					// teleporte to end right when run out left side
					if (ENCOUNTER.x < -200) {
						ENCOUNTER.x = 2500//(this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
					}
				}
				if (ENCOUNTER.mode === 1) { //hit and swing
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/attack_l.gif)"
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(255,0,0,.2)'

					// COLLIDING HEALTH LOSS
					// --
					if (ENCOUNTER.x > actualPlayerX && ENCOUNTER.x < actualPlayerX + (ENCOUNTER.w / 1.5)) {//this.playerDatas.display.defaultplayerx) {

						// ------------------------------------------
						// getting damages
						// ------------------------------------------
						if (this.playerDatas.actions.acting === "attack") {
							// console.log(this.playerDatas.actions.acting)
							ENCOUNTER.hp -= this.playerDatas.stats.basehit
						}
						if (ENCOUNTER.hp <= 0) {
							MOBSDOM.querySelector("#mob-" + index + " .mobhp").style.width = "0%"
							MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/death.png)"
							MOBSDOM.querySelector("#mob-" + index + " .infomob").remove()
							ENCOUNTER.mode === 3 // mobs run home
						}
						// ------------------------------------------
						// colliding X return hit point
						// ------------------------------------------
						collide = HEALTHLOSS ? ENCOUNTER.hit : 0
					}
				}
				if (ENCOUNTER.mode === 2) { // move right
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(255,0,255,.2)'
					ENCOUNTER.x = parseInt(ENCOUNTER.x + (ENCOUNTER.speed)) // move right
					MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(ENCOUNTER.x * actualRatio) + PX
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/run.gif)"//,url(" + MOBIMGPATH + ENCOUNTER.name + "/idle.gif)"
				}
				if (ENCOUNTER.mode === 3) {
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(255,255,255,.2)'

				}
				if (ENCOUNTER.mode === 4) {
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(255,255,0,.2)'
					ENCOUNTER.x = parseInt(ENCOUNTER.x - (ENCOUNTER.speed)) // move left
					MOBSDOM.querySelector("#mob-" + index).style.left = parseInt(ENCOUNTER.x * actualRatio) + PX
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/run_l.gif)"

					// teleporte to end right when run out left side
					if (ENCOUNTER.x < -200) {
						ENCOUNTER.x = 2500//(this.roadDatas.nbpan * this.roadDatas.panW * actualRatio)
					}
				}
				if (ENCOUNTER.mode === 5) { // IDLE cause agressiv Waria
					MOBSDOM.querySelector("#mob-" + index).style.backgroundColor = 'rgba(0,255,255,.2)'
					MOBSDOM.querySelector("#mob-" + index).style.backgroundImage = "url(" + MOBIMGPATH + ENCOUNTER.name + "/idle.gif)"
				}

				this.mobs_refreshMobInfoDiv(index)
				// }
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
