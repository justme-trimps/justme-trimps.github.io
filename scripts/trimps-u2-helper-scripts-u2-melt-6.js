var goForScruffy = true;
var gogogo = true;
var dontPortal = false;
var challengeToTry = 'Melt'; 
var minMeltingZone = 101;
var autoCancelActive = false;
var smithiesWanted = 18;
var tributesWanted = 1250;
var autoHireFarmers = true;

var forcedPortalWorld = 119;

var plusZeroZones = [83, 84, 85, 92, 94, 95, 97, 99, 104, 105, 106, 107, 108, 114, 115, 116, 117]
var plusOneZones = [47, 77];
var plusTwoZones = [100, 101, 102, 103, 109, 110, 111, 112, 113];
var plusThreeZones = [55, 98];
var plusFourZones = [];
var plusFiveZones = [45];
var plusSixZones = [];
var prestigiousZones = [98, 103, 109, 113];

var tryMore = false;
if (tryMore) {
	forcedPortalWorld = 120;
}

var autobuyingEquipmentNumber = 33;
var autobuyingArmNumber = 31;


var gatherMetalZone = 10;
var startMapsWorld = 50;

var goldenMode = 'Void';
var minGoldenHeliumBeforeBattle = 5.0;//2.0;
var minGoldenVoidBeforeHelium = -1.0; //0.5;

var voidMapZone = 91;
var maxVoidMapZone = 111;

var abandonChallengeZone = 74;
var mapMode = "lsc";

if (gogogo) {
	goldenMode = 'Battle'; 
	//voidMapZone = -1;
	startMapsWorld = 49;
	dontPortal = true;
	abandonChallengeZone = -1;
	mapMode = "lsc";
}

if (goForScruffy) {
	dontPortal = false;
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


var minJestimpZone = 20;
var jestimpTarget = null;
var jestimpMode = false;
var saveString = null;
var wentForSmithy = false;
var changeAutoBuy = true;
var set01 = true;

var fluffyStart;

if (game.global.world == 1)
	fluffyStart = Fluffy.currentExp[1];

if (typeof fluffyStart === "undefined")
	fluffyStart = 0;

if (changeAutobuyingNumbersInterval) { clearInterval(changeAutobuyingNumbersInterval); changeAutobuyingNumbersInterval = null; }
var changeAutobuyingNumbersInterval = setInterval(function() {
	if (changeAutoBuy && !game.global.mapsActive) {
		if (game.global.world > 0) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 20; buyShields = false; }
		if (game.global.world >= 40) { autobuyingEquipmentNumber = 12; autobuyingArmNumber = 10; }
		if (game.global.world >= 45) { autobuyingEquipmentNumber = 15; autobuyingArmNumber = 12; }
		if (game.global.world >= 50) { autobuyingEquipmentNumber = 34; autobuyingArmNumber = 20; }
		if (game.global.world >= 60) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 6; }
		if (game.global.world >= 65) { autobuyingEquipmentNumber = 22; autobuyingArmNumber = 8; }
		if (game.global.world >= 66) { autobuyingEquipmentNumber = 25; autobuyingArmNumber = 17; }
		if (game.global.world >= 69) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 10; }
		if (game.global.world >= 75) { autobuyingEquipmentNumber = 34; autobuyingArmNumber = 20; }
		if (game.global.world >= 76) { autobuyingEquipmentNumber = 40; autobuyingArmNumber = 20; }
		if (game.global.world >= 80) { autobuyingEquipmentNumber = 35; autobuyingArmNumber = 20; }
		if (game.global.world >= 85) { autobuyingEquipmentNumber = 55; autobuyingArmNumber = 20; }
		if (game.global.world >= 89) { autobuyingEquipmentNumber = 32; autobuyingArmNumber = 20; }
		if (game.global.world >= 94) { autobuyingEquipmentNumber = 35; autobuyingArmNumber = 20; }
		if (game.global.world >= 98) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 20; }
		if (game.global.world >= 100) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 20; }
		if (game.global.world >= 104) { autobuyingEquipmentNumber = 25; autobuyingArmNumber = 20; buyShields = true; }
		if (game.global.world >= 105) { autobuyingEquipmentNumber = 28; autobuyingArmNumber = 20; }
		if (game.global.world >= 108) { autobuyingEquipmentNumber = 14; autobuyingArmNumber = 14; }
		if (game.global.world >= 113) { autobuyingEquipmentNumber = 16; autobuyingArmNumber = 15; }
		if (game.global.world >= 114) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 16; }
		if (game.global.world >= 116) { autobuyingEquipmentNumber = 22; autobuyingArmNumber = 17; }
		if (game.global.world >= 117) { autobuyingEquipmentNumber = 24; autobuyingArmNumber = 18; }
		if (tryMore) {
			if (game.global.world >= 118) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 24; }
		}
	}
}, 1000 * 1);


