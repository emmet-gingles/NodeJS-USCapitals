// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// Path to file for database connection
var mongodb = require('./db/db_connection.js');
// Path to the JSON file
var filePath = '../Files/states.json';
// Functions file 
var functions = require('../JS/functions.js');

// First make sure that the file exists
if(functions.fileExists(filePath)) {
	// Create variable of file using the filePath
	var file = require(filePath);
	// Call function to parse the JSON
	var data = functions.parseJSON(file);

	// Connect to MongoDB using the url provided in the connections file 
	MongoClient.connect(mongodb.url, function(error, client) {
		// In case of any errors with the connection
		if (error) throw error;  
		// Variable to store the database provided in the connections file
		var db = client.db(mongodb.db_name);
		// Insert data from the array into the collection provided in db_connection.js 
		db.collection(mongodb.collection).insertMany(data.states, function(error, res) {
			if (error) throw error;
			// The number of record added to collection
			console.log("Number of records inserted: " + res.insertedCount);
			// Close database connection
			client.close();
		});
	}); 
}
// Else file doesnt exist
else{
	console.log("File not found")
}


