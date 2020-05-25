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
	if (game.global.lastClearedCell < 3)
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
		document.getElementById("advExtraLevelSelect").value = "1";
		
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
		
		while (document.getElementById('repeatBtn').innerHTML.indexOf('On') == -1) {
			repeatClicked()
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


function calculateDamageForMayhemImprobability() {
    var fluctuation = 0.5;
	var number = game.global.gridArray[99].attack;
	if (getPerkLevel("Equality")) number *= game.portal.Equality.getMult();
	number *= game.challenges.Mayhem.getBossMult();
	var min = Math.floor(number * (1 - fluctuation));
	var max = Math.ceil(number + (number * fluctuation));
	return [min, max];
}

var buyPortalUpgradeById = function(id) {
	var button = document.getElementById(id);
	if (button && button.offsetParent != null && button.getAttribute("class").indexOf("perkColorOn") > -1) {
		console.log("Buying: " + id);
		button.click();
	}
}

var buySingleEq = function() {
	cancelTooltip();
	viewPortalUpgrades();
	var portalUpgradesHere = document.getElementById('portalUpgradesHere');
	if (portalUpgradesHere && portalUpgradesHere.offsetParent !== null) {
		buyPortalUpgradeById('Equality');
	}
	
	var button = document.getElementById('activatePortalBtn');
	if (button && button.offsetParent != null) {
		activateClicked();
	}
	cancelTooltip(); 
	cancelPortal();
}

if (buyEqInterval) { clearInterval(buyEqInterval); buyEqInterval = null; }
var buyEqInterval = setInterval(function() { 
	if (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText.indexOf("Improbability") > -1) {
		var maxHealth = game.global.soldierEnergyShieldMax + game.global.soldierHealthMax;
		var avgEnemyDamage = (calculateDamageForMayhemImprobability()[0] + calculateDamageForMayhemImprobability()[1]) / 2;
		var maxEnemyDamage = (calculateDamageForMayhemImprobability()[1] + calculateDamageForMayhemImprobability()[1]) / 2;
		if (maxEnemyDamage > maxHealth) {
			buySingleEq();
		}
	}
}, 4999);

var minJestimpZone = 20;
var jestimpTarget = '';
var jestimpMode = false;
var saveString = null;

if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() { 
	var tmpTarget = jestimpTarget;
	if (tmpTarget != 'science' && tmpTarget != 'gems')
		tmpTarget = game.global.playerGathering;

	if (game.global.world >= minJestimpZone || minJestimpZone == -1) {
		var badGuyNameString = (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText) || null;
		if (badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") > -1) {
			saveString = save(true);
			jestimpMode = true;
		}
		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") == -1) {
			var logMessages = [ ...(document.getElementById('log').getElementsByClassName('message'))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf('jestimp') > -1; })
			if (logMessages.length) {
				if (logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(tmpTarget) > -1) {
					jestimpMode = false;
					saveString = null;
				} else {
					if (saveString) {
						load(saveString);
					}
				}
			}
		}
	}
}, 100);

