var tmpInterval;
var lastClearedBwCell = -1;

if (typeof(tmpInterval) !== "undefined" && tmpInterval != null) { clearInterval(tmpInterval); tmpInterval = null; }
tmpInterval = setInterval(function() {
	if (game.global.lastClearedMapCell != lastClearedBwCell) {
		lastClearedBwCell = game.global.lastClearedMapCell;
		console.log(lastClearedBwCell + ": " + document.getElementById('portalTime').innerText);
	}
}, 1000);
