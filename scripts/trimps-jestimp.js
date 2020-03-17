var minJestimpZone = 55;
var jestimpTarget = 'metal';
var jestimpMode = false;
var saveString = null;

if (jestimpInterval) { clearInterval(jestimpInterval); jestimpInterval = null; }
var jestimpInterval = setInterval(function() { 
	var tmpTarget = jestimpTarget;
	if (tmpTarget != 'science' && tmpTarget != 'gems')
		tmpTarget = game.global.playerGathering;

	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Prismatic Palace")
		return;
	
	if (document.getElementById('worldName') && document.getElementById('worldName').innerText == "Melting Point")
		return;
		
	if (game.global.world >= minJestimpZone || minJestimpZone == -1) {
		var badGuyNameString = (document.getElementById('badGuyName') && document.getElementById('badGuyName').innerText) || null;
		if (badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") > -1) {
			saveString = save(true);
			jestimpMode = true;
		}
		if (jestimpMode && badGuyNameString && badGuyNameString.toLowerCase().indexOf("jestimp") == -1) {
			var logMessages = [ ...(document.getElementById('log').getElementsByClassName('message'))]
				.filter(function (el) { return el.innerText.toLowerCase().indexOf('jestimp') > -1; })
			if (logMessages.length) {
				if (logMessages[logMessages.length - 1].innerText.toLowerCase().indexOf(tmpTarget) > -1) {
					jestimpMode = false;
					saveString = null;
				} else {
					if (saveString) {
						load(saveString);
					}
				}
			}
		}
	}
}, 100);
