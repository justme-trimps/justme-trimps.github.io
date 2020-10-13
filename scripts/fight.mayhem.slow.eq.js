var fastEq = "25";
var slowEq = "95";

if (mayhemSlowEqInterval) { clearInterval(mayhemSlowEqInterval); mayhemSlowEqInterval = null; }
var mayhemSlowEqInterval = setInterval(function() { 
	if (document.getElementsByClassName('glyphicon-forward').length) {
		game.portal.Equality.disabledStackCount = slowEq;
	} else {
		game.portal.Equality.disabledStackCount = fastEq;
	}
}, 3000);



