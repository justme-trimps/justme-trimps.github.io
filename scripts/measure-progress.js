var tmpInterval;
var lastClearedBwCell = -1;

if (typeof(tmpInterval) !== "undefined" && tmpInterval != null) { clearInterval(tmpInterval); tmpInterval = null; }
tmpInterval = setInterval(function() {
	var name = game.global.mapsOwnedArray.filter(function(map) { return map.id == game.global.currentMapId;})[0].name;
	if (name && name.indexOf("Bionic") > -1) {
		if (game.global.lastClearedMapCell != lastClearedBwCell) {
			lastClearedBwCell = game.global.lastClearedMapCell;
			
			console.log(name + ", cell " + (lastClearedBwCell +2) + ": " + document.getElementById('portalTime').innerText);
		}
	}
}, 1000);
