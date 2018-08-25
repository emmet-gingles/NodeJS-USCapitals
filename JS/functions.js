// export functions 
exports.sortArray = sortArray;
exports.searchStatesByString = searchStatesByString;
exports.countFirstLetter = countFirstLetter;

// function that takes an array and a fieldname as input parameters and outputs the array sorted by fieldname
function sortArray(array, fieldname){
	// sort array in ascending order by state
	if(fieldname == "state"){
		array.sort(function(a, b){
		  if(a.state < b.state) { return -1; }
		  else if(a.state > b.state){ return 1; }
		  else { return 0; }
		});
	}
	// sort array in ascending order by statecode
	else if(fieldname == "statecode"){
		array.sort(function(a, b){
		  if(a.statecode < b.statecode) { return -1; }
		  else if(a.statecode > b.statecode){ return 1; }
		  else { return 0; }
		});
	}
	// sort array in ascending order by capital 
	else if(fieldname == "capital"){
		array.sort(function(a, b){
		  if(a.capital < b.capital) { return -1; }
		  else if(a.capital > b.capital){ return 1; }
		  else { return 0; }
		});
	}		  
	return array;
}

// function that takes an array as input parameter and outputs the occurrences of each name 
function searchStatesByString(array, searchString){	
	// array to store the states that match searchString
	var matches = [];
	// loop through each state and if it starts with the searchString then add it to the array 
	for(i=0;i<array.length;i++){
		if(array[i].state.toLowerCase().startsWith(searchString.toLowerCase())){
			matches.push(array[i]);
		}
	}
	return matches;
}

// function that takes an array as parameter and counts the number of states that start with each letter 
function countFirstLetter(array){
	var letters = [];
	// loop through each state 
	for(i=0;i<array.length;i++){
		// the first letter of the state 
		var initial = array[i].state.substring(0,1);
		// if letter is not in letters array then append it and set occurrence to 1
		if(!letters.some(item => item.letter === initial )){
			letters.push({ "letter" : initial, "occurrence" : 1 });
		}
		// else letter is already in letters array so find the letter and increment its occurrence
		else{
			var item = letters.find(x => x.letter == initial);
			 if (item) {
			   item.occurrence ++;
			}
		}
	}
	// sort the letters in descending order by occurrence
	letters.sort(function(a, b){
	  if(a.occurrence < b.occurrence) {  return 1; }
	  else if(a.occurrence > b.occurrence){ return -1; }
	  else { return 0; }
	}); 
	return letters;
}

