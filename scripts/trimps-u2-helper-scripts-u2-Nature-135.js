var challengeToTry = "Nurture";

if (!game.global.autoJobsSettingU2.enabled)
	toggleAutoJobs();

var dontPortal = false;
var lastVoidMapZone = 162;
var minMeltingZone = 164;
var trimpleOfDoomZone = 164;
var switchHeirloomZone = lastVoidMapZone + 1;
var smithiesWanted = 28;
var forcedPortalWorld = 169;
var lastFarmersZone = 124;
var tryBattle150 = true;

var plusZeroZones = [20, 24, 79, 96, lastFarmersZone, 128, 134];
var plusOneZones = [40, 30, 31, 160, 161, 164];
var plusTwoZones = [59, 69, 79, 89, 99, 109, 119, 129, 139, 162];

var plusThreeZones = [];
var plusFourZones = [];
var plusFiveZones = [45, 54, 55];
var plusSixZones = [];
var plusSevenZones = [60, 150];
var extraZones = [];

var autobuyingEquipmentNumber = 33;
var autobuyingArmNumber = 31;

var gatherMetalZone = 10;

var goldenMode = "Void";
var minGoldenHeliumBeforeBattle = 50000.0;//2.0;
var minGoldenVoidBeforeHelium = 0.71; //0.5;

var voidMapZone = 135;

var abandonChallengeZone = 1000;
var mapMode = "lsc";

var dontMap = false;
var buySmithies = true;
var buyTributes = true;
var buyMeteorologists = true;

var switchToMetalAutomatically = true;
var lastFluffyExpLog = 0;

var saveString = null;
var wentForSmithy = false;
var changeAutoBuy = true;
var set01 = true;

var fluffyStart;

if (game.global.world == 1)
	fluffyStart = Fluffy.currentExp[1];

if (typeof fluffyStart === "undefined")
	fluffyStart = 0;

var isJestimp = function() {
	if (!game.global.mapsActive)
		return false;
	
	return game.global.mapGridArray[game.global.lastClearedMapCell + 1].name.toLowerCase().indexOf("jestimp") > -1;
}

