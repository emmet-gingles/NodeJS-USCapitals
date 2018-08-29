// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// path to file for database connection
var mongodb = require('./db/db_connection.js');
// readline module for reading user input 
var readline = require('readline');

// use readline to allow the user to input text 
var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});
// message shown to user. Input variable is whatever the user has entered
rl.question('Enter some letters to search for states that match: ', (input) => {
	// create a regular expression that is case insensitive using the input 
	var regex = new RegExp('^'+input, 'i' );	
		
	// connect to MongoDB using the url provided in db_connection.js 
	MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(error, client) {
		// in case of any errors with the connection
		if (error) throw error;
		// query to find states that start with the input parameter 
		var query = { state: regex };
		// variable to store the database provided in db_connection.js 
		var db = client.db(mongodb.db_name);
		// return all data from the collection that matches the query. Exclude '_id' column and sort the results in ascending order by state
		db.collection(mongodb.collection).find(query, {projection: {'_id': 0}}).sort({state : 1}).toArray(function(error, result) {
			if (error) throw error;
			// number of results found 
			var numResults = result.length;
			// if 1 or more results match the query then show the number of results as well as each result 
			if(numResults > 0){				
				console.log(result.length + " results found");
				console.log(result);
			}
			// else no results found 
			else{
				console.log("No results found");
			}
			// close database connection
			client.close();
	    });
	});
	// close readline 
	rl.close();
});
  
