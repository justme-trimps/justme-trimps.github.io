var gogogo = false;
var ignorePrismaticPalace = true;
var dontPortal = false;
var challengeToTry = 'Melt'; 
//var challengeToTry = 'Bublé'; 
var smithiesOwnedBeforeMeltingZone = 10;
var minMeltingZone = 56;
var autoCancelActive = false;
var iWantElevenSmithies = true;

var collectGambeson = {};
//collectGambeson["map35"] = 5;

var collectBoots = {};
//collectBoots["map41"] = 5;

var mapBonuses = [];
mapBonuses["map45"] = 1; // do not remove
mapBonuses["map49"] = 1;
mapBonuses["map50"] = 2;
mapBonuses["map51"] = 0;
mapBonuses["map52"] = 0;
mapBonuses["map53"] = 0;
mapBonuses["map54"] = 0;
mapBonuses["map55"] = 3;
mapBonuses["map56"] = 0;
mapBonuses["map57"] = 0;
mapBonuses["map58"] = 0;
mapBonuses["map59"] = 0;
mapBonuses["map60"] = 0;
mapBonuses["map61"] = 1;
mapBonuses["map62"] = 2;
mapBonuses["map63"] = 2;
mapBonuses["map64"] = 2;
mapBonuses["map65"] = 1;
mapBonuses["map66"] = 1;
mapBonuses["map67"] = 1;
mapBonuses["map68"] = 1;
mapBonuses["map69"] = 1;
mapBonuses["map70"] = 1;
mapBonuses["map71"] = 1;
mapBonuses["map72"] = 1;
mapBonuses["map73"] = 1;
mapBonuses["map74"] = 1;
mapBonuses["map75"] = 1;

var plusOneZones = [49, 50, /*51, 52, 53, 54, */55, 60, 61, 62, 63/*, 64*/];
var plusOneZones = [49, 50, /*51, 52, 53, 54, */55, 60, 61, 62, 63, 70, 71, 72, 73, 74];
var plusTwoZones = [50, 55, /*69, 70*/];
var plusThreeZones = [55];
var plusFourZones = [55];
var plusFiveZones = [55];
var plusSixZones = [55];

var autobuyingEquipmentNumber = 33;
var autobuyingArmNumber = 31;


var gatherMetalZone = 10;
var startMapsWorld = 50;

var goldenMode = 'Void';
var minGoldenHeliumBeforeBattle = 5.0;//2.0;
var minGoldenVoidBeforeHelium = -1.0; //0.5;

var voidMapZone = 50;

var abandonChallengeZone = 64;
var forcedPortalWorld = 73;
var mapMode = "lmc";

if (gogogo) {
	goldenMode = 'Battle'; 
	voidMapZone = -1;
	startMapsWorld = 49;
	dontPortal = true;
	abandonChallengeZone = -1;
	smithiesOwnedBeforeMeltingZone = -1;
	ignorePrismaticPalace = false;
	mapMode = "hc";
	minMeltingZone = 1000;
	iWantElevenSmithies = false;
	changeAutoBuy = false;
}

var forcedPortalLostBattles = 750;
var forcedPortalWhenNoChallenge = false;

var buyForever = false;


var dontMap = false;
var buySmithies = true;
var buyTributes = true;
var buyMeteorologists = true;

var switchToMetalAutomatically = true;
var lastFluffyExpLog = 0;
var autoExportSave = true;


var minJestimpZone = 55;
var jestimpTarget = 'metal';
var oldJestimpTarget;
var jestimpMode = false;
var saveString = null;
var wentForSmithy = false;
var changeAutoBuy = true;
var set01 = true;

var fluffyStart;
if (typeof fluffyStart === "undefined")
	fluffyStart = 0;