var jestimpMode = -1;
if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() {
	if (document.getElementById("worldName") && document.getElementById("worldName").innerText == "Atlantrimp")
		return;

	if (document.getElementById("worldName") && document.getElementById("worldName").innerText == "Melting Point")
		return;

	var tmpTarget = game.global.playerGathering;

	if (game.global.world > 145) {
		if (isJestimp()) {
			saveString = save(true);
			jestimpMode = game.global.lastClearedMapCell + 1;
		}
		
		if (jestimpMode != -1 && (game.global.lastClearedMapCell + 1 != jestimpMode)) {
			var logMessages = [ ...(document.getElementById("log").getElementsByClassName("LootMessage"))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf("jestimp") > -1; })
			if (logMessages.length) {
				if (logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(tmpTarget) > -1) {
					jestimpMode = -1;
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



if (changeAutobuyingNumbersInterval) { clearInterval(changeAutobuyingNumbersInterval); changeAutobuyingNumbersInterval = null; }
var changeAutobuyingNumbersInterval = setInterval(function() {
	if (changeAutoBuy && !game.global.mapsActive) {
		if (game.global.world > 0) { autobuyingEquipmentNumber = 33; autobuyingArmNumber = 31; buyShields = false; }
		if (game.global.world >= 104) { autobuyingEquipmentNumber = 50; autobuyingArmNumber = 50; }
		if (game.global.world >= 108) { autobuyingEquipmentNumber = 35; autobuyingArmNumber = 35; }
		if (game.global.world >= 120) { autobuyingEquipmentNumber = 20; autobuyingArmNumber = 22; }
		if (game.global.world >= 125) 
			{ autobuyingEquipmentNumber = 22; autobuyingArmNumber = 27; }
		if (game.global.world >= 126) 
			{ autobuyingEquipmentNumber = 25; autobuyingArmNumber = 27; }
		if (game.global.world >= 128) 
			{ autobuyingEquipmentNumber = 18; autobuyingArmNumber = 18; }
		if (game.global.world >= 134) 
			{ autobuyingEquipmentNumber = 19; autobuyingArmNumber = 19; }
		if (game.global.world >= 136) 
			{ autobuyingEquipmentNumber = 6; autobuyingArmNumber = 6; }
		if (game.global.world >= 146) 
			{ autobuyingEquipmentNumber = 4; autobuyingArmNumber = 4; }
		if (game.global.world >= 151) 
			{ autobuyingEquipmentNumber = 20; autobuyingArmNumber = 20; }
		if (game.global.world >= 151) { buyShields = true; }
		if (game.global.world >= 152) 
			{ autobuyingEquipmentNumber = 5; autobuyingArmNumber = 5; }
		if (game.global.world >= 165) 
			{ autobuyingEquipmentNumber = 12; autobuyingArmNumber = 12; }
		if (game.global.world >= 166) 
			{ autobuyingEquipmentNumber = 14; autobuyingArmNumber = 14; }
		if (game.global.world >= 167) 
			{ autobuyingEquipmentNumber = 18; autobuyingArmNumber = 18; }
	}
}, 1000 * 1);



var buyGoldUpgrade = function() {
	var id = goldenMode;
	if (id == "Void" && game.goldenUpgrades.Void.currentBonus > minGoldenVoidBeforeHelium) {
		id = "Helium";
	}
	if (id == "Helium" && game.goldenUpgrades.Helium.currentBonus > minGoldenHeliumBeforeBattle) {
		id = "Battle";
	}

	if (tryBattle150 && game.global.world >= 150)
		id = "Battle";

	var button = document.getElementById(id + "Golden");
	if (button) {
		buyGoldenUpgrade(id);
		tooltip("hide")
		buyGoldUpgrade();
	}
}

if (buyGoldenBattleInterval) { clearInterval(buyGoldenBattleInterval); buyGoldenBattleInterval = null; }
var buyGoldenBattleInterval = setInterval(function() {
	buyGoldUpgrade();
}, 1000);


var isAllowedBuying = function(equipmentOrArm) {
	if (equipmentOrArm && game.global.world > 145)
		return true;
	if (equipmentOrArm && game.global.world > 10) {
		var upgradesHereDiv = document.getElementById("upgradesHere");
		return upgradesHereDiv.getElementsByClassName("thing").length == 0;
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

var isOkToBuyWorshippers = function() {
	return game.global.world <= lastFarmersZone || game.global.world > lastFarmersZone + 5;
}

var shouldFireWorshippers = function() {
	return false;
	
	if (game.jobs.Worshipper.owned < 1) 
		return false;
	
	if (isOkToBuyWorshippers())
		return false;
	
	return game.global.world == 110;
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

var sellThing = function(id) {
	if (game.global.world <= 1)
		return;

	var button = document.getElementById(id);
	if (button) {
		button.click();
	}
}

var setBuyMax = function(max) {
	if ((game.global.maxSplit + "") != (max + ""))
		setMax(max);
	
	if (game.global.buyAmt != "Max")
		numTab(6);
}

var buyShields = false;
var buyCollectors = false;
var tributesWanted = 1250;
var tributesPushMap = 83;

if (buyThingsInterval) { clearInterval(buyThingsInterval); buyThingsInterval = null; }
var buyThingsInterval = setInterval(function() {
	if (game.global.world <= 1)
		return;

	if (buySmithies) buyBuilding("Smithy");
	if (buyMeteorologists && game.jobs.Meteorologist.owned < 45) buyThing("Meteorologist");
	
	if (document.getElementById("Tribute") && buyTributes && game.buildings.Tribute.owned < tributesWanted) { 
		setBuyMax(0.1);
		buyBuilding("Tribute"); 
		numTab("1"); 
	}
	
	if (buyShields 
		&& autobuyingArmNumber > game.equipment.Shield.level
		&& (document.getElementById("Supershield") == null || document.getElementById("Supershield").offsetParent == null))
			buyThing("Shield");
	if (buyCollectors) { 
		setBuyMax(0.1);
		buyBuilding("Collector"); 
		numTab("1"); 
	}
	buyThing("Microchip");
	
}, 50);

if (buyWorshippersInterval) { clearInterval(buyWorshippersInterval); buyWorshippersInterval = null; }
var buyWorshippersInterval = setInterval(function() {
	if (game.global.world <= 1)
		return;

	if (isOkToBuyWorshippers()) {
		buyThing("Worshipper");
	}
	
	if (shouldFireWorshippers()) {
		fireMode();

		sellThing("Worshipper");
		
		fireMode();

	}
}, 5);

var upgradeFast = true;
if (fastUpgradeInterval) { clearInterval(fastUpgradeInterval); fastUpgradeInterval = null; }
var fastUpgradeInterval = setInterval(function() {
	if (upgradeFast) {
		if (game.global.autoUpgradesAvailable) autoUpgrades();
	}
}, 300);

//

var autobuyingInterval;

setTimeout(function() {

	Number.prototype.toRoman= function () {
		var num = Math.floor(this),
			val, s= "", i= 0,
			v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
			r = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

		function toBigRoman(n) {
			var ret = "", n1 = "", rem = n;
			while (rem > 1000) {
				var prefix = "", suffix = "", n = rem, s = "" + rem, magnitude = 1;
				while (n > 1000) {
					n /= 1000;
					magnitude *= 1000;
					prefix += "(";
					suffix += ")";
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
		var s = roman.toUpperCase().replace(/ +/g, ""),
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
			if (s.indexOf("(") == 0) return fromBigRoman(s);

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
			var tmp = set01;
			if (game.global.world >= 110)
				tmp = false;

			if (tmp) {
				setBuyMax(0.1);
			}
			else {
				numTab("1");
			}

			button.click();
			if (onlyWhenOne) {
				button.click();
			}

			if (tmp) {
				numTab("1");
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
	if (document.getElementById("fixxxer2"))
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

function now(what) {
	var needFire = (what != "wood" && game.jobs.Lumberjack.owned > 0)
		|| (what != "food" && game.jobs.Farmer.owned > 0)
		|| (what != "metal" && game.jobs.Miner.owned > 0);
		
	var needHire = needFire || game.workspaces > 0;
	
	if (!needHire)
		return;
	
	setBuyMax(1);

	
	if (needFire) {
		fireMode();
		if (what != "wood" && game.jobs.Lumberjack.owned > 0) buyJob("Lumberjack");
		if (what != "food" && game.jobs.Farmer.owned > 0) buyJob("Farmer");
		if (what != "metal" && game.jobs.Miner.owned > 0) buyJob("Miner");
		fireMode();
	}

	if (what == "wood" && game.workspaces > 0) buyJob("Lumberjack");
	if (what == "food" && game.workspaces > 0) buyJob("Farmer");
	if (what == "metal" && game.workspaces > 0) buyJob("Miner");
	
	numTab(1);
	
	if (game.global.playerGathering != what)
		setGather(what);
}

var isTimeToFarmForSmithy = function() {
	// on 135 I want smithiesWanted - 1
	if (game.global.world == voidMapZone 
		&& game.resources.wood.owned < 5000 * (Math.pow(40, smithiesWanted - 2))
		&& game.buildings.Smithy.owned < smithiesWanted -1)
		return true;
	
	return game.global.world == 160 
	 || game.global.world == 161
	 || game.global.world == 162
	 || game.global.world == 164;
}

var shouldFarmWoodForSmithy = function() {
	// on 135 I want smithiesWanted - 1
	if (game.global.world == voidMapZone 
		&& game.resources.wood.owned < 5000 * (Math.pow(40, smithiesWanted - 2))
		&& game.buildings.Smithy.owned < smithiesWanted -1)
		return true;
	
	return game.resources.wood.owned < 0.65 * 5000 * (Math.pow(40, smithiesWanted - 1)) 
			&& game.buildings.Smithy.owned < smithiesWanted;
}

var autoHireAndFire = true;
var hireAndFireInterval;
if (hireAndFireInterval) { clearInterval(hireAndFireInterval); hireAndFireInterval = null; }
var hireAndFireInterval = setInterval(function() {
	if (!autoHireAndFire) return;

	if (game.global.world >= gatherMetalZone && game.global.world <= tributesPushMap && game.global.world != 30 && game.global.world != 55)
		setGather("food");
	
	// on 124 we want only farmers
	if (game.global.world == lastFarmersZone || game.global.world == 109) {
		now("food");
		return;
	}
	
	if (game.global.world == 128) {
		now("wood");
		return;
	}
	
	if (game.global.world == 30 || game.global.world == 55) {
		now("metal");
		return;
	}

	// fire scientists
	if (game.global.world >= voidMapZone && game.jobs.Scientist.owned > 0) {
		fireMode();
		setBuyMax(1);
		cancelTooltip();
		buyJob("Scientist");
		fireMode();
	}
	
	// hire lumberjacks to get smithies on Z160+
	if (isTimeToFarmForSmithy()) {
		if (shouldFarmWoodForSmithy()) {
			now("wood");
		} else {
			now("metal");
		}
		return;
	}

	// disable autohire on lastFarmersZone + 1
	if (game.global.world > lastFarmersZone && game.global.autoJobsSettingU2.enabled) {
		toggleAutoJobs();
	}
	
	if (game.global.world > tributesPushMap 
		&& (parseFloat(document.getElementById("jobsTitleUnemployed").innerText) > 0 || game.jobs.Farmer.owned > 0)) {
		now("metal");
	}

}, 300);



var getStackCount = function(stackType) {
	var stack = document.getElementById(stackType);
	if (stack) {
		var spans = stack.getElementsByTagName("SPAN");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].getAttribute("id") == "gammaStack") {
				return parseInt(spans[i].innerText);
			}
		}
	}
	return 0;
}

var chooseMapMode = function() {
	var mapMode = "lmc";
	
	if (game.global.playerGathering == "food")
		mapMode = "lsc";
	
	if (game.global.playerGathering == "wood")
		mapMode = "lwc";
	
	if (game.global.playerGathering == "metal")
		mapMode = "lmc";
	
	if (game.global.world == 109 
		|| game.global.world == 110 
		|| game.global.world == 113 
		|| game.global.world == 123
		|| game.global.world == 129
		|| game.global.world == 130
		|| game.global.world == 131
		|| game.global.world == 132
		|| game.global.world == 133
		|| game.global.world == 138
		|| game.global.world == 139
		|| game.global.world == 146
		|| game.global.world == 147
		|| game.global.world == 148
		|| game.global.world == 149
		|| game.global.world == 150
		|| game.global.world >= 158
		|| game.global.world <= 165) {
		mapMode = "p";
	}
	
	if (game.global.world == 150 && game.global.mapBonus > 1) {
		mapMode = "lmc";
	}

	document.getElementById("advSpecialSelect").value = mapMode;
}

var chooseExtraLevelAndBuyMap = function() {
	if (plusOneZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "1";
	}

	if (plusTwoZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "2";
	}

	if (plusThreeZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "3";
	}

	if (plusFourZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "4";
	}

	if (plusFiveZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "5";
	}

	if (plusSixZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "6";
	}

	if (plusSevenZones.indexOf(game.global.world) > -1) {
		document.getElementById("advExtraLevelSelect").value = "9";
		if (buyMap() != 1) {
			document.getElementById("advExtraLevelSelect").value = "8";
			if (buyMap() != 1) {
				document.getElementById("advExtraLevelSelect").value = "7";
				buyMap()
			}
		}
	} else {
		buyMap();
	}
}

var shouldRunVoidMap = function(specialZoneRun, autoStart) {
	if (specialZoneRun 
		|| game.global.mapsActive 
		|| game.global.world < 10
		|| (game.global.world != voidMapZone && game.global.world != lastVoidMapZone)
		|| game.global.lastClearedCell <= 80)
		return false;
	
	for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
		if (game.global.mapsOwnedArray[i].location == "Void") {
			if (autoStart) {
				toggleVoidMaps();
				var button = document.getElementById(game.global.mapsOwnedArray[i].id);
				if (button) {
					button.click();
				}
			}
			
			return true;
		}
	}
	
	return false;
}

var canRunMeltingPoint = function() {
	return game.buildings.Smithy.owned == smithiesWanted 
		&& game.global.world >= minMeltingZone
		&& game.global.lastClearedCell > 88;
}

var canRunAtlantrimp = function() {
	return game.global.world == trimpleOfDoomZone
		&& game.global.lastClearedCell > 88;
}

var shouldRunOneTimeMap = function(specialZoneRun, autoStart, mapName, canRunMap) {
	if (specialZoneRun 
		|| game.global.mapsActive 
		|| game.global.world < 10
		|| !canRunMap())
		return false;
	
	for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
		if (game.global.mapsOwnedArray[i].name == mapName) {
			var button = document.getElementById(game.global.mapsOwnedArray[i].id);
			if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
				if (autoStart) {
					button.click();
				}
				return true;
			}
		}
	}
	
	return false;
}

var shouldFightSomeMap = function() {
	if (game.global.world < 9)
		return false;

	if (game.global.world == lastFarmersZone && game.global.lastClearedCell < 81)
		return false;

	if (game.global.world == 150 && game.global.lastClearedCell < 71)
		return false;

	if (dontMap || game.global.mapsActive)
		return false;

	if (game.global.world == forcedPortalWorld && (game.global.challengeActive + "") === "")
		return false;

	if (shouldRunVoidMap(false, false))
		return true;

	if (shouldRunOneTimeMap(false, false, "Melting Point", canRunMeltingPoint))
		return true;

	if (shouldRunOneTimeMap(false, false, "Atlantrimp", canRunAtlantrimp))
		return true;

	if (game.global.lastClearedCell > 0 && extraZones.indexOf(game.global.world) > -1 && !game.global.mapsActive && game.global.mapBonus < 3)
		return true;

	if ((plusZeroZones.indexOf(game.global.world) > -1 || plusOneZones.indexOf(game.global.world) > -1 || plusTwoZones.indexOf(game.global.world) > -1 || plusThreeZones.indexOf(game.global.world) > -1 || plusFourZones.indexOf(game.global.world) > -1 || plusFiveZones.indexOf(game.global.world) > -1 ||  plusSixZones.indexOf(game.global.world) > -1 ||  plusSevenZones.indexOf(game.global.world) > -1) 
		&& game.global.mapBonus < 1)
		return true;
	
	if (game.global.mapBonus < 9 && game.global.world == 150)
		return true;

	return false;
}

if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();

		cancelTooltip();

		chooseMapMode();

		if (game.global.world != 60)
			recycleBelow(true);

		var specialZoneRun = false;
		
		if (shouldRunVoidMap(specialZoneRun, true))
			specialZoneRun = true;
		
		if (shouldRunOneTimeMap(specialZoneRun, true, "Atlantrimp", canRunAtlantrimp))
			specialZoneRun = true;
		
		if (shouldRunOneTimeMap(specialZoneRun, true, "Melting Point", canRunMeltingPoint))
			specialZoneRun = true;
		
		if (!specialZoneRun)
			chooseExtraLevelAndBuyMap();

		runMap();
		fightManual();

		while (document.getElementById("togglerepeatUntil").innerHTML.indexOf("Items") == -1)
			toggleSetting("repeatUntil");

		while (document.getElementById("toggleexitTo").innerHTML.indexOf("World") == -1)
			toggleSetting("exitTo")
		
		if (game.global.world == 150 && game.global.mapBonus > 1) {
			while (document.getElementById("togglerepeatUntil").innerHTML.indexOf("Any") == -1)
				toggleSetting("repeatUntil");
		}
	}
}, 601);

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
	return getNumberText(getFluffyExperienceRate() / 1000);
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
	if (radonText && radonText.indexOf("/") && (game.global.world <= forcedPortalWorld)) {
		var text = radonText.substr(0, radonText.indexOf("/"))
		var radonNumber = getNumberFromText(text);
		result = radonNumber / (Math.pow(1.03, forcedPortalWorld - game.global.world));
	}
	return result;
}


var logFluffyExp = function() {
	var heliumPhSpan = document.getElementById("heliumPh");
	if (heliumPhSpan) {
		lastFluffyExpLog = game.global.world;
		var text2 = "";
		var text3 = "";
		if (fluffyStart > 0) {
			text2 = ", fluffy exp rate: " + getFluffyExperienceRateText() + " exp / s";
			text3 = ", fluffy upgrade: " + (new Date(new Date() * 1 + (Fluffy.currentExp[2] - Fluffy.currentExp[1]) / getFluffyExperienceRate() * 1000)).toISOString();
		}
		var text = getPortalTime() + " " + game.global.world + " zone, radon: " + heliumPhSpan.innerHTML + ", RN: " + getNumberText(getRadonNormalized() / 1000);
		text = text.replace(/(\.[0-9]{2})[0-9]+e/g, "$1e");
		var text4 = getNumberText((Fluffy.currentExp[1] - fluffyStart) / 1000);
		console.log(text + text2 + text3 + ", scruffy exp earned: " + text4);
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

var isOkToPortal = function() {
	if (dontPortal)
		return false;
	
	if (game.global.world > forcedPortalWorld)
		return true;

	if (game.global.mapsActive)
		return false;

	if ((game.global.challengeActive + "") !== "")
		return false;

	return game.global.world >= forcedPortalWorld;
}

if (forcePortalInterval) { clearInterval(forcePortalInterval); forcePortalInterval = null; }
var forcePortalInterval = setInterval(function() {
	if (isOkToPortal()) {
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
			
			fluffyStart = Fluffy.currentExp[1];
			mapMode = "lsc";
		}, 1000);
	}
}, 500);


var minLogZone = 150;
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
}, 10000);

var autoExportSave = true;
if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip("Export", null, "update");
		document.getElementById("downloadLink").click();
		cancelTooltip();
	}
}, 1000 * 60 * 5);


