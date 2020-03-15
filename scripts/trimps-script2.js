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
		
		if (findVoidMapsNumber() > 0 && findZoneNumber() >= 362) {
			console.log("zone " + findZoneNumber());
			document.getElementById("mapsBtn").click();
			console.log("maps clicked");
			clearInterval(interval);
			setTimeout(function() { abandonMaps(); }, 1000);
		}
	}

	var interval = setInterval(function() { action(); }, intervalTime);
	autohire();
}, 3000);


setInterval(function() { if (document.getElementById("formation2")) {
	document.getElementById("formation2").click();	
}; }, 3000);

setInterval(function() {  numTab('6'); setMax(0.1); }, 3000);

