var isAllowedBuying = function() {
	return true;
}

var buyThing = function(id) {
	if (game.global.world <= 1)
		return;

	var button = document.getElementById(id);
	if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
		if (isAllowedBuying()) {
			button.click();
		}
	}
}

var buyShields = false;
var buyCollectors = false;
if (buyThingsInterval) { clearInterval(buyThingsInterval); buyThingsInterval = null; }
var buyThingsInterval = setInterval(function() {
if (isAllowedBuying()) {
	buyThing("Worshipper");
	buyThing("Meteorologist");
	buyThing("Shield");
	buyBuilding("Tribute");
	buyBuilding("Hut");
	buyBuilding("House");
	buyBuilding("Mansion");
	buyBuilding("Hotel");
	buyBuilding("Resort");
	buyBuilding("Collector");
	buyEquipment('Dagger');
	buyEquipment('Boots');
	buyEquipment('Mace');
	buyEquipment('Helmet');
	buyEquipment('Polearm');
	buyEquipment('Pants');
	buyEquipment('Battleaxe');
	buyEquipment('Shoulderguards');
	buyEquipment('Greatsword');
	buyEquipment('Breastplate');
	buyEquipment('Arbalest');
	buyEquipment('Gambeson');
}	
	
}, 50);

var tmpTarget = "";
var jestimpMode = false;

if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() {
	var tmpTarget = jestimpTarget;
	if (tmpTarget != "science")
		tmpTarget = game.global.playerGathering;

	if (document.getElementById("worldName") && document.getElementById("worldName").innerText == "Prismatic Palace")
		return;

	if (document.getElementById("worldName") && document.getElementById("worldName").innerText == "Melting Point")
		return;

	if (game.global.world > 110) {
		var badGuyNameString = (document.getElementById("badGuyName") && document.getElementById("badGuyName").innerText) || null;
		if (badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") > -1) {
			saveString = save(true);
			jestimpMode = true;
		}
		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") == -1) {
			var logMessages = [ ...(document.getElementById("log").getElementsByClassName("message"))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf("jestimp") > -1; })
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