var isItTimeForMorePowerfulHeirloom = function() {
	if (game.global.world >= forcedPortalWorld)
		return false;

	if (game.global.mapsActive && game.global.world > 120)
		return true;

	if (game.global.world < switchHeirloomZone)
		return false;

	return true;
}

if (switchHeirloomInterval) { clearInterval(switchHeirloomInterval); switchHeirloomInterval = null; }
var switchHeirloomInterval = setInterval(function() {
	for (var i = 0; i < game.global.heirloomsCarried.length; i++) {
		var heirloom = game.global.heirloomsCarried[i];
		if (heirloom.name == "VM" && !isItTimeForMorePowerfulHeirloom()) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
		if (heirloom.name == "U2" && isItTimeForMorePowerfulHeirloom()) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
	}

	for (var i = 0; i < game.global.heirloomsCarried.length; i++) {
		var heirloom = game.global.heirloomsCarried[i];
		if (heirloom.name == "Map" 
				&& game.global.mapsActive
				&& game.global.world < 109) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
		
		if (heirloom.name == "Map Old" 
				&& game.global.mapsActive
				&& game.global.world >= 109
				&& ((game.global.world != voidMapZone && game.global.world != lastVoidMapZone) || game.global.playerGathering != "metal")) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
		
		if (heirloom.name == "Metal"
			&& game.global.mapsActive
			&& (game.global.world == voidMapZone || game.global.world == lastVoidMapZone)
			&& game.global.playerGathering == "metal") {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
			
		if (heirloom.name == "World" && !game.global.mapsActive && game.global.world < 100) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
		if (heirloom.name == "World2" && !game.global.mapsActive && game.global.world >= 100) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
	}
}, 300);


if (pressFightInterval) { clearInterval(pressFightInterval); pressFightInterval = null; }
var pressFightInterval = setInterval(function() { pressFight(); }, 5000);

// --------------------------------------------------------------------------

var localStorageKeys = [];
var tryOptimize = true;
var debugOptimizer = false;

var parseCookieValue = function(cookieName) {
	var cookieValue = window.localStorage.getItem(cookieName);
	
	if (cookieValue && cookieValue != "")
		return {
			saveString: 	cookieValue.split("###")[0],
			reset: 			parseInt(cookieValue.split("###")[1]),
			seconds: 		parseInt(cookieValue.split("###")[2]),
			cell: 			parseInt(cookieValue.split("###")[3]),
			tributes: 		parseInt(cookieValue.split("###")[4]),
			voidMaps: 		parseInt(cookieValue.split("###")[5]),
			metalOwned: 	parseFloat(cookieValue.split("###")[6]),
			frenzyLeft: 	parseInt(cookieValue.split("###")[7]),
			enemyHealth:	parseFloat(cookieValue.split("###")[8]),
			mayhemStacks:	parseInt(cookieValue.split("###")[9]),
			mapCell:		parseInt(cookieValue.split("###")[10]),
			mapName:		cookieValue.split("###")[11],
			mapEnemyHealth:	parseFloat(cookieValue.split("###")[12]),
			smithiesOwned:	parseInt(cookieValue.split("###")[13])
		};
		
	return null;
}

var serializeCookieValue = function() {
	var currentMap = game.global.mapsOwnedArray.filter(function (el) { return el.id == game.global.currentMapId; })
	var mapName = '';
	if (currentMap != null && currentMap.length != 0)
		mapName = currentMap[0].name;
	
	var mapEnemyHealth = 0;
	if (game.global.lastClearedMapCell < game.global.mapGridArray.length - 1) {
		mapEnemyHealth = game.global.mapGridArray[game.global.lastClearedMapCell + 1].health;
	}
	
	return save(true) + 
		"###" + game.global.totalRadPortals +
		"###" + Math.round(((new Date() * 1) - game.global.portalTime) / 1000) +
		"###" + (game.global.world * 100 + game.global.lastClearedCell) +
		"###" + game.buildings.Tribute.owned +
		"###" + game.global.totalVoidMaps + 
		"###" + game.resources.metal.owned +
		"###" + game.portal.Frenzy.frenzyLeft() +
		"###" + game.global.gridArray[game.global.lastClearedCell + 1].health + 
		"###" + game.challenges.Mayhem.stacks + 
		"###" + game.global.lastClearedMapCell + 
		"###" + mapName +
		"###" + mapEnemyHealth + 
		"###" + game.buildings.Smithy.owned;
}

var setSomeInterval = function(intervalVar, shouldSaveFunction, shouldLoadFunction, intervalTime) {
	if (intervalVar) { clearInterval(intervalVar); intervalVar = null; }
	intervalVar = setInterval(function() {
		if (!tryOptimize)
			return;
		
		var save = parseCookieValue(shouldSaveFunction.name);

		if (save != null) {
			if (save.reset == game.global.totalRadPortals && shouldLoadFunction(save)) {
				if (debugOptimizer) 
					console.log("loading save " + shouldLoadFunction.name);

				load(save.saveString);

			} else if (shouldSaveFunction(save)) {
				if (debugOptimizer) 
					console.log("saving save " + shouldSaveFunction.name);
				window.localStorage.setItem(shouldSaveFunction.name, serializeCookieValue());
			}
		} else if (shouldSaveFunction(save)) {
			
			if (debugOptimizer) 
					console.log("saving save " + shouldSaveFunction.name);
			window.localStorage.setItem(shouldSaveFunction.name, serializeCookieValue());
		}
		
	}, intervalTime + 100 - Math.floor(Math.random() * 100));
	localStorageKeys.push(shouldSaveFunction.name);
	return intervalVar;
}

//----------------------------------

var optimizeVoidEndInterval;

var shouldLoadVoidEndSave = function(save) {
	if (game.global.world != voidMapZone || game.global.lastClearedCell <= 80 || game.global.mapsActive || save.reset != game.global.totalRadPortals)
		return false;
	
	var voidMaps = game.global.mapsOwnedArray.filter(function (el) { return el.location == "Void"; }); 
	
	if (voidMaps != null && voidMaps.length > 0)
		return false;
	
	if (save.smithiesOwned < game.buildings.Smithy.owned)
		return false;

	if (save.metalOwned > 1.05 * game.resources.metal.owned)
		return true;

	return false;
};

var shouldSaveVoidEndSave = function(save) {
	if (game.global.world != voidMapZone || !game.global.mapsActive || game.global.currentMapId == null)
		return false;
	
	var currentMap = game.global.mapsOwnedArray.filter(function (el) { return el.id == game.global.currentMapId; }) 
	
	if (currentMap == null 
		|| currentMap.length == 0
		|| currentMap[0].location != "Void")
		return false;

	if (save != null && save.reset == game.global.totalRadPortals && save.smithiesOwned > game.buildings.Smithy.owned)
		return false;

	if (save != null && save.reset == game.global.totalRadPortals && save.metalOwned >= game.resources.metal.owned)
		return false;
	
	return true;
};

optimizeVoidEndInterval = setSomeInterval(optimizeVoidEndInterval, shouldSaveVoidEndSave, shouldLoadVoidEndSave, 1000);

//---------------
//----------------------------------

var optimizeVoidEnd3Interval;

var shouldLoadVoidEnd3Save = function(save) {
	if (game.global.world != lastVoidMapZone || game.global.lastClearedCell <= 80 || game.global.mapsActive || save.reset != game.global.totalRadPortals)
		return false;
	
	var voidMaps = game.global.mapsOwnedArray.filter(function (el) { return el.location == "Void"; }); 
	
	if (voidMaps != null && voidMaps.length > 0)
		return false;

	if (save.metalOwned > 1.05 * game.resources.metal.owned)
		return true;

	return false;
};

var shouldSaveVoidEnd3Save = function(save) {
	if (game.global.world != lastVoidMapZone || !game.global.mapsActive || game.global.currentMapId == null)
		return false;
	
	var currentMap = game.global.mapsOwnedArray.filter(function (el) { return el.id == game.global.currentMapId; }) 
	
	if (currentMap == null 
		|| currentMap.length == 0
		|| currentMap[0].location != "Void")
		return false;
		
	if (save != null && save.reset == game.global.totalRadPortals && save.metalOwned >= game.resources.metal.owned)
		return false;
	
	return true;
};

optimizeVoidEnd3Interval = setSomeInterval(optimizeVoidEnd3Interval, shouldSaveVoidEnd3Save, shouldLoadVoidEnd3Save, 1000);

//---------------
//----------------------------------

var optimizeMeltingPointEndInterval;

var shouldLoadMeltingPointEndSave = function(save) {
	if (game.global.world != minMeltingZone || game.global.mapsActive || save.reset != game.global.totalRadPortals)
		return false;
	
	for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
		if (game.global.mapsOwnedArray[i].name == "Melting Point") {
			var button = document.getElementById(game.global.mapsOwnedArray[i].id);
			if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
				return false;
			}
		}
	}

	if (save.metalOwned > 1.05 * game.resources.metal.owned)
		return true;

	return false;
};

