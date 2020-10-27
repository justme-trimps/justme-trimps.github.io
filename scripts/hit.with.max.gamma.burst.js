var maxEq = "110";
var bestEq = "30";

if (hitWithMaxGammaBurstInterval) { clearInterval(hitWithMaxGammaBurstInterval); hitWithMaxGammaBurstInterval = null; }
var hitWithMaxGammaBurstInterval = setInterval(function() { 
	if (game.global.fighting && game.global.world > 137) {
		if (game.heirlooms.Shield.gammaBurst.stacks >= 4) {
			if (document.getElementsByClassName('glyphicon-forward').length) {
				game.portal.Equality.disabledStackCount = bestEq;
			}
			else {
				game.portal.Equality.disabledStackCount = "0";
			}
		} else {
			game.portal.Equality.disabledStackCount = maxEq;
		}
	}
}, 100);