if (changeJestimpTargetToWoodInterval) { clearInterval(changeJestimpTargetToWoodInterval); changeJestimpTargetToWoodInterval = null; }
var changeJestimpTargetToWoodInterval = setInterval(function() {
	if (!wentForSmithy 
		&& iWantElevenSmithies 
		&& game.global.world == 55 
		) {
			if (jestimpTarget != oldJestimpTarget 
				&& game.global.mapBonus > 3
				&& game.resources.wood.owned < 5e+20
				&& game.buildings.Smithy.owned < 11
				&& game.global.mapsActive 
			) {
			oldJestimpTarget = jestimpTarget;
			jestimpTarget = "wood";
			fireMode();
			setMax(1, false);
			numTab(6);
			cancelTooltip();
			buyJob('Miner');
			fireMode();
			buyJob('Lumberjack');
			setGather('wood');
			numTab(1);
		} else {
			if (oldJestimpTarget 
				&& (game.resources.wood.owned > 5e+20 || game.buildings.Smithy.owned >= 11)) {
				jestimpTarget = "metal";
				oldJestimpTarget = null;
				fireMode();
				setMax(1, false);
				numTab(6);
				cancelTooltip();
				buyJob('Lumberjack');
				fireMode();
				buyJob('Miner');
				setGather('metal');
				numTab(1);
				wentForSmithy = true;
			}
		}
	}
}, 3000 * 1);



if (changeJestimpTargetToMetalInterval) { clearInterval(changeJestimpTargetToMetalInterval); changeJestimpTargetToMetalInterval = null; }
var changeJestimpTargetToMetalInterval = setInterval(function() {
	if (iWantElevenSmithies && game.global.world == 56 && game.global.playerGathering == "wood") {
		jestimpTarget = "metal";
		oldJestimpTarget = null;
		fireMode();
		setMax(1, false);
		numTab(6);
		cancelTooltip();
		buyJob('Lumberjack');
		fireMode();
		buyJob('Miner');
		setGather('metal');
		numTab(1);
		wentForSmithy = true;
	}
}, 3000 * 1);


if (changeAutobuyingNumbersInterval) { clearInterval(changeAutobuyingNumbersInterval); changeAutobuyingNumbersInterval = null; }
var changeAutobuyingNumbersInterval = setInterval(function() {
	if (changeAutoBuy && !game.global.mapsActive) {
		if (game.global.world > 0) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 20; }
		if (game.global.world >= 40) { autobuyingEquipmentNumber = 12; autobuyingArmNumber = 10; }
		if (game.global.world >= 45) { autobuyingEquipmentNumber = 15; autobuyingArmNumber = 12; }
		if (game.global.world >= 50) { autobuyingEquipmentNumber = 34; autobuyingArmNumber = 20; }
		if (game.global.world >= 60) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 6; }
		if (game.global.world >= 65) { autobuyingEquipmentNumber = 22; autobuyingArmNumber = 8; }
		if (game.global.world >= 66) { autobuyingEquipmentNumber = 25; autobuyingArmNumber = 17; }
		if (game.global.world >= 69) { autobuyingEquipmentNumber = 10; autobuyingArmNumber = 8; }
	}
}, 1000 * 1);


if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() { 
	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Prismatic Palace")
		return;
	
	if (game.global.world >= minJestimpZone || minJestimpZone == -1) {
		var badGuyNameString = (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText) || null;
		if (badGuyNameString && badGuyNameString.toLowerCase() === "jestimp") {
			saveString = save(true);
			jestimpMode = true;
		}
		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase() !== "jestimp") {
			var logMessages = [ ...(document.getElementById('log').getElementsByClassName('message'))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf('jestimp') > -1; })
			if (logMessages.length) {
				if (logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(jestimpTarget) > -1) {
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
	
	//if (!badGuyNameString || badGuyNameString.toLowerCase() !== "jestimp") {
	//	jestimpMode = false;
	//	saveString = null;
	//}
}, 100);



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
}, 1000);


