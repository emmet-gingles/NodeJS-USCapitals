'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/info";
var collection = "States";
var param;
var regex;

// input parameter
param = process.argv[2]

if (param != undefined){
	// use parameter to create regular expression that starts with input parameter, ignore case 
	regex = new RegExp('^'+param, 'i' );
    console.log('regex ' + regex);
}
else{
	process.exit();
}
  
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // query data to find states that start with the input parameter 
  var query = { state: regex };
  db.collection(collection).find(query, {'_id': 0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});