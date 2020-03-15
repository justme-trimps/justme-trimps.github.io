setTimeout(function() {

var firstResourceRow = document.getElementById("food").parentNode.parentNode;
var secondResourceRow = document.getElementById("metal").parentNode.parentNode;

firstResourceRow.appendChild(document.getElementById("metal").parentNode);
firstResourceRow.appendChild(document.getElementById("science").parentNode);

secondResourceRow.parentNode.removeChild(secondResourceRow);

}, 2000);

setTimeout(function() {

var intervalTime = 200;

var checkAndBuy = function(buttonId, ownedId, max) { 
	var button = document.getElementById(buttonId);
	var click = false;
	if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
		if (ownedId && max) {
			var owned = document.getElementById(ownedId);
			if (owned) {
				var value = parseInt(owned.innerHTML.match(/[0-9]+/)[0]);
				if (max > value) {
					click = true;
				}
			}
		} else {
			click = true;
		}
	}
	
	if (click) {
		button.click();
		document.getElementById("buildingsTitleDiv").click();
	}
}

var buyEquipment = function(arbalestNumber) {
	setInterval(function() { checkAndBuy("Dagger", "DaggerOwned", arbalestNumber + 2); }, intervalTime);
	setInterval(function() { checkAndBuy("Mace", "MaceOwned", arbalestNumber); }, intervalTime);
	setInterval(function() { checkAndBuy("Polearm", "PolearmOwned", arbalestNumber - 1); }, intervalTime);
	setInterval(function() { checkAndBuy("Battleaxe", "BattleaxeOwned", arbalestNumber - 1); }, intervalTime);
	setInterval(function() { checkAndBuy("Greatsword", "GreatswordOwned", arbalestNumber - 2); }, intervalTime);
	setInterval(function() { checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber); }, intervalTime);
}

var buyArm = function(gambesonNumber) {
	setInterval(function() { checkAndBuy("Boots", "BootsOwned", gambesonNumber - 1); }, intervalTime);
	setInterval(function() { checkAndBuy("Helmet", "HelmetOwned", gambesonNumber - 1); }, intervalTime);
	setInterval(function() { checkAndBuy("Pants", "PantsOwned", gambesonNumber - 2); }, intervalTime);
	setInterval(function() { checkAndBuy("Shoulderguards", "ShoulderguardsOwned", gambesonNumber - 2); }, intervalTime);
	setInterval(function() { checkAndBuy("Breastplate", "BreastplateOwned", gambesonNumber - 2); }, intervalTime);
	setInterval(function() { checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber); }, intervalTime);
}

setInterval(function() { checkAndBuy("Tribute"); }, intervalTime);
setInterval(function() { checkAndBuy("Magmamancer"); }, intervalTime);
setInterval(function() { checkAndBuy("Hut", "HutOwned", 160); }, intervalTime);
setInterval(function() { checkAndBuy("House", "HouseOwned", 170); }, intervalTime);
setInterval(function() { checkAndBuy("Mansion", "MansionOwned", 200); }, intervalTime);
setInterval(function() { checkAndBuy("Hotel", "HotelOwned", 220); }, intervalTime);
setInterval(function() { checkAndBuy("Resort", "ResortOwned", 250); }, intervalTime);
setInterval(function() { checkAndBuy("Collector", "CollectorOwned", 800); }, intervalTime);
setInterval(function() { checkAndBuy("Gateway", "GatewayOwned", 120); }, intervalTime);
setInterval(function() { checkAndBuy("Warpstation", "WarpstationOwned", 300); }, intervalTime);
setInterval(function() { checkAndBuy("Gym", "GymOwned", 1450); }, intervalTime);

}, 10000);

