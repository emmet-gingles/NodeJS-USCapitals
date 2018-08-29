// MySQL module for establishing connections
var mysql = require('mysql');
// path to file for database connection
var mysqldb = require('./db/db_connection.js');
// variable that connects to MySQL using the variables provided in the connections file
var conn = mysql.createConnection({
  host: mysqldb.host,
  user: mysqldb.user,
  password: mysqldb.db_password
});

// connect to MySQL 
conn.connect(function(error) {
	// in case of any errors with the connection
	if (error) throw error;
	// sql statement to create database
	var sql = "CREATE DATABASE IF NOT EXISTS "+mysqldb.db;
	// execute the statement
	conn.query(sql, function (error, result) {
		// in case of any errors with the statement
	    if (error) throw error;
		// show message to inform user 
        console.log("Database created");
    });
	// close database connection
    conn.end(function(error) {
	    if (error) throw error;
    });
});