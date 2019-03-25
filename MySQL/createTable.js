// MySQL module for establishing connections
var mysql = require('mysql');
// Path to file for database connection
var mysqldb = require('./db/db_connection.js');
// Variable for connecting to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password,
  database: mysqldb.db 
});

// Connect to MySQL
conn.connect(function(err) {
    // In case of any errors with the connection
    if (err) throw err;
	// SQL statement to delete the table if it already exists
    var sql = "DROP TABLE IF EXISTS states";
	// Execute statement
    conn.query(sql, function (err, result) {
		// In case of any errors with the statement
	    if (err) throw err;
	    console.log("Table deleted");
    });
    // SQL statement to create the table 
    sql = "CREATE TABLE states (id INT AUTO_INCREMENT PRIMARY KEY, state VARCHAR(255), statecode VARCHAR(2), capital VARCHAR(255))";
	// Execute statement
    conn.query(sql, function (err, result) {
		// In case of any errors with the statement
		if (err) throw err;
		// Show message to inform user of success
		console.log("Table created");
		});
	// Close MySQL connection
    conn.end(function(error) {
	    if (error) throw error;
    });
});