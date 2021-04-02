if (forcePortalInterval) { clearInterval(forcePortalInterval); forcePortalInterval = null; }
var forcePortalInterval = setInterval(function() {
	if (isOkToPortal()) {
		window.localStorage.setItem(shouldSaveLastZoneSave.name, serializeCookieValue());
		cancelTooltip();
		tooltip("Export", null, "update");
		document.getElementById("downloadLink").click();
		cancelTooltip();

		logFluffyExp();
		portalClicked();
		console.log("---");
		if (challengeToTry)
			selectChallenge(challengeToTry);
		activateClicked();
		activatePortal();
		wentForSmithy = false;
		setTimeout(function() {
			for (var i = 0; i < localStorageKeys.length; i++) {
				window.localStorage.setItem(localStorageKeys[i], "");
				window.localStorage.removeItem(localStorageKeys[i]);
			}
			pressFight();
			perksSet = false;
			
			if (!game.global.autoJobsSettingU2.enabled)
				toggleAutoJobs();
			
			mapMode = "lsc";
		}, 1000);
	}
}, 500);

var parseCookieValue = function(cookieName) {
	var cookieValue = window.localStorage.getItem(cookieName);
	
	if (cookieValue && cookieValue != "") {
		var splittedValue = cookieValue.split("###");
		return {
			saveString: 	splittedValue[0],
			reset: 			parseInt(splittedValue[1]),
			seconds: 		parseInt(splittedValue[2]),
			cell: 			parseInt(splittedValue[3]),
			tributes: 		parseInt(splittedValue[4]),
			voidMaps: 		parseInt(splittedValue[5]),
			metalOwned: 	parseFloat(splittedValue[6]),
			frenzyLeft: 	parseInt(splittedValue[7]),
			enemyHealth:	parseFloat(splittedValue[8]),
			mayhemStacks:	parseInt(splittedValue[9]),
			mapCell:		parseInt(splittedValue[10]),
			mapName:		splittedValue[11],
			mapEnemyHealth:	parseFloat(splittedValue[12]),
			smithiesOwned:	parseInt(splittedValue[13])
		};
	}
	
	return null;
}
