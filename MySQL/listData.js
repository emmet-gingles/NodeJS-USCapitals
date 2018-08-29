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
rl.question('How would you like to sort the data? \n Enter 1 to sort by state \n Enter 2 to sort by statecode \n' 
+ ' Enter 3 to sort by capital \n => ', (input) => {
	// variable that will determine how data is sorted based on user's input 
	var sortBy;
	// depending on the number input sort is set to a different value 
	if(parseInt(input) == 1){
		sortBy = 'state';
	}
	else if(parseInt(input) == 2){
		sortBy = 'statecode';
	}
	else if(parseInt(input) == 3){
		sortBy = 'capital';
	}
	// if anything else is input then terminate program
	else{
		console.log('unrecognized input');
		process.exit();
	}
	// connect to MySQL database 
	conn.connect(function(error) {
		// in case of any errors with the connection
	    if (error) throw error;
		// query that selects three columns from table and sorts them based on the value of sortBy
	    var query = "SELECT state, statecode, capital FROM states ORDER BY "+sortBy;
		// execute query
	    conn.query(query, function (error, result) {
			// in case of any errors with the query 
		    if (error) throw error;
			// show the results
		    console.log(JSON.parse(JSON.stringify(result)));
	    });
	    // close data connection
	    conn.end(function(error) {
		    if (error) throw error;
	    });
	  
	});
	// close readline
	rl.close();
});