// MySQL module for establishing connections
var mysql = require('mysql');
// path to file for database connection
var mysqldb = require('./db/db_connection.js');
// lineReaser module for reading each line of file
var lineReader = require('line-reader');
// bluebird module used for creating a promise when reading file 
var promise = require('bluebird');
// function that uses promise and lineReader for reading file 
var eachLine = promise.promisify(lineReader.eachLine);
// path to file where data is stored
var file = '../Files/states.txt';
// variable to keep track of what line in the file we are on 
var lineNo = 0;
// array to store data retrieved from file 
var stateInfo = [];
// variable that connects to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});

// call eachLine function to read each line of the file 
eachLine(file, function(line) {
	// increment for each new line 
	lineNo++;
	// this stops it from reading the header
	if(lineNo > 1){
		// split the line into three segments using comma
		var output = line.split(',');
		// to prevent any errors - check the length is sufficient
		if(output.length >= 3){
			// add data to array
			stateInfo.push([output[0], output[1], output[2]]);	
		}
	} 
// called only once the file has finished being read
}).then(function(){
	// connect to MySQL database
	conn.connect(function(error) {
		// in case of any errors with the connection
		if (error) throw error;
		// sql statement to insert insert data to table
		var sql = "INSERT INTO states (state, statecode, capital) VALUES ?";
		// pass the array to the statement and execute it 
		conn.query(sql, [stateInfo], function (error, result) {
			// in case of any errors with the statement
			if (error) throw error;
			// show the user how many records were added to the table
			console.log("Number of records inserted: " + result.affectedRows);
		});
	    // close database connection
		conn.end(function(error) {
			if (error) throw error;
		});
	});
});