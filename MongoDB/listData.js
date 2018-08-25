'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/info";
var collection = "States"
var param;
var sortBy;

for (let i = 0; i < process.argv.length; i++) {  
	if (i == 2){
		param = process.argv[2];
	}
  }
  
  if (param !== undefined){
      if(param == 'state'){
	      sortBy = 'state';
	  }
	  else if(param == 'capital'){
	      sortBy = 'capital';
      }
      else if(param == 'statecode' || param == 'code' ){
	      sortBy = 'statecode';
      }
      else{
	      console.log('unrecognized parameter');
	      process.exit();
      }
  }
  else{
	  sortBy = 'state';
  }
 
  MongoClient.connect(url, function(err, db) {
	  if (err) throw err;

	  if (sortBy == 'state'){
		  db.collection(collection).find({}, {'state': 1, 'capital': 1, 'statecode': 1, '_id': 0} ).sort({ 'state': 1 }).toArray(function(err, result) {
			  if (err) throw err;
			  console.log(result);
		      db.close();
			  }); 
		  }
	  else if (sortBy == 'capital'){
		  db.collection(collection).find({}, {'state': 1, 'capital': 1, 'statecode': 1, '_id': 0} ).sort({ 'capital': 1 }).toArray(function(err, result) {
			  if (err) throw err;
			  console.log(result);
		      db.close();
		      }); 
	      }
	  else if (sortBy == 'statecode'){
		  db.collection(collection).find({}, {'state': 1, 'capital': 1, 'statecode': 1, '_id': 0} ).sort({ 'statecode': 1 }).toArray(function(err, result) {
			   if (err) throw err;
			   console.log(result);
               db.close();
               }); 
          }
    }); 
  

  