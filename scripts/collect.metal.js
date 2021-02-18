window.localStorage.clear();

var autoExportSave = true;
if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip("Export", null, "update");
		document.getElementById("downloadLink").click();
		cancelTooltip();
	}
}, 1000 * 60 * 2);


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
			improHealth:	parseFloat(cookieValue.split("###")[8]),
			mayhemStacks:	parseInt(cookieValue.split("###")[9]),
			mapCell:		parseInt(cookieValue.split("###")[10]),
			mapName:		cookieValue.split("###")[11],
			mapEnemyHealth:	parseFloat(cookieValue.split("###")[12])
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
		"###" + game.global.gridArray[99].health + 
		"###" + game.challenges.Mayhem.stacks + 
		"###" + game.global.lastClearedMapCell + 
		"###" + mapName +
		"###" + mapEnemyHealth;
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


var collectMetalInterval;
var minDifference = 25e+48;
var debugCollectMetalInterval = false;

var shouldLoadcollectMetalSave = function(save) {
	
	if (save.metalOwned > game.resources.metal.owned + minDifference) {
		if (debugCollectMetalInterval)
			console.log("save has " + save.metalOwned + ", mine is " + game.resources.metal.owned + ". loading");
		return true;
	}
	
	return false;
};

var shouldSavecollectMetalSave = function(save) {
	return save == null || (save.metalOwned < game.resources.metal.owned);
};

collectMetalInterval = setSomeInterval(collectMetalInterval, shouldSavecollectMetalSave, shouldLoadcollectMetalSave, 1000);

//----------------------------------
