var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/info";
var collection = "States"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected to: " + url);
  db.createCollection(collection, function(err, res) {
	if (err) throw err;
	console.log("Created collection: " + collection);
	db.close();
	});
});