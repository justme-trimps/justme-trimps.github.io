if (autobuying) { clearInterval(autobuying); autobuying = null; }

var autobuyingNumber = 10;
var autobuyingEquipmentNumber = 10;
var autobuying = setInterval(function() {
	var armIds = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
	Number.prototype.toRoman= function () {
		var num = Math.floor(this), 
			val, s= '', i= 0, 
			v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], 
			r = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']; 

		function toBigRoman(n) {
			var ret = '', n1 = '', rem = n;
			while (rem > 1000) {
				var prefix = '', suffix = '', n = rem, s = '' + rem, magnitude = 1;
				while (n > 1000) {
					n /= 1000;
					magnitude *= 1000;
					prefix += '(';
					suffix += ')';
				}
				n1 = Math.floor(n);
				rem = s - (n1 * magnitude);
				ret += prefix + n1.toRoman() + suffix;
			}
			return ret + rem.toRoman();
		}

		if (this - num || num < 1) num = 0;
		if (num > 3999) return toBigRoman(num);

		while (num) {
			val = v[i];
			while (num >= val) {
				num -= val;
				s += r[i];
			}
			++i;
		}
		return s;
	};
	
	var fromRoman = function (roman, accept) {
		var s = roman.toUpperCase().replace(/ +/g, ''), 
			L = s.length, sum = 0, i = 0, next, val, 
			R = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };

		function fromBigRoman(rn) {
			var n = 0, x, n1, S, rx =/(\(*)([MDCLXVI]+)/g;

			while ((S = rx.exec(rn)) != null) {
				x = S[1].length;
				n1 = Number.fromRoman(S[2])
				if (isNaN(n1)) return NaN;
				if (x) n1 *= Math.pow(1000, x);
				n += n1;
			}
			return n;
		}

		if (/^[MDCLXVI)(]+$/.test(s)) {
			if (s.indexOf('(') == 0) return fromBigRoman(s);

			while (i < L) {
				val = R[s.charAt(i++)];
				next = R[s.charAt(i)] || 0;
				if (next - val > 0) val *= -1;
				sum += val;
			}
			if (accept || sum.toRoman() === s) return sum;
		}
		return NaN;
	};
	
	var checkAndBuy = function(buttonId, ownedId, max, onlyWhenOne) { 
		var button = document.getElementById(buttonId);
		if (button && button.parentNode && button.parentNode.getAttribute("id") == "equipmentHere") {
			var level = fromRoman(document.getElementById(buttonId + "Numeral").innerText);
			var siblings = button.parentNode.children;
			
			if (siblings.length && fromRoman(document.getElementById(siblings[0].getAttribute("id") + "Numeral").innerText) > level) {
				onlyWhenOne = true;
			}
		}
		var click = false;
		if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
			if (ownedId && max) {
				var owned = document.getElementById(ownedId);
				if (owned) {
					var value = parseInt(owned.innerHTML.match(/[0-9]+/)[0]);
					if (onlyWhenOne) {
						if (value == 1 || value == 2) {
							click = true;
						}
					} else if (max > value) {
						click = true;
						for (var i = 0; i < armIds.length; i++) {
							if ((armIds[i] + "Owned") != ownedId 
									&& document.getElementById(armIds[i] + "Owned")
									&& value > 5 + parseInt(document.getElementById(armIds[i] + "Owned").innerHTML.match(/[0-9]+/)[0])
									&& fromRoman(document.getElementById(armIds[i] + "Numeral").innerText) == level) {
								click = false;
							}
						}
					}
				}
			} else {
				click = true;
			}
		}

		if (click) {
			button.click();
			if (onlyWhenOne) {
				button.click();
			}
		}
	}


	var buyEquipment = function(arbalestNumber, onlyWhenOne) {
		checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber, onlyWhenOne);
		checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber, onlyWhenOne);
		checkAndBuy("Greatsword", "GreatswordOwned", arbalestNumber - 2, onlyWhenOne);
		checkAndBuy("Battleaxe", "BattleaxeOwned", arbalestNumber - 1, onlyWhenOne);
		checkAndBuy("Polearm", "PolearmOwned", arbalestNumber - 1, onlyWhenOne);
		checkAndBuy("Mace", "MaceOwned", arbalestNumber, onlyWhenOne);
		checkAndBuy("Dagger", "DaggerOwned", arbalestNumber + 2, onlyWhenOne);
	}
	
	var buyArm = function(gambesonNumber, onlyWhenOne) {
		checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber, onlyWhenOne);
		checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber, onlyWhenOne);
		checkAndBuy("Breastplate", "BreastplateOwned", gambesonNumber - 2, onlyWhenOne);
		checkAndBuy("Shoulderguards", "ShoulderguardsOwned", gambesonNumber - 2, onlyWhenOne);
		checkAndBuy("Pants", "PantsOwned", gambesonNumber - 2, onlyWhenOne);
		checkAndBuy("Helmet", "HelmetOwned", gambesonNumber - 1, onlyWhenOne);
		checkAndBuy("Boots", "BootsOwned", gambesonNumber - 1, onlyWhenOne);
	}

	buyEquipment(autobuyingNumber);
	if (autoBuyArm) {
		buyArm(autobuyingEquipmentNumber);
	}
	
	
}, 3000);
var autoBuyArm = false;
///---

