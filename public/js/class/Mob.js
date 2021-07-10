"use strict";

class Mob {
	constructor(x, name, spawned, triggerx, posx, aoe, hp, hpmax, h, w, speed, xp, hit, mode, bgimg, out, delay) {
		this.x = x,  // starting x pos
			this.name = name, // mob name
			this.spawned = spawned, // become true if spawned
			this.triggerx = triggerx, // when x = triggerx something is trigered.. or not
			this.posx = [...posx], // range x spawning
			this.aoe = aoe, // area of effect, hurting distance in pixels ( must be ratio converted )
			this.hp = hp, // hit points
			this.hpmax = hpmax, // hit points
			this.h = h, // div heigth ( ratio converted )
			this.w = w, // div width ( ratio converted )
			this.speed = speed, // pixel to move each scene iteration
			this.xp = xp, // player's xp win when mob die
			this.hit = hit, // hit damage to player
			this.mode = mode, // 0: run to player , 1: stick to player, 2 hurt, 3 run to end road, 4 run back at player death
			this.bgimg = bgimg, // default background img idle
			this.out = out, // despawn if true
			this.delay = delay // delay between hits
	}
}
