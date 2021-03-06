var ignorePrismaticPalace = false;
var dontPortal = false;
var challengeToTry = 'Archaeology'; 
//var challengeToTry = 'Bublé'; 
var minMeltingZone = 87;
var autoCancelActive = false;
var smithiesWanted = 17;

var collectGambeson = {};
//collectGambeson["map35"] = 5;

var collectBoots = {};
//collectBoots["map41"] = 5;


var forcedPortalWorld = 96;

var plusZeroZones = [20, 24, 75, 77, 85, 86, 87, 88, 89, 94, 95, 96, 97]
var plusOneZones = [30, 34, 40, 44, 50, 54, 60, 61, 62, 63, 64, 70, 71, 72, 73, 74, 80, 81, 82, 83, 84/*54, 60, 61, 64, 80, 81, 82, 83, 84 /*, 90, 91, 92, 93, 94*//* 20% more dmg */];
var plusTwoZones = [48, 79, 80, 83, ,89, 90, 91, 92, 93];//[89, 90, 91, 92, 93];//61, 63/*69, 70*/];
var plusThreeZones = [55];
var plusFourZones = [];
var plusFiveZones = [];
var plusSixZones = [];


var autobuyingEquipmentNumber = 33;
var autobuyingArmNumber = 31;


var gatherMetalZone = 10;
var startMapsWorld = 50;

var goldenMode = 'Helium';
var minGoldenHeliumBeforeBattle = 500.0;//2.0;
var minGoldenVoidBeforeHelium = 500.0; //0.5;

var voidMapZone = 93;
var maxVoidMapZone = 95;

var abandonChallengeZone = 100;
var mapMode = "lsc";

mapMode = "lsc";


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
var jestimpTarget = 'food';
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
	if (smithiesWanted > -1 && game.global.world >= minMeltingZone && !wentForSmithy) {
		if (smithiesWanted > game.buildings.Smithy.owned) {
			if (game.resources.metal.owned > 10000 * (Math.pow(50, smithiesWanted - 1))) {
				fireMode();
				setMax(1, false);
				numTab(6);
				cancelTooltip();
				buyJob('Miner');
				fireMode();
				buyJob('Lumberjack');
				jestimpTarget = "wood";
				numTab(1);
				setGather('wood');
				mapMode = "lwc";
			} else {
				fireMode();
				setMax(1, false);
				numTab(6);
				cancelTooltip();
				buyJob('Lumberjack');
				fireMode();
				buyJob('Miner');
				jestimpTarget = "metal";
				numTab(1);
				setGather('metal');
			}
		} else {
			fireMode();
			setMax(1, false);
			numTab(6);
			cancelTooltip();
			buyJob('Lumberjack');
			fireMode();
			buyJob('Miner');
			jestimpTarget = "metal";
			numTab(1);
			wentForSmithy = true;
			setGather('metal');
		}
	}
	
	if (wentForSmithy) {
		mapMode = "lmc";
	}
	
	if (game.global.world > 88) {
		jestimpTarget = "science";
	}
}, 10000 * 1);


if (changeAutobuyingNumbersInterval) { clearInterval(changeAutobuyingNumbersInterval); changeAutobuyingNumbersInterval = null; }
var changeAutobuyingNumbersInterval = setInterval(function() {
	if (changeAutoBuy && !game.global.mapsActive) {
		if (game.global.world > 0) { autobuyingEquipmentNumber = 33; autobuyingArmNumber = 31; buyShields = false; }
		//if (game.global.world >= 40) { autobuyingEquipmentNumber = 12; autobuyingArmNumber = 10; }
		//if (game.global.world >= 45) { autobuyingEquipmentNumber = 15; autobuyingArmNumber = 12; }
		//if (game.global.world >= 50) { autobuyingEquipmentNumber = 34; autobuyingArmNumber = 20; }
		//if (game.global.world >= 60) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 6; }
		//if (game.global.world >= 65) { autobuyingEquipmentNumber = 22; autobuyingArmNumber = 8; }
		//if (game.global.world >= 66) { autobuyingEquipmentNumber = 25; autobuyingArmNumber = 17; }
		//if (game.global.world >= 69) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 10; }
		//if (game.global.world >= 75) { autobuyingEquipmentNumber = 34; autobuyingArmNumber = 34; }
		//if (game.global.world >= 76) { autobuyingEquipmentNumber = 40; autobuyingArmNumber = 40; }
		//if (game.global.world >= 80) { autobuyingEquipmentNumber = 35; autobuyingArmNumber = 35; }
		//if (game.global.world >= 85) { autobuyingEquipmentNumber = 55; autobuyingArmNumber = 40; }
		//if (game.global.world >= 89) { autobuyingEquipmentNumber = 32; autobuyingArmNumber = 32; }
		if (game.global.world >= 93) { autobuyingEquipmentNumber = 50; autobuyingArmNumber = 45; }
	}
}, 1000 * 1);