//////////////////////////////////////////////////////////////

var fixBoard = function() { 
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
	node.setAttribute("style", "height: 1500px;clear: both; overflow: hidden;");    
	document.getElementsByTagName("body")[0].appendChild(node);
	window.scrollTo(0, 3000);
	document.getElementsByTagName("body")[0].setAttribute("style", "background: #ddd; overflow-y: visible;"); 
	settingsRow.setAttribute("style", "position: relative"); 
}

fixBoard();

////////////////////////

var buyTrapsInterval = 10 * 1000;
var autoBuytTrap = true;

var buyTraps = function() {
	if (autoBuytTrap) {
		numTab('2'); 
		buyBuilding('Trap');
		numTab('6');
		setTimeout(buyTraps, buyTrapsInterval);
	}
}

setTimeout(buyTraps, buyTrapsInterval);

////////////////////////

if (fluffyMatureInterval)
	clearInterval(fluffyMatureInterval);

var fluffyMatureInterval = setInterval(function() {
	if (game.global.world < 302)
		return;
		
	var div = document.getElementById("fluffy-mature");
	if (!div) {
		div = document.createElement("DIV");
		div.setAttribute("id", "fluffy-mature");
		document.getElementById("logColumn").prepend(div);
	}
	div.innerHTML = "" + (new Date(new Date() * 1 + (Fluffy.currentExp[2] - Fluffy.currentExp[1]) / getFluffyExperienceRate() * 1000));
}, 1000);



/////



for (var i = 0; i < 3; i++) { numTab('4'); document.getElementById("Nursery").click(); numTab('6'); }



///

var upgradeToBuy = "Fire";

if (buyUpgradeInterval)
	clearInterval(buyUpgradeInterval);

var buyUpgradeInterval = setInterval(function() {
	playerSpire.buyUpgrade(upgradeToBuy, true);
}, 60000);

var upgradeToBuy2 = "Poison";

if (buyUpgradeInterval2)
	clearInterval(buyUpgradeInterval2);

var buyUpgradeInterval2 = setInterval(function() {
	playerSpire.buyUpgrade(upgradeToBuy2, true);
}, 60000);


//

if (buildLastTrap)
	clearInterval(buildLastTrap);

var buildLastTrap = setInterval(function() {
	for (var i = 1; i < 5; i++) {
		if (typeof (playerSpire.layout[playerSpire.layout.length - i].trap.name) === "undefined") {
			playerSpire.selectedTrap = "Fire";
			playerSpire.buildTrap(playerSpire.layout.length - i);
		}
	}
}, 60000);

///

if (buildLastFrostTrap)
	clearInterval(buildLastFrostTrap);

var buildLastFrostTrap = setInterval(function() {
	if (typeof (playerSpire.layout[playerSpire.layout.length - 5].trap.name) === "undefined") {
		playerSpire.selectedTrap = "Frost";
		playerSpire.buildTrap(playerSpire.layout.length - 5);
	}
}, 60000);


///


