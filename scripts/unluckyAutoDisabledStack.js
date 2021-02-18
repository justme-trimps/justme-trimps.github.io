if (goodGuyAttackInterval) { clearInterval(goodGuyAttackInterval); goodGuyAttackInterval = null; }
var goodGuyAttackInterval = setInterval(function() {
	if (document.getElementById("goodGuyAttack")) {
		var attack = parseInt(document.getElementById("goodGuyAttack").innerText[0]);
		if (attack % 2 == 1) {
			var stack = parseInt(game.portal.Equality.disabledStackCount);
			if (stack > 100) {
				stack = 40;
			}
			else {
				stack++;
			}
			game.portal.Equality.disabledStackCount = "" + stack;
		}
	}
	
}, 1000 * 1.5);

