document.body.innerHTML +=`<style>
#queueContainer, #Supershield, #Shield, .NoticesMessage, #saveGame { display: none }
#buyContainer { height: calc(99vh - 11vw - 110px); }
#Trap, #Hut, #House, #Mansion, #Hotel, #Resort, #Gateway, #Collector, #Tribute, #Gym, #Warpstation, #Gigastation { height: 1px; width: 1px; overflow: hidden; position: absolute; margin-top: -10px; }
#Trap      { left: 20px; }
#Hut       { left: 30px; }
#House     { left: 40px; }
#Mansion   { left: 50px; }
#Hotel     { left: 60px; }
#Resort    { left: 70px; }
#Gateway   { left: 80px; }
#Collector { left: 90px; }
#Tribute   { left: 100px; }
#Warpstation { left: 110px; }
#Gigastation { left: 20px; margin-top: -20px; }

#Gym       { right: 20px; }

#Wormhole { display: none }

#topRow .playerGather { font-size: 0.7vw !important; }

#fragments { height: 20% !important }
#fragmentsPs, #gems { display: none }
#buildingsTitleDiv { display: none }

.resourceRow > div { width: 25%; padding-left: 5px; padding-right: 0; height: 50%; }
.resourceRow .progress > div > span { font-size: 0.7vw }
.resourceRow { height: 99.8% }
.resourceRow .collectRow .col-xs-6 { width: 92% }

#topRow { }

#buyCol { margin-top: -9vw; }

.thing { font-size: 0.65vw; }

#outerBuyContainer {
    background: rgba(151,151,153,0.5);
}

#Warpstation { color: yellow }
</style>`;