if (bwInterval) { clearInterval(bwInterval); bwInterval = null; }
var startBionic = function() {
	if (document.getElementById("mapsBtnText") 
		&& document.getElementById("mapsBtnText").offsetParent !== null 
		&& document.getElementById("mapsBtnText").innerHTML.indexOf("World") > -1) {
		
		var map = null;
		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			map = game.global.mapsOwnedArray[i];
			if (map.location === "Bionic") {
				break;
			}
		}

		if (map != null) {
			selectMap(map.id);
			runMap();
		}
	}
	
}

var bwInterval = setInterval(startBionic, 1000);

/// 


var exportInterval = setInterval(function() { 
    cancelTooltip();
    tooltip('Export', null, 'update');
    document.getElementById('downloadLink').click();
    cancelTooltip();
}, 1000 * 60 * 1);

///

var formationInterval = setInterval(function() {
	if (game.global.world == 701)
		setFormation('4');
}, 1000);

///

if (windFormationInterval) { clearInterval(windFormationInterval); windFormationInterval = null; }
var windFormationInterval = setInterval(function() {
	if (document.getElementById("formation5") != null 
		&& game.empowerments.Wind.currentDebuffPower != 300
		&& document.getElementById("formation5").offsetParent != null
		&& windFormationZones.indexOf("|" + game.global.world + "|") > -1) {
			autoFormation = false;
			if (game.global.formation != 5 && !game.global.mapsActive)
				setFormation('5');
	} else {
		autoFormation = true;
	}
}, 100);
var windFormationZones = "|631|632|633|634|635|646|647|648|649|650|661|662|663|664|665|";

//////////////////
if (cellTimeInterval) { clearInterval(cellTimeInterval); cellTimeInterval = null; }
var cellTimeInterval;
(function(){
	var lastTime = -1;
	var lastCell = game.global.lastClearedMapCell;
	cellTimeInterval = setInterval(function() {
	if (game.global.lastClearedMapCell != lastCell) {
		if (lastTime != -1) {
			var seconds = (new Date().getTime() - lastTime) / 1000;
			var millisecondsToClose = seconds * (100 - lastCell - 2) * 1000;
			
			console.log("Cell " + (lastCell + 2) + ", " + seconds + " seconds. Close map at " + new Date(new Date().getTime() + millisecondsToClose));
		}
		lastCell = game.global.lastClearedMapCell;
		lastTime = new Date().getTime();
	}
	}, 1000);
})();



//////////////////
if (worldTimeInterval) { clearInterval(worldTimeInterval); worldTimeInterval = null; }
var worldTimeInterval;
(function(){
	var lastTime = -1;
	var lastCell = game.global.lastClearedCell;
	worldTimeInterval = setInterval(function() {
	if (game.global.lastClearedCell != lastCell) {
		if (lastTime != -1) {
			var seconds = (new Date().getTime() - lastTime) / 1000;
			var millisecondsToClose = seconds * (100 - lastCell - 2) * 1000;
			
			console.log("Cell " + (lastCell + 2) + ", " + seconds + " seconds. Close zone at " + new Date(new Date().getTime() + millisecondsToClose));
		}
		lastCell = game.global.lastClearedCell;
		lastTime = new Date().getTime();
	}
	}, 1000);
})();


///

if (setForcedZoneInterval) {
    clearInterval(setForcedZoneInterval);
    setForcedZoneInterval = null;
}
var setForcedZoneInterval = setInterval(function() {
    if (game.global.world < 200) forcedPortalZone = 652;
}, 3000);

///


if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (!game.global.mapsActive && game.global.mapBonus < 1) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();
		
		if (game.global.world < 761 || game.global.world > 765) {
			incrementMapLevel(-1);
			incrementMapLevel(-1);
			incrementMapLevel(-1);
		} else {
			document.getElementById("advExtraLevelSelect").value = "10";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			document.getElementById("lootAdvMapsRange").value = 0;
		}
		

		if (game.global.world % 15 > 0 && game.global.world % 15 < 6)
			document.getElementById("advSpecialSelect").value = "lmc";
		
		buyMap();
		runMap();
		fightManual();
		
		if (game.global.world < 761 || game.global.world > 765) {
			while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Any') == -1)
				toggleSetting('repeatUntil');
		} else {
			while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1)
				toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1)
			toggleSetting('exitTo')

		//numTab('4'); 
		//document.getElementById("Nursery").click(); 
		//numTab('6');
	}
}, 3000);