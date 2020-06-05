
var buyPortalUpgradeById = function(id) {
	var button = document.getElementById(id);
	if (button && button.offsetParent != null && button.getAttribute("class").indexOf("perkColorOn") > -1) {
		console.log("Buying: " + id);
		button.click();
	}
}

var buySingleEq = function() {
	console.log('buySingleEq')
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

var lastCell = -2;
if (trappaBuyEqInterval) { clearInterval(trappaBuyEqInterval); trappaBuyEqInterval = null; }
var trappaBuyEqInterval = setInterval(function() {
	
	if (document.getElementById('badGuyAttack') && document.getElementById('goodGuyHealthMax')) {
		var attackString = document.getElementById('badGuyAttack').innerText;
		var goodGuyHealthMaxString = document.getElementById('goodGuyHealthMax').innerText.replace('.', '');
		attackString = attackString.substr(attackString.indexOf('-') + 1).replace('.', '');
		
		var attack = parseInt(attackString.match(/[0-9]+/)[0]);
		var goodGuyHealthMax = parseInt(goodGuyHealthMaxString.match(/[0-9]+/)[0]);
		
		var cell = game.global.lastClearedCell;
		
		if (cell != lastCell) {
			console.log(cell + " " + attack + " " + goodGuyHealthMax + " " + (1.0 * goodGuyHealthMax / 3))
			lastCell = cell;
			//if (attack > (10.0 * goodGuyHealthMax / 3.5)) {
			if (attack > (1.0 * goodGuyHealthMax / 3.5)) {
				buySingleEq();
			}
		}
	}
}, 1000);