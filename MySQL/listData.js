// MySQL module for establishing connections
var mysql = require('mysql');
// Path to file for database connection
var mysqldb = require('./db/db_connection.js');
// Readline module for reading user input 
var readline = require('readline');
// Variable for connecting to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});
// Use readline to allow the user to input text 
var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});
// Message shown to user. Input variable is whatever the user has entered
rl.question('How would you like to sort the data? \n Enter 1 to sort by state \n'
+ ' Enter 2 to sort by statecode \n Enter 3 to sort by capital \n => ', (input) => {
	// Variable that will determine how data is sorted based on user's input 
	var sortBy;
	// Depending on the number input sort is set to a different value 
	if(parseInt(input) == 1){
		sortBy = 'state';
	}
	else if(parseInt(input) == 2){
		sortBy = 'statecode';
	}
	else if(parseInt(input) == 3){
		sortBy = 'capital';
	}
	// If anything else is input then terminate program
	else{
		console.log('Please enter a number between 1 and 3');
		process.exit();
	}
	// Connect to MySQL
	conn.connect(function(error) {
		// In case of any errors with the connection
	    if (error) throw error;
		// Query that selects three columns from table and sorts them based on the value of sortBy
	    var query = "SELECT state, statecode, capital FROM states ORDER BY "+sortBy;
		// Execute query
	    conn.query(query, function (error, result) {
			// In case of any errors with the query 
		    if (error) throw error;
			// Print the query results
		    console.log(JSON.parse(JSON.stringify(result)));
	    });
	    // Close data connection
	    conn.end(function(error) {
		    if (error) throw error;
	    });
	  
	});
	// Close readline
	rl.close();
});