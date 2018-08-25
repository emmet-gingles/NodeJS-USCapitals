// functions.js used for calling functions on data 
var functions = require('./functions.js');
// line-read module used for reading each line of file 
var lineReader = require('line-reader');
// readline module for reading user input 
var readline = require('readline');
// bluebird module used for creating a promise when reading file 
var Promise = require('bluebird');
// function called using promise and lineReader
var eachLine = Promise.promisify(lineReader.eachLine);
// file to be read 
var file = '../Files/states.txt';
// variable to keep track of the line we are on 
var lineNo = 0;
// array to store the data read from file 
var list = [];

eachLine(file, function(line) {
	// increment for each new line 
	lineNo++;
	// this stops it from reading the header
	if(lineNo > 1){
		// split the line by comma and create variable from each part of the split
		var output = line.split(',');
		if(output.length >= 3){
			// add data to array
			list.push({"state" : output[0], "statecode" : output[1], "capital" : output[2] });	
		}
	} 
	// called only once the file has finished reading 
}).then(function() { 
	// array to store the results of a search 	
	var states = [];
	// define readline for user input 
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	// text displayed to user before allowing input 
	rl.question(' How do you want to sort the data? \n Enter 1 to sort by state ' + 
	'\n Enter 2 to sort by statecode \n Enter 3 to sort by capital \n : ', (input) => {
		// depending on the number input either state, statecode or capital will be applied to the sortArray function 
		if(parseInt(input) == 1){
			states = functions.sortArray(list, "state");
		}
		else if(parseInt(input) == 2){
			states = functions.sortArray(list, "statecode");
		}
		else if(parseInt(input) == 3){
			states = functions.sortArray(list, "capital");
		}
		// close readline
		rl.close();
		// display each state
		for(i=0;i<states.length;i++){
			console.log(states[i] );
		}
	});
}).catch(function(err) {
    console.error(err);
});