var fixBoard = function() { 
	if (document.getElementsByTagName("body").length) {
		var node = document.createElement("DIV");
		node.setAttribute("style", "position: absolute; width: 3000px; height: 3000px; left: 0; top: 0; z-index: 1000; background: white;"); 
		node.setAttribute("id", "fixxxer"); 
		document.getElementsByTagName("body")[0].appendChild(node);
		setTimeout(refixBoard, 3000);
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

var trimpsIntervals = [];

var getPortalTime = function() {
	var portalTimeElement = document.getElementById("portalTime");
	if (portalTimeElement) {
		return portalTimeElement.innerHTML;
	}
	return "";
}

setTimeout(function() {

	var firstResourceRow = document.getElementById("food").parentNode.parentNode;
	var secondResourceRow = document.getElementById("metal").parentNode.parentNode;

	firstResourceRow.appendChild(document.getElementById("metal").parentNode);
	firstResourceRow.appendChild(document.getElementById("science").parentNode);

	secondResourceRow.parentNode.removeChild(secondResourceRow);

}, 2000);

setTimeout(function() {
	function setSelectedValue(selectObj, valueToSet) {
		for (var i = 0; i < selectObj.options.length; i++) {
			if (selectObj.options[i].value == valueToSet) {
				selectObj.options[i].selected = true;
				return;
			}
		}
	}

	var findZoneNumber = function() { 
		var zoneNumber = 0; 
		if (document.getElementById("worldNumber") && document.getElementById("worldName") && document.getElementById("worldName").offsetParent !== null && document.getElementById("worldName") && document.getElementById("worldName").innerHTML.indexOf("Zone") > -1) { 
			zoneNumber = parseInt(document.getElementById("worldNumber").innerHTML); 
		} 
		return zoneNumber; 
	}

	setTimeout(function() {
		var findZoneNumber = function() { 
			var zoneNumber = 0; 
			if (document.getElementById("worldNumber")) { 
				zoneNumber = parseInt(document.getElementById("worldNumber").innerHTML); 
			} 
			return zoneNumber; 
		};

		var checkHeliumPerHour = function() {
			var hph = getHeliumPerHour();
			
			if (hph > maxHeliumPerHour || findZoneNumber() === 1) {
				if (maxHeliumPerHour > 0 && hph > 1.01 * maxHeliumPerHour) {
					console.log(getPortalTime() + " new max hph. zone " + findZoneNumber() + ": " + hph);
				}
				maxHeliumPerHour = hph;
			}
			
			if (force471 && restartOnZone == 465 && game.global.world == 472 && hph < maxHeliumPerHour) {
				console.log(getPortalTime() + " force472. " + hph + " < " + maxHeliumPerHour + " * " + minHeliumPerHourPercent + "(" + (maxHeliumPerHour * minHeliumPerHourPercent) + ")");
			} else if (force486 && restartOnZone == 480 && game.global.world == 486 && hph < maxHeliumPerHour) {
				console.log(getPortalTime() + " force486. " + hph + " < " + maxHeliumPerHour + " * " + minHeliumPerHourPercent + "(" + (maxHeliumPerHour * minHeliumPerHourPercent) + ")");
			} else {
				if (!voidMapsFinished || hph > maxHeliumPerHour * minHeliumPerHourPercent) {
					//console.log(getPortalTime() + " " +"!voidMapsFinished || hph > maxHeliumPerHour * " + minHeliumPerHourPercent + " " + (!voidMapsFinished) + " " + (hph > maxHeliumPerHour * minHeliumPerHourPercent));
					setTimeout(function() { checkHeliumPerHour(); }, 5000);
					return;
				}
				console.log(getPortalTime() + " " + "hph lower - portal: " + hph + " < " + maxHeliumPerHour + " * " + minHeliumPerHourPercent + "(" + (maxHeliumPerHour * minHeliumPerHourPercent) + ")");
			}

			for (var i = 0; i < 100; i++) naturePurchase('convert', 'Ice', 'Wind');
	
			if (autoPortal) {
				buyGeneratorUpgrade("Supply");
				buyGeneratorUpgrade("Overclocker")
				buyGeneratorUpgrade("Capacity")
				buyGeneratorUpgrade("Efficiency")
				findPortal();
			} else {
				console.log(getPortalTime() + " " +"PORTAL TIME");
				waitForNewWorld();
			}
		}
		
		var waitForNewWorld = function() {
			if (shouldStartNewWorld) {
				shouldStartNewWorld = false;
				startNewWorld();
			} else {
				setTimeout(waitForNewWorld, 1000);
			}
		}
		
		var startNewWorld = function() { 
			pressFight();
			setTimeout(function() { 
				autoPortal = true;
				lastItems = 0;
				autoBelow20 = true;
				maxHeliumPerHour = 0;
				voidMapsFinished = false;
				abandonForced = false;
				restartOnZone = initialRestartZone;
				abandons = initialAbandons.slice();
				setGaSecs(45);
				perksSet = false;
				buyLastZoneEquipment = false;
				autoPerked = 0;
				itemsAction(); 
			}, 10000);
			setTimeout(function() { checkHeliumPerHour(); }, 15000);
			setTimeout(function() {
				if (document.getElementById("pauseFight") && document.getElementById("pauseFight").innerHTML.indexOf("AutoFight Off") > -1) {
					document.getElementById("pauseFight").click(); 
				}
			}, 30000);
		}
		
		var findPortal = function() { 
			if (document.getElementById("portalBtn") && document.getElementById("portalBtn").offsetParent !== null) {
				document.getElementById("portalBtn").click();
				setTimeout(function() {
					console.log(getPortalTime() + " Portal in zone " + game.global.world + " cell " + game.global.lastClearedCell);
					console.log("---");
					document.getElementById("activatePortalBtn").click(); 
					setTimeout(function() {
						activatePortal();
						setTimeout(startNewWorld, 3000);
					}, 1000);
				}, 1000);
			}
		}
		
		var pressFight = function() {
			if (document.getElementById("cell" + (game.global.lastClearedCell + 1)) == null && game.global.lastClearedCell == -1) {
				setTimeout(function() { pressFight(); }, 500);
			} else {
				document.getElementById("fightBtn").click();
			}
		}

		var getHeliumPerHour = function() {
			var perHour = 0.0;
			
			if (voidMapsFinished) {
				var perHourString = document.getElementById("heliumPh").innerHTML.split('/')[0];
				if (perHourString) {
					if (parseFloat(perHourString) > perHour) {
						perHour = parseFloat(perHourString) / 1000000.0;
						if (perHourString[perHourString.length - 1] == "K") {
							perHour = perHour * 1000;
						}
						if (perHourString[perHourString.length - 1] == "M") {
							perHour = perHour * 1000 * 1000;
						}
						if (perHourString[perHourString.length - 1] == "B") {
							perHour = perHour * 1000 * 1000 * 1000;
						}
						if (perHourString[perHourString.length - 1] == "T") {
							perHour = perHour * 1000 * 1000 * 1000 * 1000;
						}
						if (perHourString.length > 2 && perHourString.substring(perHourString.length - 2) == "Qa") {
							perHour = perHour * 1000 * 1000 * 1000 * 1000 * 1000;
						}
					}
				}
				if (perHour > 1) {
					perHour = Math.round(perHour);
				}
			}
			return perHour;
		}

		var findDoa = function() { 
			var maps = document.getElementsByClassName("onMapName");
			
			//console.log(getPortalTime() + " " +"Found " + maps.length + " maps");
			
			if (!maps.length || maps[0].offsetParent === null) {
				setTimeout(function() { findDoa(); }, 1000);
				return;
			}
			
			for (var i = 0; i < maps.length; i++) {
				if (maps[i].innerHTML == "Dimension of Anger") {
					//console.log(getPortalTime() + " " +"Found DOA");
					voidMapsFinished = true;
				}
			}
			
			if (document.getElementById("mapsBtnText") && document.getElementById("mapsBtnText").offsetParent !== null && document.getElementById("mapsBtnText").innerHTML.indexOf("World") > -1) {
				document.getElementById("mapsBtnText").click();
			} else {
				setTimeout(function() { findDoa(); }, 1000);
			}
		}

		var startVoidMap = function() { 
			//console.log(getPortalTime() + " " +"startVoidMap")
			var maps = document.getElementsByClassName("voidMap");
			if (!maps.length || maps[0].offsetParent === null) {
				setTimeout(function() { startVoidMap(); }, 1000);
				return;
			}
			buyLastZoneEquipment = true;
			
			maps[0].click();
			
			setTimeout(function() { 
				document.getElementById("selectMapBtn").click();
				
				setTimeout(function() { 
					var formationId = "formation2";
					if (document.getElementById(formationId) && document.getElementById(formationId).offsetParent !== null && autoFormation) {
						document.getElementById(formationId).click();	
					}
					findDoa();
				}, 1000);
			}, 1000);
		}

		var waitForMap = function() { 
			var desiredRepeatUntil = "";
		
			if (document.getElementById("togglerepeatUntil") && document.getElementById("togglerepeatUntil").offsetParent !== null) {
				if (!document.getElementById("GambesOP") || document.getElementById("GambesOP").offsetParent == null) {
					desiredRepeatUntil = "Repeat for Items";
				}
				
				if (game.global.world >= restartOnZone - actionZones || game.global.world == 400) {
					desiredRepeatUntil = "Repeat for Any";
				}
				
				if (document.getElementById("GambesOP") && document.getElementById("GambesOP").offsetParent != null) {
					desiredRepeatUntil = "Repeat Forever";
				}
			}
			
			if (desiredRepeatUntil && document.getElementById("togglerepeatUntil").innerHTML.indexOf(desiredRepeatUntil) == -1) {
				document.getElementById("togglerepeatUntil").click();
			}
			
			if (document.getElementById("toggleexitTo") && document.getElementById("toggleexitTo").offsetParent !== null && document.getElementById("toggleexitTo").innerHTML.indexOf("Exit to Maps") == -1) {
				document.getElementById("toggleexitTo").click();
			}
			if (document.getElementById("repeatBtn") && document.getElementById("repeatBtn").offsetParent !== null && document.getElementById("repeatBtn").innerHTML.indexOf("Repeat On") == -1) {
				document.getElementById("repeatBtn").click();
			}
			
			if (document.getElementById("mapsBtnText") && document.getElementById("mapsBtnText").offsetParent !== null && document.getElementById("mapsBtnText").innerHTML.indexOf("World") > -1) {
				if (restartOnZone <= lastItems) {
					setTimeout(function() { findVoidMap(); }, 1000)
				} else {
					document.getElementById("mapsBtnText").click();
					setTimeout(function() { itemsAction(); }, 3000)
				}
				return;
			}
			setTimeout(function() { waitForMap(); }, 1000)
		}

		var startMap = function() { 
			//console.log(getPortalTime() + " " +"startMap")
			var maps = document.getElementsByClassName("mapElementSelected");
			
			if (!maps.length || maps[0].offsetParent === null) {
				setTimeout(function() { startMap(); }, 1000);
				return;
			}
			
			maps[0].click();
			
			setTimeout(function() { 
				document.getElementById("selectMapBtn").click();
				
				setTimeout(function() { 
					var formationId = "formation4";
					if (document.getElementById(formationId) && document.getElementById(formationId).offsetParent !== null && autoFormation) {
						//document.getElementById(formationId).click();	
					}
					waitForMap();
				}, 1000);
			}, 1000);
		}

		var findVoidMap = function() { 
			var maps = document.getElementById("voidMapsBtn");
			if (!maps) {
				setTimeout(function() { findVoidMap(); }, 1000);
				return;
			}
			
			maps.click();
			startVoidMap();
		}

		var abandonNeeded = function() {
			for (var i = 0; i < abandons.length; i++) {
				if (abandons[i] == game.global.world) {
					abandons[i] = -1;
					return true;
				}
			}
			return false;
		}
		
		var createItemsMap = function() {
			if (!voidMapsFinished 
				&& game.global.world === restartOnZone 
				&& game.global.lastClearedMapCell === -1 
				&& game.global.lastClearedCell > 85 
				&& !abandonForced 
				&& document.getElementById("mapsBtnText")
				&& document.getElementById("mapsBtnText").offsetParent !== null
				&& document.getElementById("mapsBtnText").innerHTML.indexOf("Abandon Soldiers") > - 1) {
				console.log(getPortalTime() + " Abandon! Portal zone! " + game.global.totalVoidMaps + " void maps");
				if (document.getElementById("heliumPh")) {
					console.log(getPortalTime() + " Current hph: " + document.getElementById("heliumPh").innerHTML.split('/')[0]);
				}
				abandonForced = true;
				document.getElementById("mapsBtnText").click();
			}

			if (!voidMapsFinished 
				&& game.global.lastClearedMapCell === -1 
				&& game.global.lastClearedCell > 1 
				&& game.global.mapBonus < 2
				&& document.getElementById("mapsBtnText")
				&& document.getElementById("mapsBtnText").offsetParent !== null
				&& document.getElementById("mapsBtnText").innerHTML.indexOf("Abandon Soldiers") > - 1
				&& abandonNeeded()) {
				console.log(getPortalTime() + " Abandon on zone " + game.global.world);
				document.getElementById("mapsBtnText").click();
			}
		
			//console.log(getPortalTime() + " " +"Create maps " + lastItems);
			if (document.getElementById("selectMapBtn") && document.getElementById("selectMapBtn").innerHTML.indexOf("Continue") > -1 && document.getElementById("recycleMapBtn") && document.getElementById("recycleMapBtn").offsetParent !== null) {
				//console.log(getPortalTime() + " " +"Recycling map");
				document.getElementById("recycleMapBtn").click();
			}
		
			var newMapNeeded = true;
		
			if (game && game.global && game.global.mapsOwnedArray) {
				for (var i = 0; i < game.global.mapsOwnedArray.length; i++) { 
					var map = game.global.mapsOwnedArray[i];
					if (map.location != "Void" && map.location != "Bionic" && map.level == game.global.world) {
						//console.log(getPortalTime() + " " +"Already have map lvl " + game.global.world + ". No new map needed.");
						newMapNeeded = false;
					}
				} 
			}
		
			var createMap = document.getElementById("mapCreateBtn");
			if (!createMap || createMap.offsetParent === null) {
				var zone = findZoneNumber();
				if (zone > 0) {
					lastItems = zone;
				}
				//console.log(getPortalTime() + " " +"No create map button " + lastItems);
				setTimeout(function() { createItemsMap(); }, 100);
				return;
			}
			
			if (autoRecycle) {
				recycleBelow(true);
			}
			
			document.getElementById("lootAdvMapsRange").value = 9;
			adjustMap('loot', 9);
			document.getElementById("biomeAdvMapsSelect").value = "Plentiful";
			var mapDecreased = false;
			
			if (test476481 && game.global.world == 476) {
				newMapNeeded = true;
				document.getElementById("biomeAdvMapsSelect").value = "Random";
				document.getElementById("advExtraLevelSelect").value = "5";
				document.getElementById("lootAdvMapsRange").value = 0;
				document.getElementById("difficultyAdvMapsRange").value = 0;
				adjustMap('loot', 0);
				updateMapNumbers();
				updateMapCost();
			} else if (game.global.world != restartOnZone && (game.global.world % 10 == 0 || game.global.world % 10 > 5 || blacksmithZones > game.global.world)) {
				incrementMapLevel(-1);
				incrementMapLevel(-1);
				incrementMapLevel(-1);
				mapDecreased = true;
			}

			if (test480 && game.global.world == restartOnZone) {
				newMapNeeded = true;
				document.getElementById("biomeAdvMapsSelect").value = "Random";
				document.getElementById("advExtraLevelSelect").value = "5";
				document.getElementById("lootAdvMapsRange").value = 0;
				document.getElementById("difficultyAdvMapsRange").value = 0;
				adjustMap('loot', 0);
				updateMapNumbers();
				updateMapCost();
			}

			setTimeout(function() {
				if (newMapNeeded) {
					create20Map();
				} else {
					startMap();
				}
				
			}, 100);
		}
		
		var create20Map = function() {
			document.getElementById("mapCreateBtn").click();
			setTimeout(function() {
				if (test480) {
					startMap();
				} else if (game.global.mapsOwnedArray.length < 90 && (game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].size != 20 || game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].loot < 1.84)) {
					if (document.getElementsByClassName("mapThing").length) {
						document.getElementsByClassName("mapThing")[0].click();
						if (document.getElementById("recycleMapBtn").offsetParent != null) {
							document.getElementById("recycleMapBtn").click();
						}
					}

					create20Map();
				} else {
					startMap();
				}
			}, 50);
		}

		var itemsAction = function() {
			var actionNeeded = false;
			
			if (autoBelow20) {
				if (findZoneNumber() < 30 && findZoneNumber() > 0 && (((new Date() - new Date(game.global.portalTime)) / 1000 / 60) > autoBelow20Time)) {
					console.log(getPortalTime() + " " +"autoBelow20 on map " + findZoneNumber() + " after " + (new Date() - new Date(game.global.portalTime)) / 1000 / 60);
					autoBelow20 = false;
					actionNeeded = true;
					setTimeout(function() { document.getElementById("mapsBtnText").click(); }, 3000)
				}
			}
			
			if (findZoneNumber() >= restartOnZone - actionZones) {
				//console.log(getPortalTime() + " " +"findZoneNumber() >= " + restartOnZone + " - " + actionZones);
				if (game.global.mapBonus < 10 || findZoneNumber() >= restartOnZone) {
					actionNeeded = true;
				} else {
					//console.log(getPortalTime() + " " +"MAP FIGHT NOT NEEDED - fought 10 times in this zone already")
				}
			}
			
			if (findZoneNumber() == 460 && restartOnZone == 465 && game.global.lastClearedCell > 90) {
				actionNeeded = true;
			}
			
			if (test476481 && findZoneNumber() == 475 && restartOnZone == 480 && game.global.lastClearedCell > 85) {
				actionNeeded = true;
			}
			
			/*
			if (findZoneNumber() == 400) {
				//console.log(getPortalTime() + " " +"findZoneNumber() >= " + restartOnZone + " - " + actionZones);
				if (game.global.mapBonus < 10) {
					actionNeeded = true;
				}
			}
			*/
			
			if (findZoneNumber() > lastItems && findZoneNumber() >= itemsStart) {
				if ((findZoneNumber() % 10 <= 5) && (findZoneNumber() % 10 >= 1)) {
					//console.log(getPortalTime() + " " +"findZoneNumber() % 10 <= 5) && (findZoneNumber() % 10 >= 1): " + findZoneNumber());
					actionNeeded = true;
				}
				
				if (document.getElementById("GambesOP") && document.getElementById("GambesOP").offsetParent != null) {
					//console.log(getPortalTime() + " " +"GambesOP: " + findZoneNumber());
					actionNeeded = true;
				}
			}
			
			if (actionNeeded){
				//console.log(getPortalTime() + " " +"itemsAction " + findZoneNumber());
				//document.getElementById("mapsBtnText").click();
				mapsClicked();
				//console.log(getPortalTime() + " " +"maps clicked " + findZoneNumber());
				lastItems = game.global.world;
				setTimeout(function() { createItemsMap(); }, 1000);
			} else {
				//console.log(getPortalTime() + " " +"no need to buy items in zone " + findZoneNumber() + ". Last items zone " + lastItems + ". Restart on " + restartOnZone);
				setTimeout(function() { itemsAction(); }, 3000)
			}
		}

		setTimeout(function() { itemsAction(); }, 3000)
		setTimeout(function() { checkHeliumPerHour(); }, 3000)
		
		if (typeof (autohire) !== "undefined") autohire();
		
	}, 3000);


	trimpsIntervals.push(setInterval(function() { 
		if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - nurseryZones) {
			if (document.getElementById("Nursery") && document.getElementById("Nursery").offsetParent != null && autoNursery) {
				numTab('3'); 
				document.getElementById("Nursery").click();
				numTab('6');
			}
		}
	}, autoNurseryInterval));


	trimpsIntervals.push(setInterval(function() { 
		var formationId;
		if (game.global.world == 400 && game.global.lastClearedCell > 75) {
			formationId = "formation1";
		} else {
			if (findZoneNumber() >= essenceStartZone && findZoneNumber() <= essenceEndZone) {
				formationId = "formation4";
			} else if (findZoneNumber() > 0 && (findZoneNumber() >= restartOnZone - dominanceFormationZones || (dominanceStartZones))) {
				formationId = "formation2";
			}
		}
		
		if (autoFormation && document.getElementById(formationId) && document.getElementById(formationId).offsetParent !== null && formationId.indexOf("" + game.global.formation) == -1) {
			document.getElementById(formationId).click();	
		}
	}, 300));

	trimpsIntervals.push(setInterval(function() { 
		var GeneticistassistSetting;
		
		if (findZoneNumber() > 0 && findZoneNumber() < restartOnZone - gaSecsZones) {
			if (autoAssistant && document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf("1 Second")== -1) {
				//console.log("GeneticistassistSetting.click()");
				document.getElementById("GeneticistassistSetting").click();
			}
		} else if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - gaSecsZones) {
			if (autoAssistant && document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf(gaSecs + " Seconds")== -1) {
				//console.log("GeneticistassistSetting.click()");
				document.getElementById("GeneticistassistSetting").click();
			}
		}
		

		if (autoMetal) {
			if (game.global.world > 200) {
				if (document.getElementById("metalCollectBtn").getAttribute("class").indexOf("workColorTurkimp") == -1 && document.getElementById("metalCollectBtn") && document.getElementById("metalCollectBtn").offsetParent !== null && collectMetal) {
					console.log("metalCollectBtn.click()");
					document.getElementById("metalCollectBtn").click();	
				}
			} else {
				if (document.getElementById("scienceCollectBtn").getAttribute("class").indexOf("workColorOn") == -1 && document.getElementById("scienceCollectBtn") && document.getElementById("scienceCollectBtn").offsetParent !== null && collectMetal) {
					console.log("scienceCollectBtn.click()");
					document.getElementById("scienceCollectBtn").click();	
				}
			}
		}
			
		if (findZoneNumber() > 0) {
			if (maxFuel) {
				if (restartOnZone - miZones <= game.global.world) {
					if (document.getElementsByClassName("generatorStatePassive").length == 0 && document.getElementById("generatorPassiveBtn") && document.getElementById("generatorPassiveBtn").offsetParent != null) {
						//console.log("generatorPassiveBtn.click()");
						document.getElementById("generatorPassiveBtn").click();
					}
				} else if (document.getElementsByClassName("generatorStateActive").length == 0 && document.getElementById("generatorActiveBtn") && document.getElementById("generatorActiveBtn").offsetParent != null) {
					document.getElementById("generatorActiveBtn").click();
						//console.log("generatorActiveBtn.click()");
				}
			} else {
				if (findZoneNumber() > 230 + miStartZones && findZoneNumber() <= 230 + miStartZones + fuelZones) {
					if (document.getElementsByClassName("generatorStateActive").length == 0 && document.getElementById("generatorActiveBtn") && document.getElementById("generatorActiveBtn").offsetParent != null) {
						document.getElementById("generatorActiveBtn").click();
						//console.log("generatorActiveBtn.click()");
					}
				} else {
					if (document.getElementsByClassName("generatorStatePassive").length == 0 && document.getElementById("generatorPassiveBtn") && document.getElementById("generatorPassiveBtn").offsetParent != null) {
						document.getElementById("generatorPassiveBtn").click();
						//console.log("generatorPassiveBtn.click()");
					}
				}
			}
		}
		
		if (upgradeSupply) buyGeneratorUpgrade("Supply");
		if (upgradeEfficiency) buyGeneratorUpgrade("Efficiency")
		if (upgradeCapacity) buyGeneratorUpgrade("Capacity")
		if (upgradeOverclocker) buyGeneratorUpgrade("Overclocker")
		
	}, 3000));

	trimpsIntervals.push(setInterval(function() {  
		if (set01) {
			if (document.getElementById("tab6") && document.getElementById("tab6").offsetParent !== null) {
				numTab('6'); 
				setMax(0.1);
			}
		} 
	}, 3000));

	function upgradeAndClick(upgrade, click) {
		if (document.getElementById(upgrade)) {
			document.getElementById(upgrade).click();
			setTimeout(function() {
				if (document.getElementById(click)) {
					numTab(1);
					document.getElementById(click).click();
					numTab('6');
				}
			},100);
		}
		if (document.getElementById(upgrade)) {
			document.getElementById(upgrade).click();
		}
	}
	
	trimpsIntervals.push(setInterval(function() {
		if (forcefastUpgrade || (fastUpgrade && document.getElementById("autoPrestigeBtn") && document.getElementById("autoPrestigeBtn").innerHTML.indexOf("AutoPrestige All") > -1)) {
			upgradeAndClick("Dagadder", "Dagger");
			upgradeAndClick("Bootboost", "Boots");
			upgradeAndClick("Megamace", "Mace");
			upgradeAndClick("Hellishmet", "Helmet");
			upgradeAndClick("Polierarm", "Polearm");
			upgradeAndClick("Pantastic", "Pants");
			upgradeAndClick("Axeidic", "Battleaxe");
			upgradeAndClick("Smoldershoulder", "Shoulderguards");
			upgradeAndClick("Greatersword", "Greatsword");
			upgradeAndClick("Bestplate", "Breastplate");
			upgradeAndClick("Harmbalest", "Arbalest");
			upgradeAndClick("GambesOP", "Gambeson");
			if (autoCoordinationUpgrade) {
				if (document.getElementById("Coordination")) document.getElementById("Coordination").click();
			}
		}
	},100));

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
		
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Tribute"); }, 2000));
		trimpsIntervals.push(setInterval(function() { setMax(0.5); checkAndBuy("Magmamancer"); setMax(0.1); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Hut", "HutOwned", 1 /* 200 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("House", "HouseOwned", 1 /* 200 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Mansion", "MansionOwned", 1 /* 230 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Hotel", "HotelOwned", 1 /* 250 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Resort", "ResortOwned", 1 /* 280 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Collector", "CollectorOwned", 500); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Gateway", "GatewayOwned", 1 /* 150 */); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Warpstation", "WarpstationOwned", warpstationNumber); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkAndBuy("Gym", "GymOwned", gymNumber); }, 2000));

		var checkStorage = function(buttonId, timerId, resourceId) { 
			var button = document.getElementById(buttonId);
			var click = false;
			if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
				if (timerId) {
					var timer = document.getElementById(timerId);
					if (timer) {
						if (timer.innerHTML.match(/^[0-9]+ Sec(s)?$/) 
							|| timer.innerHTML.match(/^[0-9]+ Min(s)? [0-9]+ Secs$/) 
							|| timer.innerHTML.match(/^[0-9] Year(s)? [0-9]+ Days$/) 
							|| timer.innerHTML.match(/^[0-9]+ Day(s)? [0-9]+ Hours$/) 
							|| timer.innerHTML.match(/^[0-9]+ Hour(s)? [0-9]+ Mins$/)) {
							click = true;
						}
					}
				}

				if (!click && document.getElementById(resourceId)) {
					if (document.getElementById(resourceId).getElementsByClassName("percentColorYellow").length > 0 || document.getElementById(resourceId).getElementsByClassName("percentColorRed").length > 0 || document.getElementById(resourceId).getElementsByClassName("percentColorOrange").length > 0) {
						click = true;
					}
				}
			}
			
			if (click) {
				button.click();
			}
		}
		
		trimpsIntervals.push(setInterval(function() { checkStorage("Barn", "foodTimeToFill", "food"); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkStorage("Shed", "woodTimeToFill", "wood"); }, 2000));
		trimpsIntervals.push(setInterval(function() { checkStorage("Forge", "metalTimeToFill", "metal"); }, 2000));

		setTimeout(function() {

			trimpsIntervals.push(setInterval(function() { 
				if (!autoGolden) return;

				if (document.getElementById("VoidGolden") && document.getElementById("VoidGolden").offsetParent !== null) { 
					if (document.getElementById("goldenVoidOwned").innerHTML.indexOf("5") != 0 || document.getElementById("goldenHeliumOwned").innerHTML.indexOf("0") != 0) {
						if (document.getElementById("VoidGolden").getAttribute("class").indexOf("thingColorCanNotAfford") == -1) {
							if (autoGoldenVoid) {
								//console.log(getPortalTime() + " VoidGolden: " + (parseInt(document.getElementById("goldenVoidOwned").innerHTML) + 1));
								document.getElementById("VoidGolden").click(); 
								return;
							}
						}
					}
					
					if (autoGoldenHelium) {
						if (document.getElementById("HeliumGolden") && document.getElementById("HeliumGolden").offsetParent !== null && document.getElementById("HeliumGolden").getAttribute("class").indexOf("thingColorCanNotAfford") == -1) { 
							//console.log(getPortalTime() + " HeliumGolden: " + (parseInt(document.getElementById("goldenHeliumOwned").innerHTML) + 1));
							document.getElementById("HeliumGolden").click(); 
							return;
						}
					}
					
					if (autoGoldenBattle) {
						if (document.getElementById("BattleGolden") && document.getElementById("BattleGolden").offsetParent !== null && document.getElementById("BattleGolden").getAttribute("class").indexOf("thingColorCanNotAfford") == -1) {
							//console.log(getPortalTime() + " BattleGolden: " + (parseInt(document.getElementById("goldenBattleOwned").innerHTML) + 1));
							document.getElementById("BattleGolden").click(); 
							return;
						}
					}
				}
			}, 100));
		}, 100);
		
		trimpsIntervals.push(setInterval(function() {
			if ((findZoneNumber() % 10 > 6 && !document.getElementById("GambesOP")) || voidMapsFinished) {
				buyEquipment(20);
				buyArm(90);
			}
			if (buyLastZoneEquipment) {
				buyEquipment(lastZoneEquipment);
			} else if (autoEquip) {
				buyEquipment(autoEquipNumber);
			}
			if (game.global.world == 400) {
				buyEquipment(lastZoneEquipment);
				buyArm(lastZoneEquipment + 20);
			}
			
			if (findZoneNumber() % 10 > 0 && findZoneNumber() % 10 < 7) {
				buyEquipment(20, true);
				buyArm(50, true);
			}
		},1500));
		
		trimpsIntervals.push(setInterval(function() {
			if (game && game.global && game.global.totalVoidMaps && game.global.totalVoidMaps == 1 && game.global.lastClearedMapCell > 70) {
				//console.log(getPortalTime() + " " +"LAST VOID MAP ROW! BUY ARMS! " + game.global.lastClearedMapCell);
				checkAndBuy("Gambeson", "GambesonOwned", lastZoneEquipment - 10);
				checkAndBuy("Gambeson", "GambesonOwned", lastZoneEquipment - 10);
			}
		}, 500));
		
		trimpsIntervals.push(setInterval(function() {
			if (document.getElementsByClassName("eggCell").length && document.getElementsByClassName("eggCell")[0].offsetParent != null) {
				document.getElementsByClassName("eggCell")[0].click();
				setTimeout(function() {
					if (document.getElementsByClassName("eggMessage").length && document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText != lastEggMessage) {
						lastEggMessage = document.getElementsByClassName("eggMessage")[document.getElementsByClassName("eggMessage").length - 1].innerText;
						if (lastEggMessage.indexOf("food!") === -1 && lastEggMessage.indexOf("wood!") === -1 && lastEggMessage.indexOf("metal!") === -1) {
							console.log(getPortalTime() + " " +lastEggMessage);
						}
					}
				}, 1000);
			}
		}, 1000));

	}, 1000);

