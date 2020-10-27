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

var balanceStackActionNumber = 200;

var shouldFightSomeMap = function() {
	if (game.global.mapsActive)
		return false;
	
	if (game.challenges.Unbalance.balanceStacks > balanceStackActionNumber) {
		return true;
	}
	
//	if (game.global.lastClearedCell == 98 && game.challenges.Unbalance.balanceStacks > 0)
//		return true;
	
	if (game.global.lastClearedCell == 98 && game.global.soldierHealth == 0)
		return true;
	
//	if (game.global.mapBonus < 10)
//		return true;
		
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
		
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Any') == -1) {
			toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1) {
			toggleSetting('exitTo')
		}
	}
}, 1500);