var shouldSaveMeltingPointEndSave = function(save) {
	if (game.global.world != minMeltingZone || !game.global.mapsActive || game.global.currentMapId == null)
		return false;
	
	var currentMap = game.global.mapsOwnedArray.filter(function (el) { return el.id == game.global.currentMapId; }) 
	
	if (currentMap == null 
		|| currentMap.length == 0
		|| currentMap[0].name != "Melting Point")
		return false;
		
	if (save != null && save.reset == game.global.totalRadPortals && save.metalOwned >= game.resources.metal.owned)
		return false;
	
	return true;
};

optimizeMeltingPointEndInterval = setSomeInterval(optimizeMeltingPointEndInterval, shouldSaveMeltingPointEndSave, shouldLoadMeltingPointEndSave, 1000);

//---------------

var optimizeVoidMapsNumberInterval;
var optimizeVoidMapsNumberMinZone = 120;
var optimizeVoidMapsNumberMaxZone = 129;

var shouldLoadOptimizedVoidMapsNumberSave = function(save) {
	if (!tryOptimize)
		return false;

	if ((game.global.challengeActive + "") !== challengeToTry
		|| game.global.world < optimizeVoidMapsNumberMinZone
		|| game.global.world > optimizeVoidMapsNumberMaxZone
		)
	return false;

	if (save.reset != game.global.totalRadPortals) {
		return false;
	}

	if (save.voidMaps > game.global.totalVoidMaps) {
		if (debugOptimizer)
			console.log("shouldLoadOptimizedSave save has more void maps: " + save.voidMaps + " > " + game.global.totalVoidMaps);
		
		return true;
	}

	return false;
}