var myAutoUpgrades = ["Potency", "Efficiency", "Megaminer", "Megalumber", "Megafarming", "Megascience", "TrainTacular", "Supershield", "Gymystic", "Speedminer", "Speedlumber", "Speedscience", "Speedfarming"];

var myAutoUpgradeInterval = setInterval(function() {
	if (myAutoUpgrade) {
		for (var i = 0; i < myAutoUpgrades.length; i++) {
			if (document.getElementById(myAutoUpgrades[i]) && document.getElementById(myAutoUpgrades[i]).offsetParent !== null) document.getElementById(myAutoUpgrades[i]).click()
		}
	}
}, 100);
trimpsIntervals.push(myAutoUpgradeInterval);


trimpsIntervals.push(setInterval(function() { if (document.getElementById("Gigastation") && document.getElementById("Gigastation").offsetParent !== null) {
	document.getElementById("Gigastation").click();	
}; }, 1000 * 25));

trimpsIntervals.push(setInterval(function() { 
    if (document.getElementsByClassName("shriekStateDisabled")[0] && document.getElementsByClassName("shriekStateDisabled")[0].offsetParent !== null) {
		if (game.global.world % 5 == 0) {
			document.getElementsByClassName("shriekStateDisabled")[0].click();
		}
    }

}, 1000 * 5));

