// functions.js used for calling functions on data 
var functions = require('./functions.js');
// line-read module used for reading each line of file 
var lineReader = require('line-reader');
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
	// call function to get the total states that start with each letter 
	letters = functions.countFirstLetter(list);
	// display totals for each letter 
	for(i=0;i<letters.length;i++){
	    console.log(letters[i]);
    }	
}).catch(function(err) {
    console.error(err);
});	
