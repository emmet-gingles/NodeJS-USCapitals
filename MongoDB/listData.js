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
rl.question('How would you like to sort the data? \n Enter 1 to sort by state \n'
+ ' Enter 2 to sort by statecode \n Enter 3 to sort by capital \n => ', (input) => {
	// Variable that will determine how data is sorted based on user's input 
	var sortBy = {};
	// Depending on the number the input sort is set to a different value 
	if(parseInt(input) == 1){
		sortBy['state'] = 1;
	}
	else if(parseInt(input) == 2){
		sortBy['statecode'] = 1;
	}
	else if(parseInt(input) == 3){
		sortBy['capital'] = 1;
	}
	// If anything else is input then terminate program
	else{
		console.log('Please enter a number between 1 and 3');
		process.exit();
	 }

	// Connect to MongoDB using the url provided in the connections file
	MongoClient.connect(mongodb.url, function(error, client) {
	     // In case of any errors with the connection
	     if (error) throw error;
		 // Variable to store the database provided in the connections file
	     var db = client.db(mongodb.db_name);
		 // Return all data from the collection provided in the connections file.
		 // Exclude '_id' column and sort the results using the value of sortBy 
	     db.collection(mongodb.collection).find({}, {'_id': 0} ).sort( sortBy ).toArray(function(error, result) {
		     if (error) throw error;
			 // Print the query results 
		     console.log(result);
			 // Close database connection
		     client.close();
	     }); 
    }); 
	 // Close readline 
	 rl.close();
});
  
 
 
  

  