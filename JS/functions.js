// File system module
var fs = require('fs');

// Function that checks a file path and returns true if it exists or false if it doesnt
function fileExists(filePath){
	// Use try/catch to validate whether the file path is valid
    try{
        return fs.statSync(filePath).isFile();
    }
    catch(err){
        return false;
    }
}

// Function that parses a JSON file and returns it content
function parseJSON(file){
	return JSON.parse(JSON.stringify(file));
}

// Function that takes an array and a fieldname as input parameters and returns the array sorted by fieldname
function sortArray(array, fieldname){
	// Sort array in ascending order by state
	if(fieldname == "state"){
		array.sort(function(a, b){
		  if(a.state < b.state) { return -1; }
		  else if(a.state > b.state){ return 1; }
		  else { return 0; }
		});
	}
	// Sort array in ascending order by statecode
	else if(fieldname == "statecode"){
		array.sort(function(a, b){
		  if(a.statecode < b.statecode) { return -1; }
		  else if(a.statecode > b.statecode){ return 1; }
		  else { return 0; }
		});
	}
	// Sort array in ascending order by capital 
	else if(fieldname == "capital"){
		array.sort(function(a, b){
		  if(a.capital < b.capital) { return -1; }
		  else if(a.capital > b.capital){ return 1; }
		  else { return 0; }
		});
	}		  
	return array;
}


// Function that takes an array as parameter and counts the number of states that start with each letter 
function countFirstLetter(array){
	// Empty array
	var letters = [];
	// Loop through each state 
	for(i=0;i< array.length;i++){
		// Get the first letter of the state 
		var initial = array[i].state.substring(0,1);
		// If letter is not in letters array then append it and set occurrence to 1
		// Set the states key to the state 
		if(!letters.some(item => item.letter === initial )){
			letters.push({ "letter" : initial, "occurrence" : 1, "states" : array[i].state });
		}
		// Else letter is already in letters array so find the letter and increment its occurrence
		// Append the state to the states key
		else{
			var item = letters.find(x => x.letter == initial);
			 if (item) {
			   item.occurrence ++;
			   item.states += ', '+ array[i].state;
			}
		}
	}
	// Sort the letters in descending order by occurrence
	letters.sort(function(a, b){
	  if(a.occurrence < b.occurrence) {  return 1; }
	  else if(a.occurrence > b.occurrence){ return -1; }
	  else { return 0; }
	}); 
	return letters;
}

// Export the functions
exports.parseJSON = parseJSON;
exports.sortArray = sortArray;
exports.countFirstLetter = countFirstLetter;
exports.fileExists = fileExists;