//if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
//var jestimpInterval = setInterval(function() { 
//	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Prismatic Palace")
//		return;
//	
//	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Melting Point")
//		return;
//		
//	var tmpTarget = jestimpTarget;
//	if (tmpTarget != 'science')
//		tmpTarget = game.global.playerGathering;
//	
//	if (game.global.world >= minJestimpZone || minJestimpZone == -1) {
//		var badGuyNameString = (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText) || null;
//		if (badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") > -1) {
//			saveString = save(true);
//			jestimpMode = true;
//		}
//		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") == -1) {
//			var logMessages = [ ...(document.getElementById('log').getElementsByClassName('message'))]
//				.filter(function (el) { return el.innerText.toLowerCase().indexOf('jestimp') > -1; })
//			if (logMessages.length) {
//				if (logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(tmpTarget) > -1) {
//					jestimpMode = false;
//					saveString = null;
//				} else {
//					if (saveString) {
//						load(saveString);
//					}
//				}
//			}
//		}
//	}
//}, 100);



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
		var things = upgradesHereDiv.getElementsByClassName('thing');
		if (things.length > 0) {
			if (document.getElementById('Supershield') && document.getElementById('Supershield').offsetParent != null) {
				return things.length <= 1;
			}
			return things.length == 0;
		}
	}
	return true;
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
}, 1000);

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
	if (game.global.world <= 1)
		return;

	if (buySmithies) buyBuilding('Smithy');
	if (buyMeteorologists) buyThing('Meteorologist');
	if (document.getElementById('Tribute')) if (buyTributes) { numTab('6'); setMax(0.1); buyBuilding('Tribute'); numTab('1'); }
	if (buyShields && autobuyingArmNumber > game.equipment.Shield.level) buyThing('Shield');
	if (buyCollectors) { numTab('6'); setMax(0.1); buyBuilding('Collector'); numTab('1'); }
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
	}, 500);
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
var forceGatherMode = null;

var whatShouldIGoFor = function () {
	if (forceGatherMode)
		return forceGatherMode;
	
	if (game.buildings.Tribute.owned < tributesWanted) {
		return 'food';
	}
	
	if (smithiesWanted > -1 && game.global.world >= minMeltingZone && !wentForSmithy) {
		if (smithiesWanted > game.buildings.Smithy.owned) {
			if (game.resources.wood.owned < 5000 * (Math.pow(50, smithiesWanted - 1))) {
				return 'wood';
			}
		}
	}
	
	return 'metal';
}

var hireEmployeesInterval;
if (hireEmployeesInterval) { clearInterval(hireEmployeesInterval); hireEmployeesInterval = null; }
var hireEmployeesInterval = setInterval(function() {
	var goFor = whatShouldIGoFor();
	setGather(goFor);
	
	if (goFor != 'food'
			&& game.global.lastClearedCell < 20 
			&& !game.global.mapsActive) {
		fireMode();
		setMax(1, false);
		numTab(6);
		cancelTooltip();
		buyJob('Farmer');
		buyJob('Lumberjack');
		buyJob('Miner');
		fireMode();
		
		if (goFor == 'food') {
			buyJob('Farmer');
		} else if (goFor == 'wood') {
			buyJob('Lumberjack');
		} else {
			buyJob('Miner');
		}
	}
}, 200);

var hireFarmersInterval;
if (hireFarmersInterval) { clearInterval(hireFarmersInterval); hireFarmersInterval = null; }
var hireFarmersInterval = setInterval(function() {
	if (!autoHireFarmers || whatShouldIGoFor() != 'food')
		return;

	setMax(0.25, false);
	numTab(6);
	cancelTooltip();
	buyJob('Farmer');
	numTab(1);
}, 500)

var getStackCount = function(stackType) {
	var stack = document.getElementById(stackType);
	if (stack) {
		var spans = stack.getElementsByTagName("SPAN");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].getAttribute('id') == "gammaStack") {
				return parseInt(spans[i].innerText);
			}
		}
	}
	return 0;
}

