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


var getStacksNumber = function() {
	if (document.getElementById('balanceStack')) {
		return parseInt(document.getElementById('balanceStack').innerText);
	}
	return 0;
}

var shouldFightSomeMap = function() {
	if (game.global.mapsActive)
		return false;
	
	if (getStacksNumber() > 19) {
		return true;
	}
	
	if (game.global.lastClearedCell == 98 && getStacksNumber() > 0)
		return true;
	
	if (game.global.lastClearedCell == 98 && game.global.soldierHealth == 0)
		return true;
	
	if (game.global.mapBonus < 10)
		return true;
		
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
		
		buyMap();
		
		runMap();
		fightManual();
		
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1) {
			toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1) {
			toggleSetting('exitTo')
		}
	}
}, 1500);

