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
rl.question('How would you like to sort the data? \n Enter 1 to sort by state \n Enter 2 to sort by statecode \n' 
+ ' Enter 3 to sort by capital \n => ', (input) => {
	// variable that will determine how data is sorted based on user's input 
	var sortBy = {};
	// depending on the number input sort is set to a different value 
	if(parseInt(input) == 1){
		sortBy['state'] = 1;
	}
	else if(parseInt(input) == 2){
		sortBy['statecode'] = 1;
	}
	else if(parseInt(input) == 3){
		sortBy['capital'] = 1;
	}
	// if anything else is input then terminate program
	else{
		console.log('unrecognized input');
		process.exit();
	 }

	// connect to MongoDB using the url provided in db_connection.js 
	MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(error, client) {
	     // in case of any errors with the connection
	     if (error) throw error;
		 // variable to store the database provided in db_connection.js 
	     var db = client.db(mongodb.db_name);
		 // return all data from the collection provided in db_connection.js. Exclude '_id' column and sort the results using the value of sortBy 
	     db.collection(mongodb.collection).find({}, { projection: {'_id': 0}} ).sort( sortBy ).toArray(function(error, result) {
		     if (error) throw error;
			 // show the results 
		     console.log(result);
			 // close database connection
		     client.close();
	     }); 
    }); 
	 // close readline 
	 rl.close();
});
  
 
 
  

  