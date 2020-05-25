
var fixBoard = function() { 
	if (document.getElementById('fixxxer2'))
		return;
	
	if (document.getElementsByTagName("body").length) {
		var node = document.createElement("DIV");
		node.setAttribute("style", "position: absolute; width: 3000px; height: 3000px; left: 0; top: 0; z-index: 1000; background: white;"); 
		node.setAttribute("id", "fixxxer"); 
		document.getElementsByTagName("body")[0].appendChild(node);
		setTimeout(refixBoard, 2000);
	} else {
		setTimeout(fixBoard, 50);
	}
}

var refixBoard = function() {
	var settingsRow = document.getElementById("settingsRow");
	var fixxxer = document.getElementById("fixxxer");
	document.getElementsByTagName("body")[0].removeChild(fixxxer);
	var node = document.createElement("DIV");
	node.setAttribute("id", "fixxxer2"); 
	node.setAttribute("style", "height: 1500px;clear: both; overflow: hidden;");    
	document.getElementsByTagName("body")[0].appendChild(node);
	window.scrollTo(0, 3000);
	document.getElementsByTagName("body")[0].setAttribute("style", "background: #ddd; overflow-y: visible;"); 
	settingsRow.setAttribute("style", "position: relative"); 
}

fixBoard();
var autoExportSave = true;
var autoExportSaveFrequencyInMinutes = 2;

if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 60 * autoExportSaveFrequencyInMinutes);

var lastMapZone = 0;
var shouldFightSomeMap = function() {
	if (game.global.mapsActive)
		return false;
	
	if (game.global.mapBonus > 0)
		return false;
	
	if (game.global.world > 10 && game.global.world % 10 == 5 && game.global.world > lastMapZone)
		return true;
	
	return false;
}

if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		lastMapZone = game.global.world;
	}
}, 1200);


//TMP REMOVE
var lastEggMessage = ''
setInterval(function() {
	var eggCells = document.getElementsByClassName("eggCell");
	if (eggCells.length && eggCells[0].offsetParent != null) {
		eggCells[0].click();
		setTimeout(function() {
			if (document.getElementsByClassName("eggMessage").length && document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText != lastEggMessage) {
				lastEggMessage = document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText;
				if (lastEggMessage.indexOf("food!") === -1 && lastEggMessage.indexOf("wood!") === -1 && lastEggMessage.indexOf("metal!") === -1) {
					console.log(getPortalTime() + " " +lastEggMessage);
				}
			}
		}, 200);
	}
}, 1000)