// MySQL module for establishing connections
var mysql = require('mysql');
// Path to file for database connection
var mysqldb = require('./db/db_connection.js');
// Functions file 
var functions = require('../JS/functions.js');
// Path to JSON file
var filePath = '../Files/states.json';
// Variable for connecting to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});

// First make sure that the file exists
if(functions.fileExists(filePath)) {
	// Create variable of file using the filePath
	var file = require(filePath);
	// Call function to parse the JSON
	var data = functions.parseJSON(file);
	// Get the states array from the data
	var states = data.states
	
	// Connect to MySQL
	conn.connect(function(error) {
		// In case of any errors with the connection
		if (error) throw error;
		// Variable to record the number of rows inserted
		var numInserts = 0;
		// Loop through each state
		for(i in states){
			// Create variable for the state, statecode and capital
			var state = states[i].state;
			var statecode = states[i].statecode;
			var capital = states[i].capital;			
			// SQL statement to insert insert data into table
			var sql = "INSERT INTO states (state, statecode, capital) VALUES ('"+state+"','"+statecode+"','"+capital+"')";
			// Execute statement
			conn.query(sql, function (error, result) {
			// In case of any errors with the statement
			if (error) throw error;			
			});
			// Increment on each loop
			numInserts ++;
		}
		// Print the total number of inserts
		console.log("Number of records inserted: " + numInserts);
	    // Close database connection
		conn.end(function(error) {
			if (error) throw error;
		});
	});
}
// Else file doesnt exist
else{
	console.log("File not found");
}