var isAllowedBuying = function(equipmentOrArm) {
	if (equipmentOrArm && game.global.world > 10) {
		var upgradesHereDiv = document.getElementById('upgradesHere');
		if (upgradesHereDiv.getElementsByClassName('thing').length > 0) {
			if (document.getElementById('Supershield') && document.getElementById('Supershield').offsetParent != null) {
				return upgradesHereDiv.getElementsByClassName('thing').length <= 1;
			}
			return upgradesHereDiv.getElementsByClassName('thing').length == 0;
		}
	}
	return true; //game.global.world != 37 && game.global.world != 38;
}

var buyStorageOnlyWhenHalf = false;
var checkStorage = function(buttonId, timerId, resourceId) { 
	var button = document.getElementById(buttonId);
	var click = false;
	

	if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
		if (timerId) {
			var timer = document.getElementById(timerId);
			if (timer) {
				var innerHTML = timer.innerHTML;
				if (innerHTML.match(/^[0-9]+ Sec(s)?$/) 
					//|| innerHTML.match(/^[0-9]+ Min(s)? [0-9]+ Sec(s)?$/) 
					//|| innerHTML.match(/^[0-9.]{1,4}K? Year(s)? [0-9]+ Day(s)?$/) 
					//|| innerHTML.match(/^[0-9]+ Day(s)? [0-9]+ Hour(s)?$/) 
					//|| innerHTML.match(/^[0-9]+ Hour(s)? [0-9]+ Min(s)?$/)
					) {
					if (!buyStorageOnlyWhenHalf) {
						click = true;
					}
				}
			}
		}

		if (!click) {
			var resource = document.getElementById(resourceId);
			if (resource 
				&& 
				(
				//resource.getElementsByClassName("percentColorYellow").length > 0 
				//|| 
				resource.getElementsByClassName("percentColorRed").length > 0 
				|| resource.getElementsByClassName("percentColorOrange").length > 0
				)) {
				click = true;
			}
		}
	}
	
	if (click) {
		button.click();
	}
}

if (buyStorageInterval) { clearInterval(buyStorageInterval); buyStorageInterval = null; }
var buyStorageInterval = setInterval(function() {
	checkStorage("Barn", "foodTimeToFill", "food");
	checkStorage("Shed", "woodTimeToFill", "wood");
	checkStorage("Forge", "metalTimeToFill", "metal");
}, 250);

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
	if (buySmithies) buyBuilding('Smithy');
	if (buyMeteorologists) buyThing('Meteorologist');
	if (buyTributes) buyBuilding('Tribute');
	if (buyShields) buyThing('Shield');
	if (buyCollectors) buyBuilding('Collector');
	buyThing('Microchip');
}, 50);

var upgradeFast = true;
if (fastUpgradeInterval) { clearInterval(fastUpgradeInterval); fastUpgradeInterval = null; }
var fastUpgradeInterval = setInterval(function() {
	if (upgradeFast) {
		buyThing("Dagadder");
		buyThing("Bootboost");
		buyThing("Megamace");
		buyThing("Hellishmet");
		buyThing("Polierarm");
		buyThing("Pantastic");
		buyThing("Axeidic");
		buyThing("Smoldershoulder");
		buyThing("Greatersword");
		buyThing("Bestplate");
		buyThing("Harmbalest");
		buyThing("GambesOP");
	}
}, 300);

//

var autobuyingInterval;