trimpsIntervals.push(setInterval(function() {
	if (upgradeNatureStack) {
		naturePurchase('stackTransfer', 'Poison');
		naturePurchase('stackTransfer', 'Wind');
		//naturePurchase('stackTransfer', 'Ice');
	}
	if (upgradeNature) {
		naturePurchase('upgrade', 'Poison');
		naturePurchase('upgrade', 'Wind');
		//naturePurchase('upgrade', 'Ice');
	}
}, 1000 * 5));

var showSettingsRow = function() {
	document.getElementById("settingsRow").setAttribute("style", "display: block! important");
}

var hideSettingsRow = function() {
	document.getElementById("settingsRow").setAttribute("style", "display: none! important");
}

var clearAllIntervals = function() {
	if (trimpsIntervals) {
		for (var i = 0; i < trimpsIntervals.length; i++) {
			clearInterval(trimpsIntervals[i]);
		}
	}
}

var autohire = function() {	
	var hire = function(who) {
		var seconds = 0;
		
		if (document.getElementById("trimpsTimeToFill") 
			&& document.getElementById("trimpsTimeToFill").innerHTML
			&& document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/)[0]
			&& document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/))
			
		seconds = parseInt(document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/)[0]);
		
		if (seconds < 5 && document.getElementById(who)) {
			document.getElementById(who).click();
		} 
	}

	trimpsIntervals.push(setInterval(function() {
		var unit = "";
		var jobsTitleUnemployed = document.getElementById("jobsTitleUnemployed");
		if (jobsTitleUnemployed) {
			var unemployed = jobsTitleUnemployed.innerHTML;
			if (unemployed && unemployed.indexOf("M ") > -1 && unemployed.indexOf("B ") > -1) {
				return;
			}
		}
		setMax(0.25);
		if (game.global.world < scientistsZones) {
			if (game.global.world < 70 && document.getElementById("Scientist")) {
				numTab('4'); 
				document.getElementById("Scientist").click();
				numTab('6');
			}
			
			hire("Scientist"); 
		} else {
			hire("Miner"); 
		}
		setMax(0.1);

	}, 300));
	trimpsIntervals.push(setInterval(function() { 
		if (game.global.world < hireNotMinersZones) {
			hire("Farmer"); 
		}
	}, 5000));
	trimpsIntervals.push(setInterval(function() { 
		if (game.global.world < hireNotMinersZones) {
			hire("Lumberjack"); 
		}
	}, 10000));
	trimpsIntervals.push(setInterval(function() { hire("Trainer"); }, 30000));
	trimpsIntervals.push(setInterval(function() { hire("Explorer"); }, 5000));
	trimpsIntervals.push(setInterval(function() { 
		if (game.global.world < hireNotMinersZones) {
			hire("Scientist"); 
		}
	}, 120000));
}