setTimeout(function() {

	var intervalTime = 3000;

	var checkStorage = function(buttonId, timerId, resourceId) { 
		var button = document.getElementById(buttonId);
		var click = false;
		if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
			if (timerId) {
				var timer = document.getElementById(timerId);
				if (timer) {
					if (timer.innerHTML.match(/^[0-9]+ Secs$/) || timer.innerHTML.match(/^[0-9]+ Mins [0-9]+ Secs$/) || timer.innerHTML.match(/^[0-9] Days [0-9]+ Hours$/) || timer.innerHTML.match(/^[0-9]+ Days [0-9]+ Hours$/) || timer.innerHTML.match(/^[0-9]+ Hours [0-9]+ Mins$/)) {
						click = true;
					}
				}
			}

                        if (!click && document.getElementById(resourceId)) {
  if (document.getElementById(resourceId).getElementsByClassName("percentColorRed").length > 0 || document.getElementById(resourceId).getElementsByClassName("percentColorOrange").length > 0) {
click = true;
}
}
		}
		
		if (click) {
			button.click();
		}
	}
	
	setInterval(function() { checkStorage("Barn", "foodTimeToFill", "food"); }, intervalTime);
	setInterval(function() { checkStorage("Shed", "woodTimeToFill", "wood"); }, intervalTime);
	setInterval(function() { checkStorage("Forge", "metalTimeToFill", "metal"); }, intervalTime);

	setInterval(function() { 
		if (document.getElementById("VoidGolden") && document.getElementById("VoidGolden").offsetParent !== null) { 
if (document.getElementById("VoidGolden").getAttribute("class").indexOf("thingColorCanNotAfford") == -1) {
			document.getElementById("VoidGolden").click(); 
}
			setTimeout(function() { 
				if (document.getElementById("HeliumGolden") && document.getElementById("HeliumGolden").offsetParent !== null && document.getElementById("HeliumGolden").getAttribute("class").indexOf("thingColorCanNotAfford") == -1) { 
					document.getElementById("HeliumGolden").click(); 
				}
			}, 100);
		}
	}, 1000);
}, 10000);

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

	setInterval(function() { 
		hire("Miner");
	}, 1300 * 1);
		
	setInterval(function() { 
		hire("Farmer");
	}, 15000 * 2);
	
	setInterval(function() { 
		hire("Lumberjack");
	}, 25000 * 2);
	setInterval(function() { 
		hire("Trainer");
		hire("Scientist");
	}, 60000 * 2);
}


setInterval(function() { if (document.getElementById("Gigastation")) {
	document.getElementById("Gigastation").click();	
}; }, 1000 * 55);

setInterval(function() { 
    if (document.getElementsByClassName("shriekStateDisabled")[0] && document.getElementsByClassName("shriekStateDisabled")[0].offsetParent !== null) {
        document.getElementsByClassName("shriekStateDisabled")[0].click();
    }

}, 1000 * 5);

setTimeout(function() {
	var checkAndBuy = function(buttonId, ownedId, max) { 
		var button = document.getElementById(buttonId);
		var click = false;
		if (button && button.getAttribute("class").indexOf("thingColorCanAfford") > -1) {
			if (ownedId && max) {
				var owned = document.getElementById(ownedId);
				if (owned) {
					var value = parseInt(owned.innerHTML.match(/[0-9]+/)[0]);
					if (max > value) {
						click = true;
					}
				}
			} else {
				click = true;
			}
		}
		
		if (click) {
			button.click();
			document.getElementById("buildingsTitleDiv").click();
		}
	}

	var findZoneNumber = function() { 
		var zoneNumber = 0; 
		if (document.getElementById("worldNumber")) { 
			zoneNumber = parseInt(document.getElementById("worldNumber").innerHTML); 
		} 
		return zoneNumber; 
	};

	var buyEquipment = function(arbalestNumber) {
		checkAndBuy("Arbalest", "ArbalestOwned", arbalestNumber);
		checkAndBuy("Greatsword", "GreatswordOwned", arbalestNumber - 2);
		checkAndBuy("Battleaxe", "BattleaxeOwned", arbalestNumber - 1);
		checkAndBuy("Polearm", "PolearmOwned", arbalestNumber - 1);
		checkAndBuy("Mace", "MaceOwned", arbalestNumber);
		checkAndBuy("Dagger", "DaggerOwned", arbalestNumber + 2);
	}

	var buyArm = function(gambesonNumber) {
		checkAndBuy("Boots", "BootsOwned", gambesonNumber - 1);
		checkAndBuy("Helmet", "HelmetOwned", gambesonNumber - 1);
		checkAndBuy("Pants", "PantsOwned", gambesonNumber - 2);
		checkAndBuy("Shoulderguards", "ShoulderguardsOwned", gambesonNumber - 2);
		checkAndBuy("Breastplate", "BreastplateOwned", gambesonNumber - 2);
		checkAndBuy("Gambeson", "GambesonOwned", gambesonNumber);
	}

	setInterval(function() { 
		if (findZoneNumber() == 200) {
			buyArm(20);
			buyEquipment(20);
		}
	}, 3000);

}, 1000);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


#Explorer, #queueContainer, #Supershield, #Shield { display: none }
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

#fragments, #gems { display: none }
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

.thing { font-size: 0.75vw }
.cellColorCurrent {
	background: #ddd;
}

.cellColorOverkill {
	background: #bbb;
}
.cellColorBeaten { background: #999;}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#Nursery { display: none }
#Geneticistassist, #Geneticist  { /* display: none  */ }
.perkColorMaxed, #Bait, #Trumps, #Packrat { display: none !important }
