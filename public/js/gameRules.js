"use strict";

let Journey = new WariaGame("Waria", "Warrior", "what else !!")

window.onresize = (eventResize) => {
	Journey.getRatioAndResizeScreen(false) // Resize screen's elements
	Journey.Keyboard.refreshConsole()
};