setTimeout(function() {

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
			
			if (siblings.length && fromRoman(document.getElementById(siblings[1].getAttribute("id") + "Numeral").innerText) > level) {
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
						if (armIds.indexOf(buttonId) > -1) {
							for (var i = 0; i < armIds.length; i++) {
								if ((armIds[i] + "Owned") != ownedId 
										&& document.getElementById(armIds[i] + "Owned")
										&& value > 3 + parseInt(document.getElementById(armIds[i] + "Owned").innerHTML.match(/[0-9]+/)[0])
										&& fromRoman(document.getElementById(armIds[i] + "Numeral").innerText) == level) {
									click = false;
								}
							}
						}
						if (equipmentIds.indexOf(buttonId) > -1) {
							for (var i = 0; i < equipmentIds.length; i++) {
								if ((equipmentIds[i] + "Owned") != ownedId 
										&& document.getElementById(equipmentIds[i] + "Owned")
										&& value > 3 + parseInt(document.getElementById(equipmentIds[i] + "Owned").innerHTML.match(/[0-9]+/)[0])
										&& fromRoman(document.getElementById(equipmentIds[i] + "Numeral").innerText) == level) {
									click = false;
								}
							}
						}
					}
				}
			} else {
				click = true;
			}
		}

		if (click) {
			if (set01) {
				if (document.getElementById("tab6") && document.getElementById("tab6").offsetParent !== null) {
					if (document.getElementById("tab6Text") && document.getElementById("tab6Text").innerText != "0.1") {
						numTab('6'); 
						setMax(0.1);
					}
				}
			} 

			button.click();
			if (onlyWhenOne) {
				button.click();
			}
			
			if (set01) {
				numTab('1'); 
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


	var armIds = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
	var equipmentIds = ["Boots", "Helmet", "Pants", "Shoulderguards", "Breastplate", "Gambeson"];

	if (autobuyingInterval) { clearInterval(autobuyingInterval); autobuyingInterval = null; }
	autobuyingInterval = setInterval(function() {
		if (isAllowedBuying(true)) {
			buyEquipment(autobuyingEquipmentNumber);
			if (autoBuyArm) {
				buyArm(autobuyingArmNumber);
			}
		}
	}, 250);
	var autoBuyArm = true;

}, 1000);
//////////////////////////////////////////////////////////////

var fixBoard = function() { 
	if (document.getElementById('fixxxer2'))
		return;
	
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
	node.setAttribute("id", "fixxxer2"); 
	node.setAttribute("style", "height: 1500px;clear: both; overflow: hidden;");    
	document.getElementsByTagName("body")[0].appendChild(node);
	window.scrollTo(0, 3000);
	document.getElementsByTagName("body")[0].setAttribute("style", "background: #ddd; overflow-y: visible;"); 
	settingsRow.setAttribute("style", "position: relative"); 
}

fixBoard();

////////////////////////



var shouldFightSomeMap = function() {
	if (dontMap || game.global.mapsActive)
		return false;
	
	if (game.global.world == forcedPortalWorld
		&& (game.global.challengeActive + "") === "")
		return false;

	if (startMapsWorld <= 40 && game.global.world == 40 && game.global.lastClearedCell > 1
		&& game.global.mapBonus < 1 && !game.global.mapsActive )
		return true;
		
	if (game.global.world == 45 && game.resources.fragments.owned > 5100000000 && !game.global.mapsActive && game.global.mapBonus < 1) {
		return true;
	}

	if (!ignorePrismaticPalace) {
		if (startMapsWorld <= game.global.world && !game.global.mapsActive && game.global.world > 24 && game.global.lastClearedCell > 78) {
			for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
				if (game.global.mapsOwnedArray[i].name == "Prismatic Palace") {
					var button = document.getElementById(game.global.mapsOwnedArray[i].id);
					if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
						return true;
					}
				}
			}
		}
	}

	if (!game.global.mapsActive && game.buildings.Smithy.owned >= smithiesOwnedBeforeMeltingZone && game.global.world >= minMeltingZone) {
		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			if (game.global.mapsOwnedArray[i].name == "Melting Point") {
				var button = document.getElementById(game.global.mapsOwnedArray[i].id);
				if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
					return true;
				}
			}
		}
	}

	if (!game.global.mapsActive && voidMapZone != -1 && (game.global.world >= voidMapZone) && game.global.lastClearedCell > 10) {
		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			if (game.global.mapsOwnedArray[i].location == "Void") {
				return true;
			}
		}
	}

	if (typeof mapBonuses["map" + game.global.world] !== "undefined" 
		&& game.global.mapBonus < mapBonuses["map" + game.global.world]
		&& mapBonuses["map" + game.global.world] > 0
		&& game.global.world >= startMapsWorld
		&& game.global.lastClearedCell > 4)
		return true;

	if (typeof collectGambeson["map" + game.global.world] !== "undefined"
		&& game.global.lastClearedCell < 60) {
		return false;
	}

	if (typeof collectBoots["map" + game.global.world] !== "undefined"
		&& game.global.lastClearedCell < 60) {
		return false;
	}

	return !game.global.mapsActive 
		&& game.global.lastClearedCell > 4
		&& game.global.mapBonus < 1 
		&& typeof mapBonuses["map" + game.global.world] === "undefined"
		&& (/*game.stats.battlesLost.value >= 10 ||*/ game.global.world >= startMapsWorld);
}