var shouldFightSomeMap = function() {
	if (game.global.world < 9 || game.global.lastClearedCell < 0)
		return false;
	
	if (dontMap || game.global.mapsActive)
		return false;
	
	if (game.global.world == forcedPortalWorld
		&& (game.global.challengeActive + "") === "")
		return false;
		
	if (!game.global.mapsActive && voidMapZone != -1 && (game.global.world >= voidMapZone && game.global.world <= maxVoidMapZone) && game.global.lastClearedCell > 88) {
		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			if (game.global.mapsOwnedArray[i].location == "Void") {
				return true;
			}
		}
	}
	
	if (!game.global.mapsActive && game.global.lastClearedCell < 8 && game.buildings.Smithy.owned == smithiesWanted && game.global.world > minMeltingZone) {
		for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
			if (game.global.mapsOwnedArray[i].name == "Melting Point") {
				var button = document.getElementById(game.global.mapsOwnedArray[i].id);
				if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
					return true;
				}
			}
		}
	}

	if (plusZeroZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
		return true;
	}

	if (plusOneZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
		return true;
	}
	
	if (plusTwoZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
		return true;
	}
	
	if (plusThreeZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
		return true;
	}
	
	if (plusFourZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
		return true;
	}
	
	if (plusFiveZones.indexOf(game.global.world) > -1
		&& !game.global.mapsActive
		&& game.global.mapBonus < 1
	) {
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
		
		if (game.global.playerGathering == 'wood') {
			document.getElementById("advSpecialSelect").value = 'lwc'; 
		} else if (game.global.playerGathering == 'metal') {
			document.getElementById("advSpecialSelect").value = 'lmc'; 
		} else {
			document.getElementById("advSpecialSelect").value = 'lsc';
		}
		
		if (prestigiousZones.indexOf(game.global.world) > -1) {
			document.getElementById("advSpecialSelect").value = 'p';
		}
		
		if (game.global.world == 45 && game.resources.fragments.owned > 5100000000 && !game.global.mapsActive && game.global.mapBonus < 1) {
			document.getElementById("advExtraLevelSelect").value = "5";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			document.getElementById("advSpecialSelect").value = 0;
		}
		
		if (game.global.world == 44 && game.resources.fragments.owned > 20400000000 && !game.global.mapsActive && game.global.mapBonus < 1) {
			document.getElementById("advExtraLevelSelect").value = "6";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			document.getElementById("advSpecialSelect").value = 0;
		}
		
		if (game.global.world == 43 && game.resources.fragments.owned > 81600000000 && !game.global.mapsActive && game.global.mapBonus < 1) {
			document.getElementById("advExtraLevelSelect").value = "7";
			document.getElementById("biomeAdvMapsSelect").value = "Random";
			document.getElementById("advSpecialSelect").value = 0;
		}
		
		buyMap();
		
		if (plusZeroZones.indexOf(game.global.world) > -1) {
			buyMap();
		}
		
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

		if (game.buildings.Smithy.owned == smithiesWanted && game.global.lastClearedCell < 8 && game.global.world > minMeltingZone) {
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
		
		if (game.global.world >= voidMapZone && voidMapZone != -1 && game.global.world <= maxVoidMapZone) {
			if (!specialZoneRun && (game.global.lastClearedCell > 88 || game.global.world > voidMapZone)) {
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
		
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1) {
			toggleSetting('repeatUntil');
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1) {
			toggleSetting('exitTo')
		}
	}
}, 1200);

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
//		buyPortalUpgradeById('Tenacity');
		buyPortalUpgradeById('Carpentry');
//		buyPortalUpgradeById('Looting');
		buyPortalUpgradeById('Resilience');
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
}, 1000 * 60 * 2);

var goodModsNames = "|empty|DragimpSpeed|MinerSpeed|fragmentsDrop|FarmerSpeed|LumberjackSpeed|FluffyExp|";
var goodModsNames2 = "|empty|foodDrop|gemsDrop|fragmentsDrop|metalDrop|woodDrop|FluffyExp|";
var goodModsNames3 = "|empty|critChance|trimpAttack|critDamage|prismatic|trimpHealth|plaguebringer|voidMaps|"; //FluffyExp| //"critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";