var startPerkUpgrades = function() {
	var upgradePerk = function() {
		var buttonId = "Looting_II";
		if (autoPerkPower) {
			buttonId = "Power_II";
		}
		if (autoPerkOther) {
			buttonId = autoPerkOther;
		}
		var button = document.getElementById(buttonId);
		if (button && button.getAttribute("class").indexOf("perkColorOn") > -1) {
			var clicks = 10;
			if (buttonId.indexOf("II") + 1) {
				clicks = 1000;
			}
			for (var i = 0; i < clicks; i++) {
				button.click();
			}
			autoPerked += clicks;
			setTimeout(upgradePerk, 1);
		} else {
			console.log(getPortalTime() + " Autoperked: " + autoPerked);
			activateClicked();
		}
	}
	
	if (game.global.world > 301 && !perksSet && autoPerk && game.global.world < 390) {
		perksSet = true;
		viewPortalUpgrades();
		setTimeout(upgradePerk, 300);
	}
}

trimpsIntervals.push(setInterval(startPerkUpgrades, 150 * 1000));

var buyBonePortal = function() {
	if (autoBuyBonePortal && game.global.b >= 100 && (game.global.world > 350 || game.global.world < 280)) {
		perksSet = false;
		console.log(getPortalTime() + " autoBuyBonePortal");
		purchaseMisc("helium");
	}
}

