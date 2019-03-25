// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// Path to file for database connection
var mongodb = require('./db/db_connection.js');
// Readline module for reading user input 
var readline = require('readline');
// Use readline to allow the user to input text 
var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});

// Message shown to user. Input variable is whatever the user has entered
rl.question('Enter some letters to search for states that match: ', (input) => {
	// Create a regular expression that is case insensitive using the input 
	var regex = new RegExp('^'+input, 'i' );	
		
	// Connect to MongoDB using the url provided in the connections file
	MongoClient.connect(mongodb.url, function(error, client) {
		// In case of any errors with the connection
		if (error) throw error;
		// Query to find states that start with the input parameter 
		var query = { state: regex };
		// Variable to store the database provided in the connections file
		var db = client.db(mongodb.db_name);
		// Return all data from the collection that matches the query. 
		// Exclude '_id' column and sort the results in ascending order by state
		db.collection(mongodb.collection).find(query, {'_id': 0}).sort({state : 1}).toArray(function(error, result) {
			if (error) throw error;
			// If 1 or more results match the query then show the number of results as well as each result 
			if(result.length > 0){				
				console.log(result.length + " results found");
				console.log(result);
			}
			// Else no results found 
			else{
				console.log("No results found");
			}
			// Close database connection
			client.close();
	    });
	});
	// Close readline 
	rl.close();
});
  
