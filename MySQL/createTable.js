// MySQL module for establishing connections
var mysql = require('mysql');
// path to file for database connection
var mysqldb = require('./db/db_connection.js');
// variable that connects to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});

// connect to MySQL database
conn.connect(function(err) {
    // in case of any errors with the connection
    if (err) throw err;
	// sql statement to delete the table if it already exists
    var sql = "DROP TABLE IF EXISTS states";
	// execute statement
    conn.query(sql, function (err, result) {
		// in case of any errors with the statement
	    if (err) throw err;
	    console.log("Table deleted");
    });
    // sql statement to create the table 
    sql = "CREATE TABLE states (id INT AUTO_INCREMENT PRIMARY KEY, state VARCHAR(255), statecode VARCHAR(2), capital VARCHAR(255))";
	// execute statement
    conn.query(sql, function (err, result) {
		// in case of any errors with the statement
		if (err) throw err;
		// show message to inform user 
		console.log("Table created");
		});
  
    conn.end(function(error) {
	    if (error) throw error;
    });
});