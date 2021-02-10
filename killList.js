//#####################################\\
//### Dyne's JS MUSHClient Plugin	###\\
//###				for				###\\
//###		Tracking Your Kills		###\\
//###				for				###\\
//###  Absolutely no good reason	###\\
//#####################################\\

// Check if trigger is enabled
if (GetTriggerOption("killTrigger", "enabled") == 1) {
	// Trigger "killTrigger" is enabled
	world.Note("Dyne's completely necessary killtrigger is already enabled!");
} else {
	// Trigger is not enabled, enables trigger "killTrigger"
	world.Note("Creating Dyne's completely necessary killtrigger!")
	var killTrig = world.AddTrigger("killTrigger", "You kill *", "", 1, 14, 0, "", "addKill");
}


// Check if alias is created
if (world.GetAliasOption("killAlias", "enabled") == 1) {
	// Alias "killAlias" is enabled
	world.Note("Dyne's completely necessary killalias is already enabled!");
} else {
	world.Note("Creating Dyne's completely necessary killalias!")
	world.AddAlias("killAlias", "killtrack", "", 1, "showKills");
	world.AddAlias("killToggle", "killtracktoggle", "", 1, "trackToggle");
	world.AddAlias("killLookup", "killtracklookup *", "", 1, "trackLookup");
	world.AddAlias("killHelp", "killtrackhelp", "", 1, "trackHelp");
	world.AddAlias("killShow", "killtrackshow", "", 1, "trackShow");
	world.AddAlias("killreset", "killtrackreset", "", 1, "trackReset");
}


// Check if variable "killShow" exists
if (world.getVariable("killShow" == null)) {
	world.SetVariable("killShow", true);
}


// Check if variable "killList" exists
if (world.getVariable("killList" == null)) {
	// Variable doesn't exist, create variable "killList"
	world.Note("Initializing Dyne's totally necessary kill list variable...");
	world.SetVariable("killList", "Entity;Killed");
	var killList = "Entity;Killed";
} else {
	// Variable exists
	var killList = parseTextToObject(world.getVariable("killList"));
	world.Note("Dyne's totally necessary kill list already in place!");
}
//for (x in killList) { // <-- Debugging
//	world.Note(x + ": " + killList[x]);
//}


// ### Functions that run when triggering triggers ###
function addKill() {
	// This function is used when "killTrigger" is triggered
	var totalLines = world.GetLinesInBufferCount(); // <-- Get how many lines
	var matchText = GetLineInfo(totalLines, 1); // <-- Store the last line
	// world.Note(matchText); // <-- Debugging
	matchText = matchText.replace("You kill ", ""); // <-- Replace text
	matchText = matchText.replace(".", ""); // <-- Replace more text
	if (matchText.substr(0,4) == "the ") {
		matchText = matchText.replace("the ", "");
	}
	// world.Note(matchText); //<-- Entry to add (debugging)
	if (!(killList[matchText])) {
		// world.Note("Attempting to set object...") // <-- Debugging
		killList[matchText] = 1;
		//world.Note(killList[matchText] + " is new value!");
		if (!(killList[matchText])) {
			world.Note("Could not set object!")
		}
	} else {
		// world.Note("Object found, adding one to total...") // <-- Debugging
		killList[matchText] += 1;
	} 
	//for (var entry in killList) { // <-- Debugging
	//	world.Note(entry + ": " + killList[entry]);
	//}
	if (world.GetVariable("killShow") != 0) {
		world.Note(matchText + ": " + killList[matchText] + " kills!");
	}
	world.SetVariable("killList", objectToString(killList));
	// world.Note("And that's all, folks!");
	return
}


// ### Functions that run from aliases ###
function showKills() {
	// Shows a list of the kills you have accumulated so far!
	world.Note("Your kill list (Entity: Number of kills):")
	var totalKillCount = 0;
	for (entry in killList) {
		world.Note(entry + ":\t" + killList[entry] + " times!");
		totalKillCount += killList[entry];
	}
	world.Note("You have left " + totalKillCount + " deaths in your wake (so far)!")
	return
}


function trackToggle() {
	// Toggles "killTrigger" on/off
	if (GetTriggerOption("killTrigger", "enabled")) {
		world.Note("Killtracking off!");
		EnableTrigger("killTrigger", false);
	} else {
		world.Note("Killtracking on!");
		EnableTrigger("killTrigger", true);
	}
	return
}


