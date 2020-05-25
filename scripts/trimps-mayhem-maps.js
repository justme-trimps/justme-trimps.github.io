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

var dontMap = false;
var minStacks = 0;
var plus = 0;

var getStacksNumber = function() {
	if (document.getElementById('gammaStack')) {
		return parseInt(document.getElementById('gammaStack').innerText);
	}
	return 0;
}

var shouldFightSomeMap = function() {
	if (game.global.lastClearedCell < 20)
		return false;

	if (game.global.world < 60)
		return false;
	
	if (dontMap || game.global.mapsActive)
		return false;
	
	if (getStacksNumber() > minStacks) {
		return true;
	}
	
	return false;
}

if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();
		
		recycleBelow(true);

		document.getElementById("advSpecialSelect").value = "lmc";
		
		if (game.global.playerGathering == "wood") {
			document.getElementById("advSpecialSelect").value = "lwc";
		} else if (game.global.playerGathering == "food") {
			document.getElementById("advSpecialSelect").value = "lsc";
		} 
		
		if (plus)
			document.getElementById("advExtraLevelSelect").value = "" + plus;
		
		buyMap();
		
		runMap();
		fightManual();
		
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1) {
			toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1) {
			toggleSetting('exitTo')
		}
	}
}, 10000);

if (restartMapInterval) { clearInterval(restartMapInterval); restartMapInterval = null; }
var restartMapInterval = setInterval(function() { 
	if (getStacksNumber() > minStacks) {
		return;
	}
	while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1) {
		toggleSetting('repeatUntil');
	}
}, 4999);