var shouldSaveOptimizedVoidMapsNumberSave = function(save) {
	if (!tryOptimize)
		return false;

	if ((game.global.challengeActive + "") !== challengeToTry || game.global.world < optimizeVoidMapsNumberMinZone || game.global.world > optimizeVoidMapsNumberMaxZone)
		return false;

	if (save == null)
		return true;
	
	if (game.global.totalRadPortals != save.reset)
		return game.global.totalRadPortals > save.reset;

	if (save.voidMaps < game.global.totalVoidMaps) {
		if (debugOptimizer) {
			console.log("shouldSaveOptimizedSave true: more void maps than save " + save.voidMaps + " < " + game.global.totalVoidMaps);
		}
		return true;
	}

	return false;
}

optimizeVoidMapsNumberInterval = setSomeInterval(optimizeVoidMapsNumberInterval, shouldSaveOptimizedVoidMapsNumberSave, shouldLoadOptimizedVoidMapsNumberSave, 400);

//---------------

var optimizeLastZoneInterval;

var shouldLoadLastZoneSave = function(save) {
	if (!tryOptimize)
		return false;
	
	if (game.global.world == 138 && game.global.lastClearedCell < 20)
		return false;
	
	if (game.global.world == 139 && game.global.lastClearedCell < 20)
		return false;

//	if (game.global.lastClearedCell < 10 || game.global.mapsActive || game.global.world <= save.voidMapZone)
//		return false;

	var myPortal = game.global.totalRadPortals;
	var mySeconds = Math.round(((new Date() * 1) - game.global.portalTime) / 1000);
	var myCell = (game.global.world * 100 + game.global.lastClearedCell);

	if (save.cell < 150 * 100 || save.cell < (minMeltingZone + 1) * 100)
		return false;

	if (isTimeToFarmForSmithy())
		return false;

	if (save.reset != myPortal) {
		if (debugOptimizer) {
			console.log("shouldLoadLastZoneSave wrong portal " + save.reset + " " + game.global.totalRadPortals);
		}
		return false;
	}

	if ((myCell + 1) < save.cell 
		|| (myCell < save.cell && save.cell == ((forcedPortalWorld - 1) * 100) + 99)) {
		return true;
	}

	return false;
}