function trackLookup(name, line, wildcards) {
	// Function to lookup kills in the list, takes one argument
	// world.Note("Alias " + name + " was triggered!"); // <-- Debugging
	var lookup = line.replace("killtracklookup ", "");
	var lookupText = "The following creatures match your query:";
	var lookupCount = 0;
	for (var entry in killList) {
		if (entry.toLowerCase().match(lookup.toLowerCase())) {
			lookupText += "\n" + entry + ": killed " + killList[entry] + " times!";
			lookupCount += killList[entry];
		}
	}
	lookupText += "\nTotal kills: " + lookupCount;
	//if (killList[lookup]) {
	//	world.Note(lookup + ": " + killList[lookup] + " kills!");
	//} else {
	//	world.Note(lookup + " has not been killed by you... Yet!");
	//}
	world.Note(lookupText);
	return
}


function trackHelp() {
	// Function to list commands and their uses
	var helpText = "Commands for Dyne's Killtracker:\n";
	helpText += "killtrack:\t\t\tLists all kills! Ex: killtrack\n";
	helpText += "killtracktoggle:\t\tToggle trigger on/off. Ex: killtracktoggle\n";
	helpText += "killtracklookup <creature>:\tLookup specific kills. Ex: killtracklookup Cohen\n";
	helpText += "killtrackshow:\t\t\tToggle kill messages off/on. Ex: killtrackshow\n";
	helpText += "killtrackreset:\t\t\tReset triggers, aliases and variables. Ex: killtrackreset";
	world.Note(helpText);
	return
}


function trackShow() {
	// Function to toggle messages after each kill on/off
	if (world.GetVariable("killShow") == -1) {
		world.Note("Fine! Guess I won't show kill messages then!")
		world.SetVariable("killShow", false);
	} else {
		world.Note("Yeah, let's count the kills together!")
		world.SetVariable("killShow", true);
	}
	return
}

function trackReset() {
	// Function for resetting everything! (Not for the faint of heart)
	// Begin by deleting triggers and aliases
	world.Note("Cleaning up...");
	world.DeleteTrigger("killTrigger");
	world.DeleteAlias("killAlias");
	world.DeleteAlias("killToggle");
	world.DeleteAlias("killLookup");
	world.DeleteAlias("killHelp");
	world.DeleteAlias("killShow");
	world.DeleteAlias("killreset");
	
	// Move on to re-adding triggers and aliases
	world.Note("Resetting triggers, aliases and variables...");
	world.AddTrigger("killTrigger", "You kill *", "", 1, 14, 0, "", "addKill");
	world.AddAlias("killAlias", "killtrack", "", 1, "showKills");
	world.AddAlias("killToggle", "killtracktoggle", "", 1, "trackToggle");
	world.AddAlias("killLookup", "killtracklookup *", "", 1, "trackLookup");
	world.AddAlias("killHelp", "killtrackhelp", "", 1, "trackHelp");
	world.AddAlias("killShow", "killtrackshow", "", 1, "trackShow");
	world.AddAlias("killreset", "killtrackreset", "", 1, "trackReset");
	
	// Finally, reset variables
	world.SetVariable("killShow", true);
	world.SetVariable("killList", "Entity;Killed");
	killList = {};
	world.Note("Done!");
}


// ### General functions ###
function parseTextToObject(text) {
	// Parses a text to object, delimiters in order: "\n" and ";"
	var splitArray = text.split("\n");
	var object = {};
	for (var i=0;i<splitArray.length;i++) {
		//world.Note(splitArray[i].split(";")[0] + ": " + parseInt(splitArray[i].split(";")[1])); // <-- Debugging
		if (splitArray[i].split(";")[0] == "Entity") {
			continue
		}
		object[splitArray[i].split(";")[0]] = parseInt(splitArray[i].split(";")[1]);	
	}
	//for (x in object)  // <-- Debugging
	//	world.Note(x + ": " + object[x]);
	//}
	//world.Note("Object created!")
	return object
}


function objectToString(object) {
	// Converts the object to our multiline-string that can be stored
	var string = "Entity;Killed"
	// Go through each key/value pair in object and put in string variable...
	for (key in object) {
		if (key == "Entity") { // <-- If key is Entity, we want to skip that...
			continue
		} else {
			string += "\n" + key + ";" + object[key]; // <-- Add new line, then "key;value"
		}
	}
	// world.Note(string); // <-- Debugging
	return string
}