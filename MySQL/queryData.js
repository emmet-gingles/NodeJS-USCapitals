// MySQL module for establishing connections
var mysql = require('mysql');
// path to file for database connection
var mysqldb = require('./db/db_connection.js');
// readline module for reading user input 
var readline = require('readline');
// variable that connects to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});
// use readline to allow the user to input text 
var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});
// message shown to user. Input variable is whatever the user has entered
rl.question('Enter some letters to search for states that match: ', (input) => {
    // connect to MySQL database 
	conn.connect(function(error) {
		// in case of any errors with the connection
	    if (error) throw error;
		// sql query that selects three columns from table based on states that start with the user input
	    var query = "SELECT state, statecode, capital FROM states WHERE state LIKE '"+input+"%' ORDER BY state";
		// execute the query
	    conn.query(query, function (error, result) {
			// in case of any errors with the query 
		    if (error) throw error;
			// number of results returned
		    var numResults = result.length;
			// if 1 or more results match the query then show the number of results as well as each result 
		    if(numResults > 0){
			    console.log(numResults + " results found");
			    console.log(JSON.parse(JSON.stringify(result)));
		    }
			// else no results found 
		    else{
			    console.log("No results found");
		    }		
	    });
	    // close database connection
	    conn.end(function(error) {
		    if (error) throw error;
	    });
	});
	// close readline 
	rl.close();
});