if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();
		
		document.getElementById("advSpecialSelect").value = mapMode;
		
		if (iWantElevenSmithies && game.global.world == 55)
			document.getElementById("advSpecialSelect").value = "hc";
		
		if (game.global.world == 50) {
			document.getElementById("advSpecialSelect").value = "p";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
		}
		
		if (game.global.world == 45 && game.resources.fragments.owned > 5100000000 && !game.global.mapsActive && game.global.mapBonus < 1) {
			document.getElementById("advExtraLevelSelect").value = "5";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			document.getElementById("advSpecialSelect").value = 0;
		}
		
		buyMap();
		
		if (plusOneZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "1";
			buyMap();
		}
		
		if (plusTwoZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "2";
			buyMap();
		}
		
		if (plusThreeZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "3";
			buyMap();
		}
		
		if (plusFourZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "4";
			buyMap();
		}
		
		if (plusFiveZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "5";
			buyMap();
		}
		
		if (plusSixZones.indexOf(game.global.world) > -1) {
			document.getElementById("advExtraLevelSelect").value = "6";
			buyMap();
		}

		var specialZoneRun = false;

		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			if (game.global.mapsOwnedArray[i].name == "Big Wall") {
				var wallMapButton = document.getElementById(game.global.mapsOwnedArray[i].id);
				if (wallMapButton && wallMapButton.getAttribute("class").indexOf("noRecycleDone") == -1) {
					wallMapButton.click();
					specialZoneRun = true;
				}
			}
		}

		if (!ignorePrismaticPalace) {
			for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
				if (game.global.mapsOwnedArray[i].name == "Prismatic Palace" && game.global.world > 24) {
					var button = document.getElementById(game.global.mapsOwnedArray[i].id);
					if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
						button.click();
						specialZoneRun = true;
					}
				}
			}
		}

		if (game.buildings.Smithy.owned >= smithiesOwnedBeforeMeltingZone && game.global.world >= minMeltingZone) {
			for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
				if (game.global.mapsOwnedArray[i].name == "Melting Point") {
					var button = document.getElementById(game.global.mapsOwnedArray[i].id);
					if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
						console.log(getPortalTime() + " " + game.global.world + " zone - Melting Point");
						button.click();
						specialZoneRun = true;
					}
				}
			}
		}

		if (game.global.world >= voidMapZone && voidMapZone != -1) {
			if (!specialZoneRun && (game.global.mapBonus > 0 || game.global.world > voidMapZone)) {
				for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
					if (game.global.mapsOwnedArray[i].location == "Void") {
						toggleVoidMaps();
						var button = document.getElementById(game.global.mapsOwnedArray[i].id);
						if (button) {
							button.click();
						}
					}
				}
			}
		}
		
		runMap();
		fightManual();
		
		if (!specialZoneRun) {
			if (typeof mapBonuses["map" + game.global.world] !== "undefined") {
				while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1)
					toggleSetting('repeatUntil');
			} else if (typeof collectGambeson["map" + game.global.world] !== "undefined") {
				while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1)
					toggleSetting('repeatUntil');
			} else if (typeof collectBoots["map" + game.global.world] !== "undefined") {
				while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1)
					toggleSetting('repeatUntil');
			} else {
				while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Any') == -1)
					toggleSetting('repeatUntil');
			}
		} else {
			while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1)
				toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1)
			toggleSetting('exitTo')
	}
}, 1500);

