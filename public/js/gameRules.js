"use strict";
const WLOG = true; // console.log actif
const WLANG = 'fr_FR';
const WVERS = 'alpha.0.2';
const REFRESHINTERV = 100 // microsec interval refresh

let Journey = new WariaGame("Waria", "Warrior", "what else !!")

// Calculate the viewport size
window.onresize = (eventResize) => { Journey.Screen.calcWinSizeRatio() };
