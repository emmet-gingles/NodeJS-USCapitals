// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// path to file for database connection
var mongodb = require('./db/db_connection.js');

// connect to MongoDB using the url provided in db_connection.js 
MongoClient.connect(mongodb.url, { useNewUrlParser: true }, function(error, client) {
	// in case of any errors with the connection
	if (error) throw error;
	// variable to store the database provided in db_connection.js 
	var db = client.db(mongodb.db_name);
	// create the collection with the name provided in db_connection.js 
	db.createCollection(mongodb.collection, function(error) {
	if (error) throw error;
		// show message that collection was created 
		console.log("Created collection: " + mongodb.collection);
		// close database connection
		client.close();
	});
});