var shouldSaveLastZoneSave = function(save) {
	if (!tryOptimize)
		return false;
	
	if (save == null)
		return true;

	if (game.global.mapsActive)
		return false;

	var myPortal = game.global.totalRadPortals;
	var mySeconds = Math.round(((new Date() * 1) - game.global.portalTime) / 1000);
	var myCell = (game.global.world * 100 + game.global.lastClearedCell);

	if (myPortal < save.reset) {
		if (debugOptimizer) {
			console.log("shouldSaveLastZoneSave false: previous portal " + save.reset + " " + myPortal);
		}
		return false;
	}

//	if (game.global.lastClearedCell < 10)
//		return false;

	if (game.global.world <= minMeltingZone + 1 || isTimeToFarmForSmithy())
		return false;

	if (myPortal > save.reset) {
		if (debugOptimizer) {
			console.log("shouldSaveLastZoneSave true: next portal " + save.reset + " " + myPortal);
		}
		return true;
	}

	if (myCell > save.cell) {
		return true;
	}

	return false;
}

optimizeLastZoneInterval = setSomeInterval(optimizeLastZoneInterval, shouldSaveLastZoneSave, shouldLoadLastZoneSave, 200);


//----------------------------------

if (equalityInterval) { clearInterval(equalityInterval); equalityInterval = null; }
var equalityInterval = setInterval(function() {
	if (game.global.world == 150) {
		game.portal.Equality.disabledStackCount = "38";
		return;
	}
	if (game.global.world >= 145 && game.global.world < 150) {
		game.portal.Equality.disabledStackCount = "30";
		return;
	}
	if (game.global.world >= 151 && game.global.world < hitWithMaxStartingZone) {
		game.portal.Equality.disabledStackCount = "20";
		if (game.global.world >= 164) {
			game.portal.Equality.disabledStackCount = "30";
		}
		return;
	}
	
	if (game.global.world < 135) {
		game.portal.Equality.disabledStackCount = "15"
	} else if (game.global.world < 136) {
		game.portal.Equality.disabledStackCount = "20"
	} else if (game.global.world < 137) {
		game.portal.Equality.disabledStackCount = "15"
	} 
}, 5001);

