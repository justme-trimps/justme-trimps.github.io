setTimeout(function() {

var findZoneNumber = function() { 
	var zoneNumber = 0; 
	if (document.getElementById("worldNumber") && document.getElementById("worldName") && document.getElementById("worldName").offsetParent !== null && document.getElementById("worldName") && document.getElementById("worldName").innerHTML.indexOf("Zone") > -1) { 
		zoneNumber = parseInt(document.getElementById("worldNumber").innerHTML); 
	} 
	return zoneNumber; 
}

var runBionic = function(step) {
	if (document.getElementById("togglerepeatUntil") && document.getElementById("togglerepeatUntil").offsetParent !== null && document.getElementById("togglerepeatUntil").innerHTML.indexOf("Repeat for Items") == -1) {
		document.getElementById("togglerepeatUntil").click();
	}
	if (document.getElementById("toggleexitTo") && document.getElementById("toggleexitTo").offsetParent !== null && document.getElementById("toggleexitTo").innerHTML.indexOf("Exit to Maps") == -1) {
		document.getElementById("toggleexitTo").click();
	}
	if (document.getElementById("repeatBtn") && document.getElementById("repeatBtn").offsetParent !== null && document.getElementById("repeatBtn").innerHTML.indexOf("Repeat On") == -1) {
		document.getElementById("repeatBtn").click();
	}
	console.log("runBionic " + step + " " + nextZoneToFight);
	if (step == 0 && document.getElementById("mapsBtn") && document.getElementById("mapsBtn").offsetParent !== null) {
		document.getElementById("mapsBtn").click();
		step = 1;
		runBionic(step);
		return;
	}
	
	if (step == 1 && document.getElementById("mapsBtn") && document.getElementById("mapsBtn").offsetParent !== null) {
		document.getElementById("mapsBtn").click();
		step = 2;
		runBionic(step);
		return;
	}
	
	if (step == 2) {
		var maps = document.getElementsByClassName("onMapName");
		
		if (maps.length && maps[0].offsetParent !== null) {
			for (var i = 0; i < maps.length; i++) {
				if (maps[i].innerHTML.indexOf("Bionic") > -1) {
					console.log("Found Bionic " + i + " " + maps[i].innerHTML);
					maps[i].click();
					step = 3;
					runBionic(step);
					return;
				}
			}
		}
	}

	if (step == 3) {
		if (document.getElementById("selectMapBtn") && document.getElementById("selectMapBtn").offsetParent !== null) {
			document.getElementById("selectMapBtn").click();
			step = 4;
			runBionic(step);
			return;
		}
	}
	
	if (step == 4 && document.getElementById("mapsBtn") && document.getElementById("mapsBtn").offsetParent !== null && document.getElementById("mapsBtn").innerHTML.indexOf("World") > -1) {
		document.getElementById("mapsBtn").click();
		setTimeout(function() { nextZoneToFight = nextZoneToFight + 15; bionicTimerInternal(); }, 3000);
		return;
	}
	
	setTimeout(function() { runBionic(step); }, 3000);
}

var bionicTimerInternal = function() {
	console.log("bionicTimerInternal " + nextZoneToFight);
	if (findZoneNumber() >= nextZoneToFight || /*(nextZoneToFight == 381 && findZoneNumber() == 374) ||*/ (nextZoneToFight == 366 && findZoneNumber() == 361)) {
		console.log("bionicTimerInternal " + findZoneNumber() + ">=" + nextZoneToFight);
		runBionic(0);
	} else {
		if (findZoneNumber() == 1) {
			nextZoneToFight = bionicStart;
			setTimeout(function() { bionicTimerInternal(); }, 3000);
		} else {
			setTimeout(function() { bionicTimerInternal(); }, 3000);
		}
	}
}


var bionicTimer = function() {
	setTimeout(function() { bionicTimerInternal(); }, 3000);
}

bionicTimer()

setTimeout(function() {
	var intervalTime = 2000;

	var findZoneNumber = function() { 
		var zoneNumber = 0; 
		if (document.getElementById("worldNumber")) { 
			zoneNumber = parseInt(document.getElementById("worldNumber").innerHTML); 
		} 
		return zoneNumber; 
	};

	var findVoidMapsNumber = function() { 
		var number = 0; 
		if (document.getElementById("voidAlert")) { 
			number = parseInt(document.getElementById("voidAlert").innerHTML); 
		} 
		return number; 
	};

	var findPortal = function() { 
		console.log("findPortal")
		if (document.getElementById("portalBtn") && document.getElementById("portalBtn").offsetParent !== null) {
			clearInterval(interval);
			document.getElementById("portalBtn").click();
			setTimeout(function() {
				document.getElementById("activatePortalBtn").click(); 
				setTimeout(function() {
					document.getElementsByClassName("activatePortalBtn")[0].click();
					setTimeout(function() {
						document.getElementById("fightBtn").click(); 
						setTimeout(function() {
						document.getElementById("pauseFight").click(); 
						}, 20000);
						interval = setInterval(function() { action(); }, intervalTime);
					}, 3000);
				}, 1000);
			}, 1000);
		}
	}


	var findDoa = function() { 
		var maps = document.getElementsByClassName("onMapName");
		
		console.log("Found " + maps.length + " maps");
		
		if (!maps.length || maps[0].offsetParent === null) {
			setTimeout(function() { findDoa(); }, 1000);
			return;
		}
		
		for (var i = 0; i < maps.length; i++) {
			if (maps[i].innerHTML == "Dimension of Anger") {
				console.log("Found DOA");
				setTimeout(function() { findPortal(); }, 1000);
				
			}
		}
	}

	var startVoidMap = function() { 
		console.log("startVoidMap")
		var maps = document.getElementsByClassName("voidMap");
		if (!maps.length || maps[0].offsetParent === null) {
			setTimeout(function() { startVoidMap(); }, 1000);
			return;
		}
		
		maps[0].click();
		
		setTimeout(function() { 
			document.getElementById("selectMapBtn").click();
			
			setTimeout(function() { 
				findDoa();
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

	var abandonMaps = function() { 
		if (document.getElementById("mapsBtn")) {
			document.getElementById("mapsBtn").click();
			console.log("maps clicked again");
		}
		
		setTimeout(function() { findVoidMap(); }, 1000);
	}

	var action = function() {
		//console.log("action!");
		if (document.getElementById("metalCollectBtn")) {
			document.getElementById("metalCollectBtn").click();	
		}
		
		if (findVoidMapsNumber() > 0 && findZoneNumber() >= restartOnZone) {
			console.log("zone " + findZoneNumber());
			document.getElementById("mapsBtn").click();
			console.log("maps clicked");
			clearInterval(interval);
			setTimeout(function() { abandonMaps(); }, 1000);
		} else {
			console.log("not on " + restartOnZone + " yet");
		}
	}

	var interval = setInterval(function() { action(); }, intervalTime);
	autohire();
}, 3000);


setInterval(function() { 
	var formationId;
	var GeneticistassistSetting;
	
	if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - 5) {
	console.log("NURSERY " +  findZoneNumber() + " " + (restartOnZone - 5))
		if (document.getElementById("Nursery") && document.getElementById("Nursery").offsetParent != null) {
			//document.getElementById("Nursery").click();
		}
	}
	
	if (findZoneNumber() > 0 && findZoneNumber() < restartOnZone - 30) {
		formationId = "formation4";
		if (document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf("1 Second")== -1) {
			document.getElementById("GeneticistassistSetting").click();
		}
	} else if (findZoneNumber() > 0 && findZoneNumber() >= restartOnZone - 30) {
		formationId = "formation2";
		if (document.getElementById("GeneticistassistSetting") && document.getElementById("GeneticistassistSetting").offsetParent != null && document.getElementById("GeneticistassistSetting").innerHTML.indexOf("10 Seconds")== -1) {
			document.getElementById("GeneticistassistSetting").click();
		}
	}
	
	if (document.getElementById(formationId) && document.getElementById(formationId).offsetParent !== null) {
		document.getElementById(formationId).click();	
	}
}, 3000);

setInterval(function() {  numTab('6'); setMax(0.1); }, 3000);


}, 1000)

// bionic + script2 2017.03.17

var restartOnZone = 385;
var bionicStart = 306;
var nextZoneToFight = bionicStart;
