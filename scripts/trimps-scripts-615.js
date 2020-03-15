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
			setTimeout(refixBoard, 1000);
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
				
				if (game.global.world == forcedPortalZone && (game.global.world != 600 || game.global.lastClearedCell >= 50)) {
					console.log(getPortalTime() + " fluffy exp rate: " + getFluffyExperienceRate() + " exp / s");
					console.log(getPortalTime() + " fluffy upgrade: " + (new Date(new Date() * 1 + (Fluffy.currentExp[2] - Fluffy.currentExp[1]) / getFluffyExperienceRate() * 1000)));
					console.log(getPortalTime() + " forced portal in zone " + forcedPortalZone + ". HPH: " + hph);
				} else {
					if (!voidMapsFinished || hph > maxHeliumPerHour * minHeliumPerHourPercent) {
						//console.log(getPortalTime() + " " +"!voidMapsFinished || hph > maxHeliumPerHour * " + minHeliumPerHourPercent + " " + (!voidMapsFinished) + " " + (hph > maxHeliumPerHour * minHeliumPerHourPercent));
						setTimeout(function() { checkHeliumPerHour(); }, 5000);
						return;
					}
					console.log(getPortalTime() + " " + "hph lower - portal: " + hph + " < " + maxHeliumPerHour + " * " + minHeliumPerHourPercent + "(" + (maxHeliumPerHour * minHeliumPerHourPercent) + ")");
				}

				if (covertIce) 
					for (var i = 0; i < 100; i++) naturePurchase('convert', 'Ice', 'Wind');
		
				if (autoPortal) {
					buyGeneratorUpgrade("Supply");
					//buyGeneratorUpgrade("Overclocker")
					//buyGeneratorUpgrade("Efficiency")
					//buyGeneratorUpgrade("Capacity")
					findPortal();
				} else {
					console.log(getPortalTime() + " " + "PORTAL TIME");
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
					setGaSecs(gaSecs);
					perksSet = false;
					buyLastZoneEquipment = false;
					autoPerked = 0;
					itemsAction(); 
					fluffyStart = game.global.fluffyExp;
					lastMap = 0;
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
							setTimeout(startNewWorld, 1000);
						}, 500);
					}, 500);
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
							perHour = parseFloat(perHourString) / 1000000000000.0;
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
							if (perHourString.length > 2 && perHourString.substring(perHourString.length - 2) == "Qi") {
								perHour = perHour * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
							}
							if (perHourString.length > 2 && perHourString.substring(perHourString.length - 2) == "Sx") {
								perHour = perHour * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
							}
							if (perHourString.length > 2 && perHourString.substring(perHourString.length - 2) == "Sp") {
								perHour = perHour * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;
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
				
				if (!maps.length || maps[0].offsetParent === null) {
					setTimeout(function() { findDoa(); }, 1000);
					return;
				}
				
				for (var i = 0; i < maps.length; i++) {
					if (maps[i].innerHTML == "Dimension of Anger") {
						setFormation('2');
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
				setFormation('4');
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
						var formationId = "formation4";
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
					desiredRepeatUntil = "Repeat for Items";
					
					for (var i = 0; i < repeatForAnyZones.length; i++) {
						if (game.global.world == repeatForAnyZones[i]) {
							desiredRepeatUntil = "Repeat for Any";
						}
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
						setTimeout(function() { itemsAction(); }, 3000);
						if (autoFormation) {
							setFormation('2');
						}
					}
					return;
				}
				setTimeout(function() { waitForMap(); }, 1000)
			}

			var startMap = function() { 
				var maps = document.getElementsByClassName("mapElementSelected");
				
				if (!maps.length || maps[0].offsetParent === null) {
					maps = document.getElementsByClassName("mapElementNotSelected");
					if (maps.length && maps[0].offsetParent !== null) {
						maps[0].click();
					}
					setTimeout(function() { startMap(); }, 500);
					return;
				}
				
				maps[0].click();
				
				setTimeout(function() { 
					document.getElementById("selectMapBtn").click();
					
					setTimeout(function() { 
						if (autoFormation && game.global.world == 500) {
							setFormation('4');
						}
						waitForMap();
					}, 500);
				}, 500);
			}

			var findVoidMap = function() { 
				var maps = document.getElementById("voidMapsBtn");
				if (!maps) {
					setTimeout(function() { findVoidMap(); }, 500);
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
					&& game.global.lastClearedCell > 82
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
					&& game.global.lastClearedCell > 0 
					&& game.global.mapBonus < 3
					&& document.getElementById("mapsBtnText")
					&& document.getElementById("mapsBtnText").offsetParent !== null
					&& document.getElementById("mapsBtnText").innerHTML.indexOf("Abandon Soldiers") > - 1
					&& abandonNeeded()) {
					//console.log(getPortalTime() + " Abandon on zone " + game.global.world);
					document.getElementById("mapsBtnText").click();
				}
			
				if (document.getElementById("selectMapBtn") && document.getElementById("selectMapBtn").innerHTML.indexOf("Continue") > -1 && document.getElementById("recycleMapBtn") && document.getElementById("recycleMapBtn").offsetParent !== null) {
					document.getElementById("recycleMapBtn").click();
				}
			
				var newMapNeeded = true;
			
				var createMap = document.getElementById("mapCreateBtn");
				if (!createMap || createMap.offsetParent === null) {
					var zone = findZoneNumber();
					if (zone > 0) {
						lastItems = zone;
					}
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
				
				if (game.global.world == 500) {
					document.getElementById("advExtraLevelSelect").value = "5";
					document.getElementById("advSpecialSelect").value = "lmc";
				} else if (game.global.world == 516) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 521) {
					document.getElementById("advExtraLevelSelect").value = "4";
					document.getElementById("advSpecialSelect").value = "p";
				}  else if (game.global.world == 525) {
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
					document.getElementById("advExtraLevelSelect").value = "10";
					document.getElementById("advSpecialSelect").value = 0;
				} else if (game.global.world == 536) {
					document.getElementById("advExtraLevelSelect").value = "6";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 540) {
					document.getElementById("advExtraLevelSelect").value = "5";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 546) {
					document.getElementById("advExtraLevelSelect").value = "6";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 551) {
					document.getElementById("advExtraLevelSelect").value = "4";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 554) {
					document.getElementById("advExtraLevelSelect").value = "9";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
				} else if (game.global.world == 555) {
					document.getElementById("advExtraLevelSelect").value = "10";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
					document.getElementById("advSpecialSelect").value = 0;
					
					if (game.resources.fragments.owned < 0.603e+51) {
						document.getElementById("sizeAdvMapsRange").value = "3";
					} else if (game.resources.fragments.owned < 0.666e+51) {
						document.getElementById("sizeAdvMapsRange").value = "4";
					} else if (game.resources.fragments.owned < 0.734e+51) {
						document.getElementById("sizeAdvMapsRange").value = "5";
					} else if (game.resources.fragments.owned < 0.810e+51) {
						document.getElementById("sizeAdvMapsRange").value = "6";
					} else if (game.resources.fragments.owned < 0.893e+51) {
						document.getElementById("sizeAdvMapsRange").value = "7";
					} else if (game.resources.fragments.owned < 0.985e+51) {
						document.getElementById("sizeAdvMapsRange").value = "8";
					}
					
					if (game.resources.fragments.owned > 2.39e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 9;
					} else if (game.resources.fragments.owned > 2.17e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 8;
					} else if (game.resources.fragments.owned > 1.96e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 7;
					} else if (game.resources.fragments.owned > 1.78e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 6;
					} else if (game.resources.fragments.owned > 1.62e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 5;
					} else if (game.resources.fragments.owned > 1.46e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 4;
					} else if (game.resources.fragments.owned > 1.33e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 3;
					} else if (game.resources.fragments.owned > 1.21e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 2;
					} else if (game.resources.fragments.owned > 1.1e+51) {
						document.getElementById("difficultyAdvMapsRange").value = 1;
					} 
				} else if (game.global.world == 564) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("advSpecialSelect").value = "p";
				} /*else if (game.global.world == 566) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("advSpecialSelect").value = "p";
				} */else if (game.global.world == 568) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 576) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("advSpecialSelect").value = "p";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
				} else if (game.global.world == 581) {
					document.getElementById("advExtraLevelSelect").value = "4";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 585) {
					document.getElementById("advExtraLevelSelect").value = "10";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
					document.getElementById("advSpecialSelect").value = 0;
					if (game.resources.fragments.owned > 9.75e+53) {
						document.getElementById("advSpecialSelect").value = "p";
						if (game.resources.fragments.owned > 2.36e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 9;
						} else if (game.resources.fragments.owned > 2.14e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 8;
						} else if (game.resources.fragments.owned > 1.94e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 7;
						} else if (game.resources.fragments.owned > 1.76e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 6;
						} else if (game.resources.fragments.owned > 1.60e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 5;
						} else if (game.resources.fragments.owned > 1.45e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 4;
						} else if (game.resources.fragments.owned > 1.32e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 3;
						} else if (game.resources.fragments.owned > 1.20e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 2;
						} else if (game.resources.fragments.owned > 1.08e+54) {
							document.getElementById("difficultyAdvMapsRange").value = 1;
						} 
					} else if (game.resources.fragments.owned > 6.27e+53) {
						document.getElementById("difficultyAdvMapsRange").value = 9;
					} 
				} else if (game.global.world == 591) {
					document.getElementById("advExtraLevelSelect").value = "10";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
					document.getElementById("advSpecialSelect").value = 0;
					if (game.resources.fragments.owned > 7.21e+54) {
						document.getElementById("advSpecialSelect").value = "p";
						document.getElementById("difficultyAdvMapsRange").value = 9;
					} else if (game.resources.fragments.owned > 2.99e+54) {
						document.getElementById("advSpecialSelect").value = "p";
					} else if (game.resources.fragments.owned > 1.92e+54) {
						document.getElementById("difficultyAdvMapsRange").value = 9;
					} 
				} else if (game.global.world == 600) {
					document.getElementById("advExtraLevelSelect").value = "5";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 602) {
					document.getElementById("advSpecialSelect").value = "lmc";
				} else if (game.global.world == 606) {
					document.getElementById("advExtraLevelSelect").value = "7";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 611) {
					document.getElementById("advExtraLevelSelect").value = "4";
					document.getElementById("advSpecialSelect").value = "p";
				} else if (game.global.world == 615) {
					document.getElementById("advExtraLevelSelect").value = "10";
					document.getElementById("biomeAdvMapsSelect").value = "Random";
					document.getElementById("lootAdvMapsRange").value = 0;
					document.getElementById("difficultyAdvMapsRange").value = 0;
					document.getElementById("advSpecialSelect").value = 0;
					if (game.resources.fragments.owned > 6.4e+56) {
						document.getElementById("advSpecialSelect").value = "p";
						document.getElementById("difficultyAdvMapsRange").value = 9;
					} else if (game.resources.fragments.owned > 2.65e+56) {
						document.getElementById("advSpecialSelect").value = "p";
					} 
				} else if (game.global.world != restartOnZone && (game.global.world % 10 == 0 || game.global.world % 10 > 5 || blacksmithZones > game.global.world || lastMap >= game.global.world)) {
					incrementMapLevel(-1);
					incrementMapLevel(-1);
					incrementMapLevel(-1);
					mapDecreased = true;
				}

				updateMapNumbers();
				updateMapCost();

				setTimeout(function() {
					if (newMapNeeded) {
						var tmp = parseInt(mapLevelInput.value) + parseInt(document.getElementById("advExtraLevelSelect").value);
						
						if (tmp > lastMap) {
							lastMap = tmp;
						}
						
						create20Map();
					} else {
						startMap();
					}
					
				}, 100);
			}
			
			var create20Map = function() {
				var fragmentsCount = game.resources.fragments.owned;
				document.getElementById("mapCreateBtn").click();
				console.log(getPortalTime() + " zone " + game.global.world + ",  map created, fragments " + fragmentsCount + " - " + game.resources.fragments.owned);
				setTimeout(function() {
					startMap();
				}, 50);
			}

			var itemsAction = function() {
				var actionNeeded = false;
				
				if (autoBelow20) {
					if (findZoneNumber() < 70 && findZoneNumber() > 0 && (((new Date() - new Date(game.global.portalTime)) / 1000 / 60) > autoBelow20Time)) {
						console.log(getPortalTime() + " " +"autoBelow20 on map " + findZoneNumber() + " after " + (new Date() - new Date(game.global.portalTime)) / 1000 / 60);
						autoBelow20 = false;
						actionNeeded = true;
						setTimeout(function() { document.getElementById("mapsBtnText").click(); }, 3000)
					}
				}
				
				if (findZoneNumber() >= restartOnZone - actionZones) {
					if (game.global.mapBonus == 0 || findZoneNumber() >= restartOnZone) {
						actionNeeded = true;
					}
				}
				
				if (findZoneNumber() == 520 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}
				if (findZoneNumber() == 535 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}
				if (findZoneNumber() == 545 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}
				if (findZoneNumber() == 550 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}
				
				if (findZoneNumber() == 575 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}
				/*if (findZoneNumber() == 565 && game.global.lastClearedCell > 93) {
					actionNeeded = true;
				}*/
				
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
				
				for (var i = 0; i < noActionZones.length; i++) {
					if (noActionZones[i] == game.global.world) {
						actionNeeded = false;
					}
				}
				
				if (game.global.world == 499 && game.global.lastClearedCell < 90)
					actionNeeded = false;
				
				if (actionNeeded){
					//console.log(getPortalTime() + " " +"itemsAction " + findZoneNumber());
					//document.getElementById("mapsBtnText").click();
					mapsClicked();
					//console.log(getPortalTime() + " " +"maps clicked " + findZoneNumber());
					lastItems = game.global.world;
					setTimeout(function() { createItemsMap(); }, /* !!! 1000*/ 500);
				} else {
					//console.log(getPortalTime() + " " +"no need to buy items in zone " + findZoneNumber() + ". Last items zone " + lastItems + ". Restart on " + restartOnZone);
					setTimeout(function() { itemsAction(); }, /* !!! 1500*/ 200)
				}
			}

			setTimeout(function() { itemsAction(); }, 200)
			setTimeout(function() { checkHeliumPerHour(); }, 1500)
			
			if (typeof (autohire) !== "undefined") autohire();
			
		}, 3000);


		trimpsIntervals.push(setInterval(function() { 
			if (canAffordBuilding('Nursery', true, false, false, false, 25)) {
				if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - nurseryZones) {
					if ((game.global.world < 246) || ((game.global.world - 246) % 15 > 3)) {
						var button = document.getElementById("Nursery");
						if (button && button.offsetParent != null && autoNursery) {
							numTab('3'); 
							document.getElementById("Nursery").click();
							//console.log("Nursery bought in zone " + game.global.world);
							numTab('6');
						}
					}
				}
			}
		}, autoNurseryInterval));


		trimpsIntervals.push(setInterval(function() { 
			var formationId;

			if (findZoneNumber() >= essenceStartZone && findZoneNumber() <= essenceEndZone && (game.global.lastClearedCell > -1 || findZoneNumber() > essenceStartZone)) {
				formationId = "formation4";
			} else if (findZoneNumber() > 0 && (findZoneNumber() >= restartOnZone - dominanceFormationZones || (dominanceStartZones))) {
				formationId = "formation2";
			}
			
			if (autoFormation && document.getElementById(formationId) && document.getElementById(formationId).offsetParent !== null && formationId.indexOf("" + game.global.formation) == -1) {
				document.getElementById(formationId).click();
			}
		}, 300));

		trimpsIntervals.push(setInterval(function() { 
			var GeneticistassistSetting;
			
			if (findZoneNumber() > 0 && (findZoneNumber() < restartOnZone - gaSecsZones || (stopGaAssistantAfter600Spire && game.global.world > 600))) {
				if (autoAssistant && document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf("1 Second")== -1) {
					toggleGeneticistassist();
				}
			} else if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - gaSecsZones) {
				if (autoAssistant && document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf(gaSecs + " Seconds")== -1) {
					toggleGeneticistassist();
				}
			}
			

			if (autoMetal) {
				if (game.global.world > 200) {
					if (document.getElementById("metalCollectBtn").getAttribute("class").indexOf("workColorTurkimp") == -1 && document.getElementById("metalCollectBtn") && document.getElementById("metalCollectBtn").offsetParent !== null && collectMetal) {
						document.getElementById("metalCollectBtn").click();
					}
				} else {
					if (document.getElementById("scienceCollectBtn").getAttribute("class").indexOf("workColorOn") == -1 && document.getElementById("scienceCollectBtn") && document.getElementById("scienceCollectBtn").offsetParent !== null && collectMetal) {
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
					if (document.getElementById("tab6Text") && document.getElementById("tab6Text").innerText != "0.1") {
						numTab('6'); 
						setMax(0.1);
					}
				}
			} 
		}, 5000));

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
				if (game.global.world > buyEquipmentStartZone) {
					checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber, onlyWhenOne);
					checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber, onlyWhenOne);
					checkAndBuy("Greatsword", "GreatswordOwned", arbalestNumber - 2, onlyWhenOne);
					checkAndBuy("Battleaxe", "BattleaxeOwned", arbalestNumber - 1, onlyWhenOne);
					checkAndBuy("Polearm", "PolearmOwned", arbalestNumber - 1, onlyWhenOne);
					checkAndBuy("Mace", "MaceOwned", arbalestNumber, onlyWhenOne);
					checkAndBuy("Dagger", "DaggerOwned", arbalestNumber + 2, onlyWhenOne);
				}
			}

			var buyArm = function(gambesonNumber, onlyWhenOne) {
				checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber, onlyWhenOne);
				if (game.global.world > buyArmStartZone) {
					checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber, onlyWhenOne);
					checkAndBuy("Breastplate", "BreastplateOwned", gambesonNumber - 2, onlyWhenOne);
					checkAndBuy("Shoulderguards", "ShoulderguardsOwned", gambesonNumber - 2, onlyWhenOne);
					checkAndBuy("Pants", "PantsOwned", gambesonNumber - 2, onlyWhenOne);
					checkAndBuy("Helmet", "HelmetOwned", gambesonNumber - 1, onlyWhenOne);
					checkAndBuy("Boots", "BootsOwned", gambesonNumber - 1, onlyWhenOne);
				}
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
											&& value > 2 + parseInt(document.getElementById(armIds[i] + "Owned").innerHTML.match(/[0-9]+/)[0])
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
			
			trimpsIntervals.push(setInterval(function() { checkAndBuy("Tribute"); }, 5001));
			if (buyLowLevelHouses) {
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Hut", "HutOwned", 1 /* 200 */); }, 2002));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("House", "HouseOwned", 1 /* 200 */); }, 2003));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Mansion", "MansionOwned", 1 /* 230 */); }, 2004));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Hotel", "HotelOwned", 1 /* 250 */); }, 2005));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Resort", "ResortOwned", 1 /* 280 */); }, 2006));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Gateway", "GatewayOwned", 1 /* 150 */); }, 2007));
				trimpsIntervals.push(setInterval(function() { checkAndBuy("Collector", "CollectorOwned", 500); }, 2008));
			}
			trimpsIntervals.push(setInterval(function() { checkAndBuy("Warpstation", "WarpstationOwned", warpstationNumber); }, 1999));
			trimpsIntervals.push(setInterval(function() { checkAndBuy("Gym", "GymOwned", gymNumber); }, 15000));

			var checkStorage = function(buttonId, timerId, resourceId) { 
				var button = document.getElementById(buttonId);
				var click = false;
				if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
					if (timerId) {
						var timer = document.getElementById(timerId);
						if (timer) {
							var innerHTML = timer.innerHTML;
							if (innerHTML.match(/^[0-9]+ Sec(s)?$/) 
								|| innerHTML.match(/^[0-9]+ Min(s)? [0-9]+ Sec(s)?$/) 
								|| innerHTML.match(/^[0-9]{1,4}K? Year(s)? [0-9]+ Day(s)?$/) 
								|| innerHTML.match(/^[0-9]+ Day(s)? [0-9]+ Hour(s)?$/) 
								|| innerHTML.match(/^[0-9]+ Hour(s)? [0-9]+ Min(s)?$/)) {
								if (!buyStorageOnlyWhenHalf) {
									click = true;
								}
							}
						}
					}

					if (!click) {
						var resource = document.getElementById(resourceId);
						if (resource && (resource.getElementsByClassName("percentColorYellow").length > 0 
							|| resource.getElementsByClassName("percentColorRed").length > 0 
							|| resource.getElementsByClassName("percentColorOrange").length > 0)) {
							click = true;
						}
					}
				}
				
				if (click) {
					button.click();
				}
			}
			
			trimpsIntervals.push(setInterval(function() { checkStorage("Barn", "foodTimeToFill", "food"); }, 250));
			trimpsIntervals.push(setInterval(function() { checkStorage("Shed", "woodTimeToFill", "wood"); }, 250));
			trimpsIntervals.push(setInterval(function() { checkStorage("Forge", "metalTimeToFill", "metal"); }, 250));

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
				if (game.global.world == 500) {
					buyEquipment(autoEquipNumber + 20);
					buyArm(autoEquipNumber + 20);
				}
				
				if (findZoneNumber() % 10 > 0 && findZoneNumber() % 10 < 7) {
					buyEquipment(20, true);
					buyArm(50, true);
				}
			}, 500));
			
			trimpsIntervals.push(setInterval(function() {
				if (game && game.global && game.global.totalVoidMaps && game.global.totalVoidMaps == 2 && game.global.lastClearedMapCell > 70) {
					if (game.global.world == restartOnZone) {
						checkAndBuy("Helmet", "HelmetOwned", lastZoneEquipment - 10);
						checkAndBuy("Helmet", "HelmetOwned", lastZoneEquipment - 10);
					}
				}
				if (game && game.global && game.global.totalVoidMaps && game.global.totalVoidMaps == 1 && game.global.lastClearedMapCell > 70) {
					//console.log(getPortalTime() + " " +"LAST VOID MAP ROW! BUY ARMS! " + game.global.lastClearedMapCell);
					if (game.global.world == restartOnZone) {
						checkAndBuy("Boots", "BootsOwned", lastZoneEquipment - 10);
						checkAndBuy("Boots", "BootsOwned", lastZoneEquipment - 10);
					} else {
						checkAndBuy("Gambeson", "GambesonOwned", lastZoneEquipment - 10);
						checkAndBuy("Gambeson", "GambesonOwned", lastZoneEquipment - 10);
					}
				}
			}, 500));
			
			trimpsIntervals.push(setInterval(function() {
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
			}, 1000));

		}, 1000);

	var myAutoUpgrades = ["Potency", "Efficiency", "Megaminer", "Megalumber", "Megafarming", "Megascience", "TrainTacular", "Supershield", "Gymystic", "Speedminer", "Speedlumber", "Speedscience", "Speedfarming", "Speedexplorer"];

	var myAutoUpgradeInterval = setInterval(function() {
		if (myAutoUpgrade) {
			for (var i = 0; i < myAutoUpgrades.length; i++) {
				var button = document.getElementById(myAutoUpgrades[i]);
				if (button && button.offsetParent !== null) button.click()
			}
		}
	}, 100);
	trimpsIntervals.push(myAutoUpgradeInterval);


	trimpsIntervals.push(setInterval(function() { if (document.getElementById("Gigastation") && document.getElementById("Gigastation").offsetParent !== null) {
		if (autoGiga) {
			document.getElementById("Gigastation").click();
		}
	}; }, 1000 * 4));

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
		var hire = function(who, always, number) {
			if (autohireDisabled)
				return;

			if (stopHiringAfterRestartZone && game.global.world > restartOnZone)
				return;
			
			var seconds = 0;

			if (document.getElementById("trimpsTimeToFill") 
				&& document.getElementById("trimpsTimeToFill").innerHTML
				&& document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/)[0]
				&& document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/))
				
			seconds = parseInt(document.getElementById("trimpsTimeToFill").innerHTML.match(/[0-9]+/)[0]);
			
			if ((seconds < 5 || always) && document.getElementById(who) && document.getElementById(who).getAttribute("class").indexOf("thingColorCanAfford") > -1) {
				if (number){
					setMax(number);
				}

				document.getElementById(who).click();

				if (number){
					setMax(0.1);
				}
			} 
		}

		trimpsIntervals.push(setInterval(function() {
			var unit = "";
			var jobsTitleUnemployed = document.getElementById("jobsTitleUnemployed");
			if (jobsTitleUnemployed) {
				var unemployed = jobsTitleUnemployed.innerHTML;
				if (game.global.world > 100 && unemployed && (unemployed.indexOf("M ") > -1 || unemployed.indexOf("B ") > -1 || unemployed.indexOf("T ") > -1)) {
					return;
				}
			}
			
			if (game.global.world < scientistsZones) {
				if (game.global.world < 70 && document.getElementById("Scientist")) {
					numTab('4'); 
					document.getElementById("Scientist").click();
					numTab('6');
				}
				
				hire("Scientist", false, 0.25); 
				hire("Miner", false, 0.1); 
			} else {
				hire("Miner", false, 0.25); 
			}

		}, 300));
		trimpsIntervals.push(setInterval(function() { 
			if (game.global.world < hireNotMinersZones) {
				hire("Farmer"); 
			}
		}, 2900));
		trimpsIntervals.push(setInterval(function() { 
			if (game.global.world < hireNotMinersZones) {
				hire("Lumberjack"); 
			}
		}, 6500));
		trimpsIntervals.push(setInterval(function() { hire("Trainer"); }, 30000));
		trimpsIntervals.push(setInterval(function() { hire("Explorer", true, 0.5); }, 5000));
		trimpsIntervals.push(setInterval(function() { hire("Magmamancer", true, 0.5); }, 5000));
		trimpsIntervals.push(setInterval(function() { 
			if (game.global.world < hireNotMinersZones) {
				hire("Scientist"); 
			}
		}, 120000));
	}

	var startPerkUpgrades = function() {
		function precisionRound(number, precision) {
			var factor = Math.pow(10, precision);
			return Math.floor(number * factor) / factor;
		}

		var createAutoPerkedText = function(number) {
			if (number >= 1000000) {
				return precisionRound(number / 1000000, 2) + "M";
			}
			if (number >= 1000) {
				return precisionRound(number / 1000, 2) + "k";
			}
			return number;
		}

		var upgradePerk = function() {
			var buttonId = "Looting_II";
			if (autoPerkPower) {
				buttonId = "Power_II";
			}
			if (autoPerkOther) {
				buttonId = autoPerkOther;
			}
			var clicks = 1;
			var step = 1;
			if (buttonId.indexOf("II") + 1) {
				clicks = 1000;
				numTab(4, true);
				step = 100;
			}

			var button = document.getElementById(buttonId);
			if (button && button.getAttribute("class").indexOf("perkColorOn") > -1 && autoPerked < 1000000) {
				for (var i = 0; i < clicks; i++) {
					button.click();
				}
				autoPerked += clicks * step;
				setTimeout(upgradePerk, 1);
			} else {
				console.log(getPortalTime() + " Autoperked: " + createAutoPerkedText(autoPerked));
				activateClicked();
				if (button && button.getAttribute("class").indexOf("perkColorOn") > -1 && autoPerked >= 1000000) {
					perksSet = false;
					autoPerked = 0;
				}
			}
			numTab(1, true);
		}
		
		if (game.global.world > 301 && !perksSet && autoPerk && game.global.world < 390) {
			perksSet = true;
			viewPortalUpgrades();
			setTimeout(upgradePerk, 300);
		}
	}

	//trimpsIntervals.push(setInterval(startPerkUpgrades, 100 * 1000));


	var exitSpire = function() {
		if (autoExitSpire && game.global.world == 500 && game.global.spireActive && game.global.lastClearedCell > autoExitSpireCells) {
			endSpire(true);
		}
	}
	trimpsIntervals.push(setInterval(exitSpire, 1000));

	var pauseGeneratorBeforeRestart = function() {
		if (autoPauseGenerator && game.global.world >= autoPauseGeneratorZone && !game.global.genPaused) {
			pauseGenerator();
		}
	}
	trimpsIntervals.push(setInterval(pauseGeneratorBeforeRestart, 3000));

	var setGaSecs = function(secs) {
		game.global.GeneticistassistSteps[3] = game.global.GeneticistassistSetting = gaSecs = secs;
	}

	var getFluffyExperienceRate = function() {
		if (fluffyStart == 0) {
			return 0;
		}
		var expEarned = game.global.fluffyExp - fluffyStart;
		
		return Math.round(expEarned / (((new Date() * 1) - game.global.portalTime) / 1000));
	}

	var buyBonePortal = function(force) {
		var bonesNumber = game.global.b;
		if ((autoBuyBonePortal || force) && bonesNumber >= 100 && (game.global.world > 350 || game.global.world < 280)) {
			perksSet = false;
			console.log(getPortalTime() + " autoBuyBonePortal");
			purchaseMisc("helium");
			if (force && bonesNumber >= 200) {
				setTimeout(function() {
					buyBonePortal(true);
				}, 3000);
			}
		}
	}

	trimpsIntervals.push(setInterval(buyBonePortal, 10 * 60 * 1000));

	var unpressCtrl = function() {
		if (ctrlPressed) {
			ctrlPressed = false;
			checkButtons("upgrades");
			toggleGeneticistassist(true);
		}
	}

	trimpsIntervals.push(setInterval(unpressCtrl, 30 * 1000));


	setInterval(function() { 
		if (Fluffy.isMaxLevel()) { 
			Fluffy.prestige(); 
			setTimeout(function() {
				buyBonePortal(true);
			}, 3000);
			console.log("Fluffy prestiged"); 
		} 
	}, 60 * 1000);