var maxEq = "" + game.portal.Equality.radLevel;
var bestEq = "35";
var slowEq = "0";
var hitWithMaxStartingZone = 166;

if (hitWithMaxGammaBurstInterval) { clearInterval(hitWithMaxGammaBurstInterval); hitWithMaxGammaBurstInterval = null; }
var hitWithMaxGammaBurstInterval = setInterval(function() { 
	if (game.global.world > hitWithMaxStartingZone || (game.global.world == hitWithMaxStartingZone && game.global.lastClearedCell > 60)) {
		if (game.global.fighting && game.heirlooms.Shield.gammaBurst.stacks >= 4) {
			var badGuyName = document.getElementById('badGuyName');
			if (badGuyName && badGuyName.getElementsByClassName('glyphicon-forward').length) {
				game.portal.Equality.disabledStackCount = bestEq;
			}
			else {
				game.portal.Equality.disabledStackCount = slowEq;
			}
		} else {
			game.portal.Equality.disabledStackCount = maxEq;
		}
	}
}, 100);

if (updateBestEqInterval) { clearInterval(updateBestEqInterval); updateBestEqInterval = null; }
var updateBestEqInterval = setInterval(function() { 
	if (game.global.world < 136) { 
		bestEq = "28";
	} else if (game.global.world < 161) { 
		bestEq = "30";
	} else if (game.global.world < 162) { 
		bestEq = "30";
	} else if (game.global.world < 167) { 
		bestEq = "34";
	} else if (game.global.world < 167) { 
		bestEq = "38";
	} else { 
		bestEq = "40";
	}
}, 100);

