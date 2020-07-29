var tryOptimizeVoids = true;
var voidsOptimizerCookieName = 'trimps-melt-voids-save';
var debugOptimizer = false;

function setCookie(cname, cvalue, exdays) {
	window.localStorage.setItem(cname, cvalue);
}

function setSaveCookie() {
	setCookie(voidsOptimizerCookieName, game.global.totalRadPortals + '###' + game.buildings.Tribute.owned + '###'+ game.global.totalVoidMaps + '###' + save(true), 10);
}

function getCookie(cname) {
  return window.localStorage.getItem(cname);
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
		if (debug) {
			console.log('shouldLoadVoidsOptimizedSave save has more void maps ' + voidMaps + " " + game.global.totalVoidMaps);
		}
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
	
	if ((game.global.challengeActive + "") !== challengeToTry
		|| game.global.world < 82
		|| game.global.world > 94
		)
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
				setSaveCookie();
		}
		
	} else {
		if (debugOptimizer)
			console.log('empty cookie');

		setSaveCookie();
	}
}, 500 - Math.floor(Math.random() * 100));