trimpsIntervals.push(setInterval(function() {
	if (fastFight && !game.global.fighting && game.global.world <= fastFightZones) {
		var fightBtn = document.getElementById("fightBtn");
		if (fightBtn && fightBtn.offsetParent !== null) {
			fightBtn.click();
		}
	}
}), 300);

trimpsIntervals.push(setInterval(function() {
	//var goodModsNames = "FluffyExp|MinerSpeed|empty|metalDrop|woodDrop|ExplorerSpeed|fragmentsDrop|trimpHealth|critChance|trimpAttack|critDamage";
	//var goodModsNames = "empty|MinerSpeed|LumberjackSpeed|metalDrop|woodDrop|trimpHealth|critChance|trimpAttack|critDamage|trimpBlock";
	var goodModsNames = "empty|MinerSpeed|ExplorerSpeed|metalDrop|foodDrop|DragimpSpeed";
	if (game.global.maxCarriedHeirlooms > game.global.heirloomsCarried.length) {
		for (var i = 0; i < game.global.heirloomsExtra.length; i++) { 
			var theHeirloom = game.global.heirloomsExtra[i];
			if (theHeirloom.rarity == 8) {
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
}, 5000));

trimpsIntervals.push(setInterval(function() { 
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 60 * 1));

if (fluffyMatureInterval)
	clearInterval(fluffyMatureInterval);

var fluffyMatureInterval = setInterval(function() {
	if (game.global.world < 232)
		return;
		
	var div = document.getElementById("fluffy-mature");
	if (!div) {
		div = document.createElement("DIV");
		div.setAttribute("id", "fluffy-mature");
		document.getElementById("logColumn").prepend(div);
	}
	div.innerHTML = "" + (new Date(new Date() * 1 + (Fluffy.currentExp[2] - Fluffy.currentExp[1]) / getFluffyExperienceRate() * 1000));
}, 1000);


var addCustomMessage = function(message) {
	var customLogMessage = document.getElementById('customLogMessage');
	if (!customLogMessage) { 
		var customLogMessage = document.createElement('p');
		customLogMessage.setAttribute('id', 'customLogMessage');
		document.getElementById('logColumn').prepend(customLogMessage);
	}
	customLogMessage.innerHTML = message;
}


var autoBuyBonePortal = false;
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
var upgradeSupply = true; // 98
var upgradeEfficiency = false;//true;
var upgradeCapacity = false;//true;
var upgradeOverclocker = false;//true;
var abandonForced = false;
var lastEggMessage = "";
var autoGolden = true;
var autoBelow20 = true;
var autoBelow20Time = 5;
var autoMetal = true;
var forcefastUpgrade = false;
var autoCoordinationUpgrade = true;
var myAutoUpgrade = true;
var autoRecycle = true;
var autoGolden = true;
var autoGoldenVoid = true;
var autoGoldenHelium = true;
var autoGoldenBattle = false;
var upgradeNature = true;
var upgradeNatureStack = false;
var maxFuel = true;
var dominanceStartZones = 480;
var blacksmithZones = 496;
var warpstationNumber = 350;
var autoPerkPower = false;
var autoPerkOther = false; // autoPerkOther = "Carpentry_II" // autoPerkOther = "Motivation_II"

var buyLastZoneEquipment = false;
var fluffyStart = 0;
if (game.global.world <= 301) {
	fluffyStart = game.global.fluffyExp;
}

// -----------------------------

var armIds = ["Dagger", "Mace", "Polearm", "Battleaxe", "Greatsword", "Arbalest"];
var hireNotMinersZones = 410;


var miZones = -100; //160;

var itemsStart = 499;

var essenceStartZone = 506;
var essenceEndZone = 505;

var scientistsZones = 100;
var gymNumber = 2280;
var autoExitSpireCells = 999;//20
var autoExitSpire = false;
var lastMap = 0;
var autoPauseGenerator = false;
var autoPauseGeneratorZone = 999999;
var buyEquipmentStartZone = 0;
var buyArmStartZone = 0;
var buyLowLevelHouses = false;
var stopHiringAfterRestartZone = true;

// -----------------------------

setGaSecs(gaSecs)
fixBoard()

gaSecs = 1;
setGaSecs(gaSecs);
buyArmStartZone = 296;
buyEquipmentStartZone = 296;

var autohireDisabled = false;

autoPerkOther = "Curious"
autoPerkOther = "Cunning"
autoPerkOther = "Carpentry_II"
autoPerkOther = "Motivation_II"
autoPerkOther = "Toughness_II"
autoPerkOther = "Resilience"
autoPerkOther = "Looting"
autoPerkOther = false
autoPerkPower = false
autoNursery = true

// 2018.07.31 fluffyMatureInterval

var initialAbandons = [525, 540, 554, 555, 564, 568, 585, 602];
var abandons = initialAbandons.slice();
var noActionZones = [570, 571, 572, 573, 574, 577, 578, 579, 580, 581, 582, 583, 584, 586, 587, 588, 589, 592, 593, 594, 595, 596, 597, 598, 601, 603, 604, 607, 608, 609, 612, 613, 614];
for (var iii = 0; iii < 570; iii++) { noActionZones.push(iii); }
var repeatForAnyZones = [500, 540, 554, 600];
var autoNurseryInterval = 25000;
var forcedPortalZone = 600;//547 + 15 + 15;
var actionZones = 41;
var fastFight = true;
var fastFightZones = 597;
var lastZoneEquipment =  200;
var autoEquipNumber = 200;
var initialRestartZone = 540 + 15 + 15 + 15;
var restartOnZone = 540 + 15 + 15 + 15;
var nurseryZones = -15; autoNurseryInterval = 100; // zone 600 //50 + 15 + 15 + 15;
var minHeliumPerHourPercent = 0.5;
var gaSecsZones = -100

essenceStartZone = 50
essenceEndZone = 499
miZones = -100;
// 862 198 121 225

autoBuyBonePortal = true;
covertIce = true;
autoExportSave = true;
autoExportSave = false;
stopHiringAfterRestartZone = false;
var autoGiga = true;

forcedPortalZone = 621;
actionZones = 41;
initialRestartZone = 615;
restartOnZone = 615;
nurseryZones = 20;
gaSecsZones = 16;
var stopGaAssistantAfter600Spire = true;

gogogo = false;
if (gogogo) {
	autoGoldenHelium = false
	autoGoldenVoid = false
	autoGoldenBattle = true
	autoPortal = false
	autoNursery = false
	autoPortal = false
	
	restartOnZone = 900
	autoFormation = false
	buyLowLevelHouses = true
	buyArmStartZone = 0;
	buyEquipmentStartZone = 0;
	autoGiga = false;
} else {
	lastZoneEquipment = 220;
}

var buyStorageOnlyWhenHalf = false;
autoBuyBonePortal = false;
autoAssistant = false;
gaSecs = 1;
//supply 122