//var goodModsNames = "empty|MinerSpeed|ExplorerSpeed|FarmerSpeed|LumberjackSpeed|DragimpSpeed|FluffyExp|critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";
//var goodModsNames = "empty|MinerSpeed|ExplorerSpeed|FarmerSpeed|LumberjackSpeed|DragimpSpeed|"; //FluffyExp| //"critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";
//var goodModsNames = "empty|critChance|trimpAttack|critDamage|prismatic|trimpHealth|plaguebringer"; //FluffyExp| //"critChance|trimpAttack|critDamage|gammaBurst|prismatic|trimpHealth";
//

if (collectHeirloomsInterval) { clearInterval(collectHeirloomsInterval); collectHeirloomsInterval = null; }
var collectHeirloomsInterval = setInterval(function() {
	if (getMaxCarriedHeirlooms() > game.global.heirloomsCarried.length) {
		for (var i = 0; i < game.global.heirloomsExtra.length; i++) {
			var theHeirloom = game.global.heirloomsExtra[i];
			if (theHeirloom.rarity > 9) {
				var hMods = theHeirloom.mods;
				var goodMods = 0;
				for (var j = 0; j < hMods.length; j++) {
					if (goodModsNames.indexOf(hMods[j][0]) > -1) {
						goodMods++;
					}
				}
				if (goodMods > 5) {
					selectHeirloom(i, "heirloomsExtra", document.getElementById("extraHeirloomsHere").getElementsByClassName("heirloomThing")[i])
					carryHeirloom();
					return;
				}

				var goodMods = 0;
				for (var j = 0; j < hMods.length; j++) {
					if (goodModsNames2.indexOf(hMods[j][0]) > -1) {
						goodMods++;
					}
				}
				if (goodMods > 5) {
					selectHeirloom(i, "heirloomsExtra", document.getElementById("extraHeirloomsHere").getElementsByClassName("heirloomThing")[i])
					carryHeirloom();
					return;
				}

				var goodMods = 0;
				for (var j = 0; j < hMods.length; j++) {
					if (goodModsNames3.indexOf(hMods[j][0]) > -1) {
						goodMods++;
					}
				}
				if (goodMods > 5) {
					selectHeirloom(i, "heirloomsExtra", document.getElementById("extraHeirloomsHere").getElementsByClassName("heirloomThing")[i])
					carryHeirloom();
					return;
				}
			}
		}
	}
}, 3000);

var isOkToPortal = function() {
	if (game.global.lastClearedCell < 0)
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
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();

		logFluffyExp();
		portalClicked();
		console.log('---');
		if (challengeToTry)
			selectChallenge(challengeToTry);
		activateClicked();
		activatePortal();
		wentForSmithy = false;
		setTimeout(function() {
			window.localStorage.setItem(optimizerCookieName, '');
			pressFight();
			buyPortalUpgrades();
			fluffyStart = Fluffy.currentExp[1];
			jestimpTarget = "food"
			mapMode = "lsc";
		}, 1000);
	}
}, 300);


var minLogZone = 90;
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



if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 60 * 2);

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
	return game.global.world > 106;
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
}, 1000);

if (pressFightInterval) { clearInterval(pressFightInterval); pressFightInterval = null; }
var pressFightInterval = setInterval(function() { pressFight(); }, 5000);

//if (infoInterval) { clearInterval(infoInterval); infoInterval = null; }
//var infoInterval = setInterval(function() { console.log(challengeToTry); }, 10000);


var tryOptimize = true;
var optimizerCookieName = 'trimps-melt-save';
var debugOptimizer = false;

function setCookie(cname, cvalue, exdays) {
	window.localStorage.setItem(cname, cvalue);
}

function setSaveCookie() {
	setCookie(optimizerCookieName, 
		game.global.totalRadPortals + 
		'###' + Math.round(((new Date() * 1) - game.global.portalTime) / 1000) + 
		'###'+ (game.global.world * 100 + game.global.lastClearedCell) + 
		'###' + save(true), 10);
}

function getCookie(cname) {
  return window.localStorage.getItem(cname);
}

