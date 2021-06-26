"use strict";

let Journey = new WariaGame("Waria", "Warrior", "what else !!")

window.onresize = (eventResize) => {
	Journey.Screen.getRatioAndResizeScreen() // Resize screen's elements
};
