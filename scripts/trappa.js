
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
var autoExportSaveFrequencyInMinutes = 0.25;

if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 60 * autoExportSaveFrequencyInMinutes);

var stopBuyingUpgrades = false;


if (buyUpgradesInterval) { clearInterval(buyUpgradesInterval); buyUpgradesInterval = null; }
var buyUpgradesInterval = setInterval(function() {
	if (stopBuyingUpgrades)
		return;
		
	var upgrades = document.getElementById('upgradesHere').getElementsByClassName('thingColorCanAfford');
	for (var i = upgrades.length - 1; i >= 0; i--) {
		var button = upgrades[i];
		if (button.getAttribute('id') !== 'Coordination')
			button.click();
	}
}, 3000);

var stopBuying = false;
if (buyBuildingsInterval) { clearInterval(buyBuildingsInterval); buyBuildingsInterval = null; }
var buyBuildingsInterval = setInterval(function() {
	if (stopBuying) return;
	
	buyBuilding("Hut");
	buyBuilding("House");
	buyBuilding("Mansion");
	buyBuilding("Hotel");
	buyBuilding("Resort");
	buyBuilding("Collector");
	buyBuilding("Tribute");
	
}, 50);

if (switchHeirloomInterval) { clearInterval(switchHeirloomInterval); switchHeirloomInterval = null; }