var shouldLoadOptimizedSave = function(reset, seconds, cell, debug) {
	if (debug) {
		console.log('shouldLoadOptimizedSave');
	}
	
	if (game.global.lastClearedCell < 10 || game.global.mapsActive)
		return false;

	var myPortal = game.global.totalRadPortals;
	var mySeconds = Math.round(((new Date() * 1) - game.global.portalTime) / 1000);
	var myCell = (game.global.world * 100 + game.global.lastClearedCell);
	
	if (reset != myPortal) {
		if (debug) {
			console.log('shouldLoadOptimizedSave wrong portal ' + reset + " " + game.global.totalRadPortals);
		}
		return false;
	}

	//if (mySeconds >= seconds) {
		//if (debug) {
		//	console.log('shouldLoadOptimizedSave mySeconds >= seconds ' + mySeconds + " " + seconds);
		//}
		if ((myCell + 4) <= cell) {
			if (debug) {
				console.log('shouldLoadOptimizedSave true: mySeconds >= seconds && ((myCell + 4) <= cell) ' + mySeconds + " " + seconds + " " + (myCell + 4) + " " + cell);
			}
			return true;
		}
	//}
	
	if (debug) {
		console.log('shouldLoadOptimizedSave do nothing ' 
			+ reset + " " + myPortal
			+ " " + mySeconds + " " + seconds
			+ " " + myCell + " " + cell
		);
	}
	
	return false;
}

var shouldSaveOptimizedSave = function(reset, seconds, cell, debug) {
	var myPortal = game.global.totalRadPortals;
	var mySeconds = Math.round(((new Date() * 1) - game.global.portalTime) / 1000);
	var myCell = (game.global.world * 100 + game.global.lastClearedCell);
	
	if (game.buildings.Smithy.owned == smithiesWanted)
		return false;
	
	if (debug) {
		console.log('shouldSaveOptimizedSave');
	}
	
	if (myPortal < reset) {
		if (debug) {
			console.log('shouldSaveOptimizedSave false: previous portal ' + reset + " " + myPortal);
		}
		return false;
	}
	
	if (game.global.lastClearedCell < 10)
		return false;
	
	if (myPortal > reset) {
		if (debug) {
			console.log('shouldSaveOptimizedSave true: next portal ' + reset + " " + myPortal);
		}
		return true;
	}

	if (myCell > cell) {
		if (debug) {
			console.log('shouldSaveOptimizedSave true: myCell > cell ' + myCell + " " + cell);
		}
		return true;
	}
/*
	if (mySeconds <= seconds && myCell >= cell + 5) {
		if (debug) {
			console.log('shouldSaveOptimizedSave true: mySeconds <= seconds && myCell >= cell + 5 ' + mySeconds + " " + seconds + " " + myCell + " " + cell);
		}
		return true;
	}
*/
	if (debug) {
		console.log('shouldSaveOptimizedSave do nothing ' 
			+ reset + " " + myPortal
			+ " " + mySeconds + " " + seconds
			+ " " + myCell + " " + cell
		);
	}
	
	return false;
}

if (cookieOptimizerInterval) { clearInterval(cookieOptimizerInterval); cookieOptimizerInterval = null; }
var cookieOptimizerInterval = setInterval(function() { 
	if (!tryOptimize)
		return;
	
	if (game.global.lastClearedCell < 10 || game.global.mapsActive)
		return false;
	
	if (game.global.world < 92)
		return false;

	if (debugOptimizer)
		console.log('cookieOptimizerInterval');
	
	var cookieValue = getCookie(optimizerCookieName);
	
	if (cookieValue && cookieValue != '') {
		if (debugOptimizer)
			console.log(cookieValue.substring(0, 100));
		
		var reset = parseInt(cookieValue.split('###')[0]);
		var seconds = parseInt(cookieValue.split('###')[1]);
		var cell = parseInt(cookieValue.split('###')[2]);
		var saveString = cookieValue.split('###')[3];
		
		if (shouldLoadOptimizedSave(reset, seconds, cell, debugOptimizer)) {
			if (debugOptimizer)
				console.log('loading save');
			
			load(saveString);

		} else if (shouldSaveOptimizedSave(reset, seconds, cell, debugOptimizer)) {
				setSaveCookie();
		}
		
	} else {
		if (debugOptimizer)
			console.log('empty cookie');

		setSaveCookie();
	}
}, 300 - Math.floor(Math.random() * 100));


var tryOptimizeVoids = true;
var voidsOptimizerCookieName = 'trimps-melt-voids-save';

function setVoidSaveCookie() {
	setCookie(voidsOptimizerCookieName, game.global.totalRadPortals + '###' + game.buildings.Tribute.owned + '###'+ game.global.totalVoidMaps + '###' + save(true), 10);
}

