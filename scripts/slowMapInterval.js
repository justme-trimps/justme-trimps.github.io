var saveText = save(true);
var fastImps = ['Squimp', 'Snimp', 'Gorillimp', 'Shrimp', 'Chickimp', 'Kittimp', 'Frimp', 'Slagimp', 'Lavimp', 'Kangarimp', 'Entimp', 'Fusimp', 'Carbimp', 'Shadimp', 'Voidsnimp', 'Prismimp', 'Sweltimp']
var extraLevel = 7;
var mapBiome = "Mountain"
//var mapBiome = "Random"
var mapLoot = 9;
//var mapLoot = 0;
var mapDiff = 9;
//var mapDiff = 0;

var buyAndRunMap = function() {
	document.getElementById("advSpecialSelect").value = "p";
	document.getElementById("advExtraLevelSelect").value = "" + extraLevel;
	document.getElementById("biomeAdvMapsSelect").value = mapBiome;
	document.getElementById("lootAdvMapsRange").value = mapLoot;
	document.getElementById("difficultyAdvMapsRange").value = mapDiff;
	buyMap();
	runMap();
	fightManual();
}

buyAndRunMap();

if (slowMapInterval) { clearInterval(slowMapInterval); slowMapInterval = null; }
var slowMapInterval = setInterval(function() {
	var array = game.global.mapGridArray;
	
	if (array.length < 20) {
//		console.log('<20');
		return;
	}
	
	var isFast = false;
	for (var i = array.length - 1; i >= 0 && !isFast; i--) {
		if (fastImps.indexOf(array[i].name) > -1) {
			load(saveText);
			setTimeout(function() {
				buyAndRunMap();
			}, 1);
			isFast = true;
//			console.log('true');
		} 
	}
	
	if (!isFast) {
		console.log('false');

		for (var i = array.length - 1; i >- 0; i--) {
			console.log(array[i].name);
		}

		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();

		clearInterval(slowMapInterval); slowMapInterval = null;
	}
}, 600);

var autoExportSave = true;
var autoExportSaveFrequencyInMinutes = 1;

if (autoSaveInterval) { clearInterval(autoSaveInterval); autoSaveInterval = null; }
var autoSaveInterval = setInterval(function() {
	if (autoExportSave) {
		cancelTooltip();
		tooltip('Export', null, 'update');
		document.getElementById('downloadLink').click();
		cancelTooltip();
	}
}, 1000 * 60 * autoExportSaveFrequencyInMinutes);
