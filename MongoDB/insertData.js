// lineReaser module for reading each line of file
var lineReader = require('line-reader');
// bluebird module used for creating a promise when reading file 
var promise = require('bluebird');
// function that uses promise and lineReader for reading file 
var eachLine = promise.promisify(lineReader.eachLine);
// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// path to file for database connection
var mongodb = require('./db/db_connection.js');
// path to file where data is stored
var file = '../Files/states.txt';
// variable to keep track of what line in the file we are on 
var lineNo = 0;
// array to store data retrieved from file 
var stateInfo = [];

// call eachLine function to read each line of the file 
eachLine(file, function(line) {
	// increment for each new line 
	lineNo++;
	// this stops it from reading the header
	if(lineNo > 1){
		// split the line into three segments using comma
		var output = line.split(',');
		// to prevent any errors - check the length is sufficient
		if(output.length >= 3){
			// add data to array
			stateInfo.push({"state" : output[0], "statecode" : output[1], "capital" : output[2] });	
		}
	} 
// called only once the file has finished being read
}).then(function(){
	// connect to MongoDB using the url provided in db_connection.js 
	MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(error, client) {
		// in case of any errors with the connection
		if (error) throw error;  
		// variable to store the database provided in db_connection.js 
		var db = client.db(mongodb.db_name);
		// insert data from the array into the collection provided in db_connection.js 
		db.collection(mongodb.collection).insertMany(stateInfo, function(error, res) {
			if (error) throw error;
			// the number of record added to collection
			console.log("Number of records inserted: " + res.insertedCount);
			// close database connection
			client.close();
		});
	}); 
// if there is an error with the file - display error	
}).catch(function(error) {
    console.error(error);
});

