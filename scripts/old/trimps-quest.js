var previousMessageText = "";
if (findQuestInterval) { clearInterval(findQuestInterval); findQuestInterval = null; }
var findQuestInterval = setInterval(function() { 
	var logElement = document.getElementById('log');
	if (logElement) {
		var questMessages = logElement.getElementsByClassName('questNew');
		if (questMessages.length) {
		  var messageText = questMessages[questMessages.length - 1].innerText;
		  if (messageText != previousMessageText) {
				var questMessage = questMessages[questMessages.length - 1].getElementsByTagName('b')[0].innerText;
				console.log(questMessage);
				previousMessageText = messageText;
		  }
	   }
	}
}, 200);

Complete 5 Maps at Zone level
Don't let your shield break before Cell 100
Don't run a map before Cell 100
Quintuple (x5) your wood
Double your gems
Double your science
Buy a Smithy
One-shot 5 world enemies
Double your food
Don't run a map before Cell 100
Quintuple (x5) your wood
Complete 5 Maps at Zone level
Don't let your shield break before Cell 100
Complete 5 Maps at Zone level
Quintuple (x5) your food
Don't let your shield break before Cell 100
Double your gems
Double your science
Buy a Smithy
One-shot 5 world enemies
Don't let your shield break before Cell 100
Quintuple (x5) your wood
Quintuple (x5) your science
Complete 5 Maps at Zone level
Don't run a map before Cell 100
Complete 5 Maps at Zone level
Double your food
Buy a Smithy
Double your metal
Complete 5 Maps at Zone level
Double your metal
Double your gems
Don't run a map before Cell 100
Double your metal
Don't run a map before Cell 100
Complete 5 Maps at Zone level
One-shot 5 world enemies
Don't let your shield break before Cell 100
Quintuple (x5) your wood
Don't let your shield break before Cell 100
Quintuple (x5) your gems
Quintuple (x5) your metal
One-shot 5 world enemies
Buy a Smithy
One-shot 5 world enemies