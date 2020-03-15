var minJestimpZone = 55;
var jestimpTarget = 'metal';
var jestimpMode = false;
var saveString = null;

if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() { 
	if (game.global.world >= minJestimpZone || minJestimpZone == -1) {
		var badGuyNameString = (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText) || null;
		if (badGuyNameString && badGuyNameString.toLowerCase() === "jestimp") {
			saveString = save(true);
			jestimpMode = true;
		}
		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase() !== "jestimp") {
			var logMessages = [ ...(document.getElementById('log').getElementsByClassName('message'))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf('jestimp') > -1; })
			if (logMessages.length && logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(jestimpTarget) > -1) {
				jestimpMode = false;
				saveString = null;
			} else {
				if (saveString) {
					load(saveString);
				}
			}
		}
	}
	
	if (!badGuyNameString || badGuyNameString.toLowerCase() !== "jestimp") {
		jestimpMode = false;
		saveString = null;
	}
}, 100);


var goldenMode = 'Void';
var switchBetweenGoldenModes = true;
var minGoldenHeliumBeforeBattle = 2.0;
var minGoldenVoidBeforeHelium = 0.5;
var buyGoldUpgrade = function() {
	var id = goldenMode;
	if (id == 'Void' && game.goldenUpgrades.Void.currentBonus > minGoldenVoidBeforeHelium) {
		id = 'Helium';
	}
	if (id == 'Helium' && game.goldenUpgrades.Helium.currentBonus > minGoldenHeliumBeforeBattle) {
		id = 'Battle';
	}
	var button = document.getElementById(id + 'Golden');
	if (button) {
		buyGoldenUpgrade(id);
		tooltip('hide')
		buyGoldUpgrade();
	}
}

if (buyGoldenBattleInterval) { clearInterval(buyGoldenBattleInterval); buyGoldenBattleInterval = null; }
var buyGoldenBattleInterval = setInterval(function() {
	buyGoldUpgrade();
}, 5000);