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
rl.question('Enter some letters to search for states that match: ', (input) => {
    // Connect to MySQL 
	conn.connect(function(error) {
		// In case of any errors with the connection
	    if (error) throw error;
		// SQL query that selects three columns from table based on states that start with the user input
	    var query = "SELECT state, statecode, capital FROM states WHERE state LIKE '"+input+"%' ORDER BY state";
		// Execute the query
	    conn.query(query, function (error, result) {
			// In case of any errors with the query 
		    if (error) throw error;
			// if 1 or more results match the query then show the number of results as well as each result 
		    if(result.length > 0){
			    console.log(result.length + " results found");
			    console.log(result);
		    }
			// Else no results found 
		    else{
			    console.log("No results found");
		    }		
	    });
	    // Close database connection
	    conn.end(function(error) {
		    if (error) throw error;
	    });
	});
	// Close readline 
	rl.close();
});