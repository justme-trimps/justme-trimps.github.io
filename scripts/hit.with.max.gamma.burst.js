var maxEq = "" + game.portal.Equality.radLevel;
var bestEq = "78";

if (hitWithMaxGammaBurstInterval) { clearInterval(hitWithMaxGammaBurstInterval); hitWithMaxGammaBurstInterval = null; }
var hitWithMaxGammaBurstInterval = setInterval(function() { 
	if (game.global.fighting && game.global.world > 100) {
		if (game.heirlooms.Shield.gammaBurst.stacks >= 4) {
			if (document.getElementsByClassName('glyphicon-forward').length) {
				game.portal.Equality.disabledStackCount = bestEq;
			}
			else {
				game.portal.Equality.disabledStackCount = bestEq;
			}
		} else {
			game.portal.Equality.disabledStackCount = maxEq;
		}
	}
}, 100);



var maxEq = "" + game.portal.Equality.radLevel;
var bestEq = "40";
var slowEq = "0";
var hitWithMaxDisabled = false;

if (hitWithMaxGammaBurstInterval) { clearInterval(hitWithMaxGammaBurstInterval); hitWithMaxGammaBurstInterval = null; }
var hitWithMaxGammaBurstInterval = setInterval(function() { 
	if (game.global.fighting && !hitWithMaxDisabled) {
		if (game.heirlooms.Shield.gammaBurst.stacks >= 4) {
			if (document.getElementsByClassName('glyphicon-forward').length) {
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