var setGaSecs = function(secs) {
	game.global.GeneticistassistSteps[3] = game.global.GeneticistassistSetting = gaSecs = secs;
}

trimpsIntervals.push(setInterval(buyBonePortal, 10 * 60 * 1000));

var armIds = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
var autoBuyBonePortal = true;
var shouldStartNewWorld = false;
var perksSet = false;
var autoPerk = true;
var autoPerked = 0;
var gaSecs = 45;
var lastItems = 0;
var autoNursery = true;
var autoFormation = true;
var autoAssistant = true;
var set01 = true;
var collectMetal = true;
var autoEquip = true;
var fuelZones = 70;
var miStartZones = 10;
var maxHeliumPerHour = 0.0;
var voidMapsFinished = false;
var fastUpgrade = true;
var dominanceFormationZones = 0;
var autoPortal = true;
var upgradeSupply = true;
var upgradeEfficiency = true;
var upgradeCapacity = true;
var upgradeOverclocker = true;
var abandonForced = false;
var lastEggMessage = "";
var autoGolden = true;
var autoBelow20 = true;
var autoBelow20Time = 9;
var autoMetal = true;
var forcefastUpgrade = false;
var autoCoordinationUpgrade = true;
var myAutoUpgrade = true;
var autoRecycle = true;
var autoNurseryInterval = 5000;
var autoGolden = true;
var autoGoldenVoid = true;
var autoGoldenHelium = true;
var autoGoldenBattle = false;
var upgradeNature = true;
var upgradeNatureStack = false;
var maxFuel = true;
var dominanceStartZones = 480;
var blacksmithZones = 472;
var warpstationNumber = 350;
var autoPerkPower = false;
var autoPerkOther = false; // autoPerkOther = "Carpentry_II" // autoPerkOther = "Motivation_II"