var getNumberText = function(number) {
	if (number && number < 1000) {
		return ("" + number).replace(/(\.[0-9]{3})[0-9]+/g, "$1");
	}
	var result = "";
	var suffix = 0;
	var suffixes = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"]
	if (number) {
		while (number > 1000000) {
			number = Math.floor(number / 1000);
			suffix++;
		}
		if (number > 1000) {
			number = number / 1000;
			suffix++;
		}
		result = number + "000" + suffixes[suffix];
		result = result.replace(/(\.[0-9]{3})[0-9]+/g, "$1");
	}
	return result;
}

var getNumberFromText = function(text) {
	var suffixes = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];
	var number = parseFloat(text);
	text = text.replace("" + number, "");
	var power = 0;
	if (suffixes.indexOf(text) > -1) {
		power = suffixes.indexOf(text) + 1;
	}
	return number * Math.pow(1000, power);
}


var getFluffyExperienceRate = function() {
	if (fluffyStart == 0) {
		return 0;
	}
	var expEarned = Fluffy.currentExp[1] - fluffyStart;
	
	return Math.round(10 * expEarned / (((new Date() * 1) - game.global.portalTime) / 1000)) / 10;
}

var getFluffyExperienceRateText = function() {
	return getNumberText(getFluffyExperienceRate());
}

var getRadonText = function() {
	var owned = game.resources.radon.owned;
	if (owned <= 0)
		return "";
	return Math.round(owned / (((new Date() * 1) - game.global.portalTime) / 1000 / 3600)) + "/hr;"
}

var getRadonNormalized = function() {
	var result = 0;
	var radonText = getRadonText();
	if (radonText && radonText.indexOf('/') && (game.global.world <= forcedPortalWorld)) {
		var text = radonText.substr(0, radonText.indexOf('/'))
		var radonNumber = getNumberFromText(text);
		result = radonNumber / (Math.pow(1.03, forcedPortalWorld - game.global.world));
	}
	return result;
}


var logFluffyExp = function() {
	var heliumPhSpan = document.getElementById('heliumPh');
	if (heliumPhSpan) {
		lastFluffyExpLog = game.global.world;
		var text2 = "";
		var text3 = "";
		if (fluffyStart > 0) {
			text2 = ", fluffy exp rate: " + getFluffyExperienceRateText() + " exp / s";
			text3 = ", fluffy upgrade: " + (new Date(new Date() * 1 + (Fluffy.currentExp[2] - Fluffy.currentExp[1]) / getFluffyExperienceRate() * 1000));
		}
		var text = getPortalTime() + " " + game.global.world + " zone, radon: " + heliumPhSpan.innerHTML + ", RN: " + getNumberText(getRadonNormalized() / 1000);
		text = text.replace(/(\.[0-9]{2})[0-9]+e/g, "$1e");
		console.log(text + text2 + text3);
	}
}


var pressFight = function() {
	if (document.getElementById("cell" + (game.global.lastClearedCell + 1)) == null && game.global.lastClearedCell == -1) {
		setTimeout(function() { pressFight(); }, 500);
	} else {
		document.getElementById("fightBtn").click();
	}
}

var getPortalTime = function() {
	var portalTimeElement = document.getElementById("portalTime");
	if (portalTimeElement) {
		return portalTimeElement.innerHTML;
	}
	return "";
}

var buyPortalUpgradeById = function(id) {
	var button = document.getElementById(id);
	if (button && button.offsetParent != null && button.getAttribute("class").indexOf("perkColorOn") > -1) {
		console.log("Buying: " + id);
		button.click();
		buyPortalUpgradeById(id);
	}
}

