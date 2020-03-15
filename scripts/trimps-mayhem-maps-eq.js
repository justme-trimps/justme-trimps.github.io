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
var minStacks = 900;

var getStacksNumber = function() {
	if (document.getElementById('gammaStack')) {
		return parseInt(document.getElementById('gammaStack').innerText);
	}
	return 0;
}

var shouldFightSomeMap = function() {
	if (game.global.lastClearedCell < 58)
		return false;

	if (game.global.world < 72)
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
		var maxEnemyDamage = calculateDamageForMayhemImprobability()[1];
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

var shieldInWorld = {
	mods: [
		["critChance", 125],
		["critDamage", 6650],
		["plaguebringer", 99],
		["prismatic", 250],
		["trimpAttack", 2380],
		["trimpHealth", 2490]
	]
};
var shieldInMap = {
	mods: [
		["critChance", 125],
		["critDamage", 4870],
		["gammaBurst", 22900],
		["prismatic", 250],
		["trimpAttack", 2580],
		["trimpHealth", 2430]
	]
};

var shouldSwitchToShield = function(heirloom, pattern) {
	if (heirloom.mods.length != pattern.mods.length)
		return false;
		
	for (var i = 0; i < heirloom.mods.length; i++) {
		var patternMod = pattern.mods[i];
		var heirloomMod = heirloom.mods[i];
		if (patternMod[0] != heirloomMod[0] || patternMod[1] > heirloomMod[1])
			return false;
	}
	
	return true;
}


if (switchHeirloomInterval) { clearInterval(switchHeirloomInterval); switchHeirloomInterval = null; }
var switchHeirloomInterval = setInterval(function() { 
	var newHeirloom = shieldInMap;
	
	if (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText.indexOf("Improbability") > -1) {
		newHeirloom = shieldInWorld;
	}
	
	for (var i = 0; i < game.global.heirloomsCarried.length; i++) {
		var heirloom = game.global.heirloomsCarried[i];
		if (shouldSwitchToShield(heirloom, newHeirloom)) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
	}
}, 400);