if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() { 
	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Prismatic Palace")
		return;
	
	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Melting Point")
		return;
		
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


var testGoldenBattle = true;
var buyGoldUpgrade = function() {
	var id = goldenMode;
	if (id == 'Void' && game.goldenUpgrades.Void.currentBonus > minGoldenVoidBeforeHelium) {
		id = 'Helium';
	}
	if (id == 'Helium' && game.goldenUpgrades.Helium.currentBonus > minGoldenHeliumBeforeBattle) {
		id = 'Battle';
	}
	
	if (testGoldenBattle) {
		if (document.getElementById("HeliumGolden") && document.getElementById("goldenHeliumOwned").innerHTML.indexOf("25") > -1 && document.getElementById("goldenBattleOwned").innerHTML.indexOf("0") == 0)  {
			id = 'Battle';
		}
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
				return upgradesHereDiv.getElementsByClassName('thing').length <= 6;
			}
			return upgradesHereDiv.getElementsByClassName('thing').length == 5;
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

var autoHireFarmers = true;
if (hireFarmersInterval) { clearInterval(hireFarmersInterval); hireFarmersInterval = null; }
var hireFarmersInterval = setInterval(function() {
	if (!autoHireFarmers)
		return;
	if (game.global.world < 86) {
		setMax(0.25, false);
		numTab(6);
		cancelTooltip();
		buyJob('Farmer');
		buyJob('Scientist');
		numTab(1);
		setGather('food');
	} else {
		if (game.global.world == 86 && game.global.lastClearedCell <= 88) {
			setMax(0.25, false);
			numTab(6);
			cancelTooltip();
			buyJob('Farmer');
			setGather('food');
			numTab(1);
		} else {
			fireMode();
			setMax(1, false);
			numTab(6);
			cancelTooltip();
			buyJob('Farmer');
			fireMode();
			buyJob('Miner');
			
			if (smithiesWanted > -1 
				&& game.global.world >= minMeltingZone 
				&& !wentForSmithy 
				&& smithiesWanted > game.buildings.Smithy.owned
				&& game.resources.metal.owned > 10000 * (Math.pow(50, smithiesWanted - 1))) {
				setGather('wood');
			}
			else {
				setGather('metal');
			}
			
			jestimpTarget = 'metal';
			numTab(1);
			mapMode = "lmc";
		}
	}
	if (game.global.world > 88) {
		jestimpTarget = "science";
	}
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
	if (game.global.world < 9)
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
	
	if (!game.global.mapsActive && game.global.lastClearedCell < 10 && game.buildings.Smithy.owned == smithiesWanted && game.global.world > minMeltingZone) {
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


var tributesWanted = 1250;
var tributesPushMap = 86;

if (quitMapInterval) { clearInterval(quitMapInterval); quitMapInterval = null; }
var quitMapInterval = setInterval(function() { 
	if (game.global.world == tributesPushMap 
		&& game.buildings.Tribute.owned >= tributesWanted 
		&& game.global.mapsActive) {
		setSaveCookie();
		while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Items') == -1) {
			toggleSetting('repeatUntil');
		}
	}
}, 400);


if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();
		
		document.getElementById("advSpecialSelect").value = mapMode;
		
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

		if (game.buildings.Smithy.owned == smithiesWanted && game.global.lastClearedCell < 10 && game.global.world > minMeltingZone) {
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
		
		if (game.global.world == 90) {
			while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Any') == -1) {
				toggleSetting('repeatUntil');
			}
		}

		if (game.global.world == tributesPushMap) {
			while (document.getElementById('togglerepeatUntil').innerHTML.indexOf('Forever') == -1) {
				toggleSetting('repeatUntil');
			}
		}
			
		while (document.getElementById('toggleexitTo').innerHTML.indexOf('World') == -1) {
			toggleSetting('exitTo')
		}
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
}, 1000 * 30 * 1);

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
		setGather('food');
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

var switchHeirloomZone = 85;
var isItTimeForMorePowerfulHeirloom = function() {
	if (game.global.world >= forcedPortalWorld)
		return false;
	
	if (game.global.mapsActive)
		return true;
	
	if (game.global.world < switchHeirloomZone)
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
}, 400);


if (pressFightInterval) { clearInterval(pressFightInterval); pressFightInterval = null; }
var pressFightInterval = setInterval(function() { pressFight(); }, 5000);

//if (infoInterval) { clearInterval(infoInterval); infoInterval = null; }
//var infoInterval = setInterval(function() { console.log(challengeToTry); }, 10000);


var tryOptimize = true;
var optimizerCookieName = 'trimps-Archaeology-save';
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
		if ((myCell + 3) <= cell) {
			if (debug) {
				console.log('shouldLoadOptimizedSave true: mySeconds >= seconds && ((myCell + 3) <= cell) ' + mySeconds + " " + seconds + " " + (myCell + 3) + " " + cell);
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

if (buyRelicUpgradesInterval) { clearInterval(buyRelicUpgradesInterval); buyRelicUpgradesInterval = null; }
var buyRelicUpgradesInterval = setInterval(function() { 
	var attack = game.challenges.Archaeology.points.attack;
	var enemyAttack = game.challenges.Archaeology.points.enemyAttack;
	var radon = game.challenges.Archaeology.points.radon;
	var science = game.challenges.Archaeology.points.science;
	var breed = game.challenges.Archaeology.points.breed;
	
	var wantedAttack = -40;
	var wantedEnemyAttack = -50;
	var wantedRadon = 50;
	var wantedScience = 50;
	var wantedBreed = -85;
	
	if (game.global.world > 50) {
	}
	
	if (game.global.world > 60) {
		wantedEnemyAttack = -25;
		wantedAttack = -25;
		//wantedRadon = 40;
		//wantedScience = 40;
	}
	
	if (game.global.world > 70) {
		wantedAttack = 0;
		//wantedRadon = 40;
		//wantedEnemyAttack = -10;
		//wantedScience = 40;
	}
	
	if (game.global.world > 80) {
		wantedEnemyAttack = -15;
	}
	
	if (game.global.world > 85) {
		wantedEnemyAttack = -10;
	}
	
	if (game.global.world >= voidMapZone) {
		wantedAttack = 5;
	}
	
	if (wantedRadon > radon)
		buyUpgrade('radonRelic');
	
	if (wantedScience > science)
		buyUpgrade('scienceRelic');
	
	if (wantedAttack > attack)
		buyUpgrade('attackRelic');
	
	if (wantedEnemyAttack > enemyAttack)
		buyUpgrade('enemyAttackRelic');
	
	if (wantedBreed > breed)
		buyUpgrade('breedRelic');
	
	// 30 -25
	// 40 -15
	// 60 -5
	
	for (var i = -1; i > Math.min(game.global.world - 90, -5); i--) {
		
		if (wantedRadon > radon + i)
			buyUpgrade('radonRelic');
		
		if (wantedScience > science + i)
			buyUpgrade('scienceRelic');
		
	}
	
	if (game.global.world >= voidMapZone) {
		buyUpgrade('radonRelic');
	}
	
}, 1000);