//--

var optimizeVoidStartInterval;

var shouldLoadVoidStartSave = function(save) {
	if (game.global.world == voidMapZone && game.global.lastClearedCell <= 80 && save.reset == game.global.totalRadPortals)
		return true;
	return false;
};
var shouldSaveVoidStartSave = function(save) {
	if (game.global.world != voidMapZone || !game.global.mapsActive || game.global.currentMapId == null)
		return false;
	
	var currentMap = game.global.mapsOwnedArray.filter(function (el) { return el.id == game.global.currentMapId; }) 
	
	if (currentMap == null 
		|| currentMap.length == 0
		|| currentMap[0].location != "Void")
		return false;
		
	if (save != null && save.reset == game.global.totalRadPortals)
		return false;
	
	return true;
};

optimizeVoidStartInterval = setSomeInterval(optimizeVoidStartInterval, shouldSaveVoidStartSave, shouldLoadVoidStartSave, 3000);

//--

//if (changeTrapInterval) { clearInterval(changeTrapInterval); changeTrapInterval = null; }
//var changeTrapInterval = setInterval(function() { 
//	if (game.global.world <= voidMapZone && playerSpire.layout[56].trap.name != "Condenser") {
//		playerSpire.buildTrap("56", "Condenser")
//
//	}
//	if (game.global.world > voidMapZone && playerSpire.layout[56].trap.name != "Knowledge") {
//		playerSpire.buildTrap("56", "Knowledge")
//	} 
//}, 3000);

// manually copy between tabs
exportSaveToLocalStorage = function() {
	window.localStorage.setItem("trimps-save", save(true));
}
// manually copy between tabs
importSaveFromLocalStorage = function() {
	load(window.localStorage.getItem("trimps-save"));
}

var perksSet = false;
var autoPerk = true;

var upgradePerk = function() {
	var buttonId = "Carpentry";
	
	var clicked = false;
	
	var button = document.getElementById(buttonId);
	if (button && button.getAttribute("class").indexOf("perkColorOn") > -1) {
		button.click();
		clicked = true;
	} 
	
	if (clicked && document.getElementById("activatePortalBtn").offsetParent != null) {
		activateClicked();
	} else {
		cancelTooltip(); cancelPortal()
	}
}

var startPerkUpgrades = function() {
	if (!perksSet && autoPerk && game.global.world > 10) {
		perksSet = true;
		viewPortalUpgrades();
		setTimeout(upgradePerk, 300);
	}
}

if (startPerkUpgradesInterval) { clearInterval(startPerkUpgradesInterval); startPerkUpgradesInterval = null; }
var startPerkUpgradesInterval = setInterval(startPerkUpgrades, 15*1000);

