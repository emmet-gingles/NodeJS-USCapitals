// MySQL module for establishing connections
var mysql = require('mysql');
// Path to file for database connection
var mysqldb = require('./db/db_connection.js');
// Variable for connecting to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password
});

// Connect to MySQL 
conn.connect(function(error) {
	// In case of any errors with the connection
	if (error) throw error;
	// SQL statement to create database
	var sql = "CREATE DATABASE IF NOT EXISTS "+mysqldb.db;
	// Execute the statement
	conn.query(sql, function (error, result) {
		// In case of any errors with the statement
	    if (error) throw error;
		// Show message to inform user of success
        console.log("Database created");
    });
	// Close MySQL connection
    conn.end(function(error) {
	    if (error) throw error;
    });
});