var buyPortalUpgrades = function() {
	cancelTooltip();
	viewPortalUpgrades();
	var portalUpgradesHere = document.getElementById('portalUpgradesHere');
	if (portalUpgradesHere && portalUpgradesHere.offsetParent !== null) {
		buyPortalUpgradeById('Greed');
		buyPortalUpgradeById('Tenacity');
//		buyPortalUpgradeById('Carpentry');
//		buyPortalUpgradeById('Looting');
//		buyPortalUpgradeById('Resilience');
//		buyPortalUpgradeById('Criticality');
//		buyPortalUpgradeById('Power');
//		buyPortalUpgradeById('Artisanistry');
//		buyPortalUpgradeById('Toughness');
//		buyPortalUpgradeById('Motivation');
//		buyPortalUpgradeById('Packrat');
//		buyPortalUpgradeById('Prismal');
//		buyPortalUpgradeById('Pheromones');
//		buyPortalUpgradeById('Trumps');
	}
	
	var button = document.getElementById('activatePortalBtn');
	if (button && button.offsetParent != null) {
		activateClicked();
	}
	cancelTooltip(); 
	cancelPortal();
}

if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 30 * 1);

var isOkToPortal = function() {
	if (game.global.lastClearedCell < 4)
		return false;

	if (dontPortal)
		return false;

	if (game.global.mapsActive)
		return false;

	if (game.global.lastClearedCell > 90)
		return false;

	if ((game.global.challengeActive + "") !== "")
		return false;

	return game.global.world >= forcedPortalWorld || game.stats.battlesLost.value >= forcedPortalLostBattles || ((game.global.challengeActive + "") === "" && forcedPortalWhenNoChallenge);
}

if (forcePortalInterval) { clearInterval(forcePortalInterval); forcePortalInterval = null; }
var forcePortalInterval = setInterval(function() {
	if (isOkToPortal()) {
		logFluffyExp();
		portalClicked();
		console.log('---');
		if (challengeToTry)
			selectChallenge(challengeToTry);
		activateClicked();
		activatePortal();
		wentForSmithy = false;
		setTimeout(function() {
			pressFight();
			buyPortalUpgrades();
			fluffyStart = Fluffy.currentExp[1];
		}, 1000);
	}
}, 300);


var minLogZone = 57;
if (logFluffyExpInterval) { clearInterval(logFluffyExpInterval); logFluffyExpInterval = null; }
var logFluffyExpInterval = setInterval(function() {
	if (game.global.world < minLogZone) {
		lastFluffyExpLog = minLogZone;
		return;
	}
	
	if (lastFluffyExpLog < game.global.world) {
		logFluffyExp();
	}
}, 3000);

if (gatherMetalInterval) { clearInterval(gatherMetalInterval); gatherMetalInterval = null; }
var gatherMetalInterval = setInterval(function() {
	if (switchToMetalAutomatically && gatherMetalZone == game.global.world) {
		setGather('metal');
	}
}, 3000);


//var goodModsNames = "empty|MinerSpeed|ExplorerSpeed|FarmerSpeed|LumberjackSpeed|DragimpSpeed|FluffyExp|critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";
var goodModsNames = "empty|MinerSpeed|ExplorerSpeed|FarmerSpeed|LumberjackSpeed|DragimpSpeed|"; //FluffyExp| //"critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";

if (collectHeirloomsInterval) { clearInterval(collectHeirloomsInterval); collectHeirloomsInterval = null; }
var collectHeirloomsInterval = setInterval(function() {
	if (getMaxCarriedHeirlooms() > game.global.heirloomsCarried.length) {
		for (var i = 0; i < game.global.heirloomsExtra.length; i++) { 
			var theHeirloom = game.global.heirloomsExtra[i];
			if (theHeirloom.rarity > 8) {
				var hMods = theHeirloom.mods;
				var goodMods = 0;
				for (var j = 0; j < hMods.length; j++) {
					if (goodModsNames.indexOf(hMods[j][0]) > -1) {
						goodMods++;
					}
				}
				if (goodMods > 4) {
					selectHeirloom(i, 'heirloomsExtra', document.getElementById('extraHeirloomsHere').getElementsByClassName('heirloomThing')[i])
					carryHeirloom();
					return;
				}
			}
		}
	}
}, 3000);

