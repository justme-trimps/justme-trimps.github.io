var debugUnluckyHeirloomSwapInterval = false;

var useHeirloom = function(heirloom) {
	console.log('should use ' + heirloom.icon);

	for (var i = 0; i < game.global.heirloomsCarried.length; i++) {
		if (game.global.heirloomsCarried[i].icon == heirloom.icon) {
			selectHeirloom(i, "heirloomsCarried", true);
			equipHeirloom();
			break;
		}
	}

}

if (unluckyHeirloomSwapInterval) { clearInterval(unluckyHeirloomSwapInterval); unluckyHeirloomSwapInterval = null; }
var unluckyHeirloomSwapInterval = setInterval(function() {
	
	if (document.getElementById('goodGuyAttack')) {
		var attack = parseInt(document.getElementById('goodGuyAttack').innerText.replace('.', ''));
		var usingStrongHeirloom = game.global.heirloomsCarried.filter(function (el) { return el.icon == "*road2"; });
		var usingWeakHeirloom = game.global.heirloomsCarried.filter(function (el) { return el.icon == "*fast-forward"; });
		
		if (usingStrongHeirloom.length) {
			if (debugUnluckyHeirloomSwapInterval) {
				console.log(attack + ' ' + usingStrongHeirloom.length + ' ' + usingWeakHeirloom.length);
			}
			
			var tmpAttack = attack;
			while (tmpAttack > 10) {
				tmpAttack = tmpAttack / 10;
			}
			if (Math.floor(tmpAttack) % 2 == 0) {
				if (debugUnluckyHeirloomSwapInterval)
					console.log("a " + tmpAttack + ' ' + (Math.floor(tmpAttack) % 2) + ' ' + (Math.floor(tmpAttack) % 2 == 0));
				return;
			}
			
			tmpAttack = 0.73657289002557544757033248081841 * attack;
			while (tmpAttack > 10) {
				tmpAttack = tmpAttack / 10;
			}
			
			if (Math.floor(tmpAttack) % 2 == 1) {
				if (debugUnluckyHeirloomSwapInterval)
					console.log("b " + tmpAttack + ' ' + (Math.floor(tmpAttack) % 2) + ' ' + (Math.floor(tmpAttack) % 2 == 1));
				return;
			}
			
			if (debugUnluckyHeirloomSwapInterval)
				console.log("c " + tmpAttack + ' ' + (Math.floor(tmpAttack) % 2) + ' ' + (Math.floor(tmpAttack) % 2 == 1));
			
			useHeirloom(usingStrongHeirloom[0]);
		} else {
			var tmpAttack = attack / 0.73657289002557544757033248081841;
			while (tmpAttack > 10) {
				tmpAttack = tmpAttack / 10;
			}
			if (Math.floor(tmpAttack) % 2 == 0) {
				if (debugUnluckyHeirloomSwapInterval)
					console.log("d " + tmpAttack + ' ' + (Math.floor(tmpAttack) % 2) + ' ' + (Math.floor(tmpAttack) % 2 == 0));
				
				useHeirloom(usingWeakHeirloom[0]);
				return;
			}
			
			var tmpAttack = attack;
			while (tmpAttack > 10) {
				tmpAttack = tmpAttack / 10;
			}
			
			//console.log('ta2 ' + tmpAttack);
			//console.log(Math.floor(tmpAttack) % 2 == 1);
			
			if (Math.floor(tmpAttack) % 2 == 1) {
				if (debugUnluckyHeirloomSwapInterval)
					console.log("e " + tmpAttack + ' ' + (Math.floor(tmpAttack) % 2) + ' ' + (Math.floor(tmpAttack) % 2 == 1));
				
				useHeirloom(usingWeakHeirloom[0]);
				return;
			}
			
			//console.log('333');
		}
		

	}
}, 1000);