var buyLastZoneEquipment = false;

// -----------------------------

var hireNotMinersZones = 410;

var initialAbandons = [455];
var abandons = initialAbandons.slice();

var miZones = 106;

var itemsStart = 441;
var autoEquipNumber = 150;
var lastZoneEquipment = 147;

var essenceStartZone = 476;
var essenceEndZone = 475;

var gaSecsZones = 60;
var nurseryZones = 15
var actionZones = 10;

var restartOnZone = 465
var initialRestartZone = 465
var minHeliumPerHourPercent = 0.95;
var force471 = true;
var force486 = false;
var scientistsZones = 100;
var gymNumber = 1700;

// -----------------------------

setGaSecs(gaSecs)
fixBoard()

document.getElementById("fightBtn").click();

var test480 = true;
var test476481 = true;

if (test480) {
	initialRestartZone = 480;
	restartOnZone = 480;
	initialAbandons = [473, 474, 475];
	abandons = initialAbandons.slice();
	gaSecsZones = 75;
	nurseryZones = 32;
	actionZones = 25;
	force486 = true;
	gymNumber = 1750;
	miZones = 121;
	
	autoEquipNumber = 160;
    lastZoneEquipment = 148;
}

// 2018 02 25



challenge2 = true;
gogogo = false;

if (gogogo) {
	restartOnZone = 550;
	autoGoldenVoid = false;
	autoGoldenHelium = false;
	autoGoldenBattle = true;
	gaSecsZones = 60
	autoNursery = false;
	nurseryZones = 0
	miZones = 0;
	autoFormation = false;
	for (var n = 515; n < 550; n++)
	abandons.push(n);
	maxFuel = true; // disable after needed
	autoEquipNumber = 50;
	autobuyingNumber  = 50;
	blacksmithZones = 520;
}

 
if (challenge2) {
    //autoEquip = false;
	//autoCoordinationUpgrade = false;
	restartOnZone = 560;
	autoNursery = false;
	autoGoldenVoid = false;
	autoGoldenHelium = false;
	autoGoldenBattle = true;
	gaSecsZones = 90;
	//autoFormation = false;

	//for (var n = 471; n < 550; n++)
	//abandons.push(n);
	abandons = [];
	miZones = 0;
	autoFormation = false;
	maxFuel = true; 
}

// remove me
// remove me