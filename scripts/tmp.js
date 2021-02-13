var hitWithMaxStartingZone = 165;

var plusOneZones = [40, 30, 31, 160, 161, 162, 163, 164];
var plusTwoZones = [59, 69, 79, 89, 99, 109, 119, 129, 139];
var plusThreeZones = [];

if (repeatMaps) { clearInterval(repeatMaps); repeatMaps = null; }
var repeatMaps = setInterval(function() {
	if (shouldFightSomeMap()) {
		if (!game.global.switchToMaps) {
			mapsClicked();
		}
		mapsClicked();

		cancelTooltip();

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


		if (game.global.world != 60)
			recycleBelow(true);

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

		var specialZoneRun = false;

		if (game.global.world == voidMapZone || game.global.world == maxVoidMapZone) {
			if (!specialZoneRun && (game.global.lastClearedCell > 80)) {
				for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
					if (game.global.mapsOwnedArray[i].location == "Void") {
						toggleVoidMaps();
						var button = document.getElementById(game.global.mapsOwnedArray[i].id);
						if (button) {
							button.click();
							specialZoneRun = true;
						}
					}
				}
			}
		}

		if (game.global.world == trimpleOfDoomZone && game.global.lastClearedCell > 88) {
			if (!specialZoneRun) {
				for (var i = game.global.mapsOwnedArray.length - 1; i > -1; i--) {
					if (game.global.mapsOwnedArray[i].name == "Atlantrimp") {
						var button = document.getElementById(game.global.mapsOwnedArray[i].id);
						if (button && button.getAttribute("class").indexOf("noRecycleDone") == -1) {
							button.click();
							specialZoneRun = true;
						}
					}
				}
			}
		}

		if (game.buildings.Smithy.owned == smithiesWanted && game.global.lastClearedCell > 88 && game.global.world >= minMeltingZone) {
			if (!specialZoneRun) {
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
		}

		runMap();
		fightManual();

		while (document.getElementById("togglerepeatUntil").innerHTML.indexOf("Items") == -1) {
			toggleSetting("repeatUntil");
		}

		while (document.getElementById("toggleexitTo").innerHTML.indexOf("World") == -1) {
			toggleSetting("exitTo")
		}
		
		if (game.global.world == 150 && game.global.mapBonus > 1) {
			while (document.getElementById("togglerepeatUntil").innerHTML.indexOf("Any") == -1) {
				toggleSetting("repeatUntil");
			}
		}
	}
}, 601);

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
			{ autobuyingEquipmentNumber = 7; autobuyingArmNumber = 7; }
		if (game.global.world >= 166) 
			{ autobuyingEquipmentNumber = 9; autobuyingArmNumber = 9; }
		if (game.global.world >= 167) 
			{ autobuyingEquipmentNumber = 14; autobuyingArmNumber = 14; }
	}
}, 1000 * 1);