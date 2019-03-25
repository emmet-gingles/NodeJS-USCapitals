// MongoDB module for establishing connections 
var MongoClient = require('mongodb').MongoClient;
// Path to file for database connection
var mongodb = require('./db/db_connection.js');

// Connect to MongoDB using the url provided in the connections file
MongoClient.connect(mongodb.url, function(error, client) {
	// In case of any errors with the connection
	if (error) throw error;
	// Variable to store the database name provided in the connections file
	var db = client.db(mongodb.db_name);
	// Drop the collection if it already exists
	db.dropCollection(mongodb.collection, function(error) {
		if (error) throw error;
	});
	// Create the collection 
	db.createCollection(mongodb.collection, function(error) {
		if (error) throw error;
		// Show message that collection was created 
		console.log("Created collection: " + mongodb.collection);
		// Close database connection
		client.close();
	});
});