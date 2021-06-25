"use strict";
const WLOG = true;
const WLANG = 'fr_FR';
const WVERS = 'alpha.0.2';
const REFRESHINTERV = 2000 // microsec interval refresh

let Journey = new WariaGame("Waria", "Warrior", "what else !!")

window.onresize = (eventResize) => {
	Journey.Screen.getRatioAndResizeScreen() // Resize screen's elements
};