if (stopCollectingInterval) { clearInterval(stopCollectingInterval); stopCollectingInterval = null; }
var stopCollectingInterval = setInterval(function() {
	if (iWantElevenSmithies && game.buildings.Smithy.owned < 11 && game.global.world == 55) {
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1)
			toggleSetting('repeatUntil');
		return;
	}
	
	if (buyForever) {
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1)
			toggleSetting('repeatUntil');
		return;
	}
	
	if (game.global.mapsActive 
	&& typeof collectGambeson["map" + game.global.world] !== "undefined" 
	&& game.equipment.Gambeson.level >= collectGambeson["map" + game.global.world]) {
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1)
			toggleSetting('repeatUntil');
	}
	
	if (game.global.mapsActive 
		&& typeof mapBonuses["map" + game.global.world] !== "undefined" 
		&& game.global.mapBonus >= mapBonuses["map" + game.global.world] - 1) {
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1)
			toggleSetting('repeatUntil');
	}

	if (game.global.mapsActive 
	&& typeof collectBoots["map" + game.global.world] !== "undefined" 
	&& game.equipment.Boots.level >= collectBoots["map" + game.global.world]) {
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1)
			toggleSetting('repeatUntil');
	}
}, 1000);

if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 30 * 1);

var getEnergyShieldState = function() {
	var shield = document.getElementById('energyShield');
	if (shield) {
		var style = shield.getAttribute('style');
		var width = style.match(/.*width:[^0-9%]*(\d+)/i);
		if (width && width.length == 2) {
			return parseInt(width[1]);
		}
	}
	return 0;
}

if (autoCancelInterval) { clearInterval(autoCancelInterval); autoCancelInterval = null; }
var autoCancelInterval = setInterval(function() {
	if (autoCancelActive) {
		if (getEnergyShieldState() < 90 && !game.global.mapsActive && game.global.world > 21 && ((game.global.challengeActive + "") !== "")) {
			console.log('autoCancelled in zone ' + game.global.world);
			if (!game.global.switchToMaps) {
				mapsClicked();
			}
			mapsClicked();
			mapsClicked();
		}
	}
}, 100);

if (abandonChallengeInterval) { clearInterval(abandonChallengeInterval); abandonChallengeInterval = null; }
var abandonChallengeInterval = setInterval(function() {
	if ((game.global.challengeActive + "") !== "" && game.global.world >= abandonChallengeZone && abandonChallengeZone != -1) {
		abandonChallenge();
		cancelTooltip();
	}
}, 100);


var shieldBeforeVoidMap = {
	mods: [
		["critChance", 125],
		["critDamage", 4750],
		["prismatic", 250],
		["trimpAttack", 2380],
		["trimpHealth", 2490],
		["voidMaps", 99]
	]
};
var shieldAfterVoidMap = {
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

var isItTimeForMorePowerfulHeirloom = function() {
	if (game.global.world < voidMapZone)
		return false;
	
	return true;
}

if (switchHeirloomInterval) { clearInterval(switchHeirloomInterval); switchHeirloomInterval = null; }
var switchHeirloomInterval = setInterval(function() { 
	var newHeirloom = shieldBeforeVoidMap;
	
	if (isItTimeForMorePowerfulHeirloom()) {
		newHeirloom = shieldAfterVoidMap;
	}
	
	for (var i = 0; i < game.global.heirloomsCarried.length; i++) {
		var heirloom = game.global.heirloomsCarried[i];
		if (shouldSwitchToShield(heirloom, newHeirloom)) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
	}
}, 3000);



if (pressFightInterval) { clearInterval(pressFightInterval); pressFightInterval = null; }
var pressFightInterval = setInterval(function() { pressFight(); }, 5000);

//if (infoInterval) { clearInterval(infoInterval); infoInterval = null; }
//var infoInterval = setInterval(function() { console.log(challengeToTry); }, 10000);

