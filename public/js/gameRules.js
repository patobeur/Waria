"use strict";
const WLOG = true; // console.log actif
const WLANG = 'fr_FR';
const WVERS = 'alpha.0.2';

let NewGame = new WariaGame("Waria", "Warrior", "what else !!")

// Calculate the viewport size
window.onresize = (eventResize) => { NewGame.Screen.calcWinSizeRatio() };