var shouldLoadVoidsOptimizedSave = function(reset, tributes, voidMaps, debug) {
	if (debug) {
		//console.log('shouldLoadVoidsOptimizedSave');
	}
	
	if (reset != game.global.totalRadPortals) {
		if (debug) {
			//console.log('shouldLoadVoidsOptimizedSave wrong portal ' + reset + " " + game.global.totalRadPortals);
		}
		return false;
	}

	if (voidMaps > game.global.totalVoidMaps) {
		console.log('shouldLoadVoidsOptimizedSave save has more void maps ' + voidMaps + " " + game.global.totalVoidMaps);
		return true;
	}
	
	return false;
}

var shouldSaveVoidsOptimizedSave = function(reset, tributes, voidMaps, debug) {
	if (debug) {
		//console.log('shouldSaveVoidsOptimizedSave');
	}
	
	if (game.global.totalRadPortals < reset) {
		if (debug) {
			//console.log('shouldSaveVoidsOptimizedSave false: previous portal ' + reset + " " + game.global.totalRadPortals);
		}
		return false;
	}
	
	if (game.global.totalRadPortals > reset) {
		if (debug) {
			console.log('shouldSaveVoidsOptimizedSave true: next portal ' + reset + " " + game.global.totalRadPortals);
		}
		return true;
	}

	if (voidMaps < game.global.totalVoidMaps) {
		if (debug) {
			console.log('shouldSaveVoidsOptimizedSave true: more void maps than save ' + voidMaps + " " + game.global.totalVoidMaps);
		}
		return true;
	}
	
	//if (voidMaps == game.global.totalVoidMaps && tributes < game.buildings.Tribute.owned) {
	//	if (debug) {
	//		console.log('shouldSaveVoidsOptimizedSave true: more tributes than save ' + tributes + " " + game.buildings.Tribute.owned);
	//	}
	//	return true;
	//}
	
	if (debug) {
		//console.log('shouldSaveVoidsOptimizedSave do nothing ' 
		//	+ reset + " " + game.global.totalRadPortals
		//	+ " " + voidMaps + " " + game.global.totalVoidMaps
		//	+ " " + tributes + " " + game.buildings.Tribute.owned
		//);
	}
	
	return false;
}

if (cookieVoidsOptimizerInterval) { clearInterval(cookieVoidsOptimizerInterval); cookieVoidsOptimizerInterval = null; }
var cookieVoidsOptimizerInterval = setInterval(function() { 
	if (!tryOptimizeVoids)
		return;
	
	if (game.global.world >= voidMapZone
		|| game.global.world <= (voidMapZone - 5))
	return;

	//if (debugOptimizer)
		//console.log('cookieVoidsOptimizerInterval');
	
	var cookieValue = getCookie(voidsOptimizerCookieName);
	
	if (cookieValue) {
		if (debugOptimizer)
			console.log(cookieValue.substring(0, 100));
		
		var reset = cookieValue.split('###')[0];
		var tributes = cookieValue.split('###')[1];
		var voidMaps = cookieValue.split('###')[2];
		var saveString = cookieValue.split('###')[3];
		
		if (shouldLoadVoidsOptimizedSave(reset, tributes, voidMaps, debugOptimizer)) {
			if (debugOptimizer)
				console.log('loading save');
			
			load(saveString);
		} else if (shouldSaveVoidsOptimizedSave(reset, tributes, voidMaps, debugOptimizer)) {
				setVoidSaveCookie();
		}
		
	} else {
		if (debugOptimizer)
			console.log('empty cookie');

		setVoidSaveCookie();
	}
}, 500 - Math.floor(Math.random() * 100));


//TMP REMOVE
var lastEggMessage = '';
setInterval(function() {
	var eggCells = document.getElementsByClassName("eggCell");
	if (eggCells.length && eggCells[0].offsetParent != null) {
		eggCells[0].click();
		setTimeout(function() {
			if (document.getElementsByClassName("eggMessage").length && document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText != lastEggMessage) {
				lastEggMessage = document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText;
				if (lastEggMessage.indexOf("food!") === -1 && lastEggMessage.indexOf("wood!") === -1 && lastEggMessage.indexOf("metal!") === -1) {
					console.log(getPortalTime() + " " +lastEggMessage);
				}
			}
		}, 200);
	}
}, 1000)