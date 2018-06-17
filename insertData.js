var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/info";
var collection = "States"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var stateInfo = [
    {"state" : "Alabama", "statecode" : "AL", "capital" : "Montgomery"},
	{"state" : "Alaska", "statecode" : "AK", "capital" : "Juneau"},
	{"state" : "Arizona", "statecode" : "AZ", "capital" : "Phoenix"},
	{"state" : "Arkansas", "statecode" : "AR", "capital" : "Little Rock"},
	{"state" : "California", "statecode" : "CA", "capital" : "Sacramento"},
	{"state" : "Colorado", "statecode" : "CO", "capital" : "Denver"},
	{"state" : "Connecticut", "statecode" : "CT", "capital" : "Hartford"},
	{"state" : "Delaware", "statecode" : "DE", "capital" : "Dover"},
	{"state" : "Florida", "statecode" : "FL", "capital" : "Tallahassee"},
	{"state" : "Georgia", "statecode" : "GA", "capital" : "Atlanta"},
	{"state" : "Hawaii", "statecode" : "HI", "capital" : "Honolulu"},
	{"state" : "Idaho", "statecode" : "ID", "capital" : "Boise"},
	{"state" : "Illinois", "statecode" : "IL", "capital" : "Springfield"},
	{"state" : "Indianna", "statecode" : "IN", "capital" : "Indianapolis"},
	{"state" : "Iowa", "statecode" : "IA", "capital" : "Des Moines"},
	{"state" : "Kansas", "statecode" : "KS", "capital" : "Topeka"},
	{"state" : "Kentucky", "statecode" : "KY", "capital" : "Frankfort"},
	{"state" : "Louisiana", "statecode" : "LA", "capital" : "Baton Rouge"},
	{"state" : "Maine", "statecode" : "ME", "capital" : "Augusta"},
	{"state" : "Maryland", "statecode" : "MD", "capital" : "Annapolis"},
	{"state" : "Massachusetts", "statecode" : "MA", "capital" : "Boston"},
	{"state" : "Michigan", "statecode" : "MI", "capital" : "Lansing"},
	{"state" : "Minnesota", "statecode" : "MN", "capital" : "Saint Paul"},
	{"state" : "Mississippi", "statecode" : "MS", "capital" : "Jackson"},
	{"state" : "Missouri", "statecode" : "MO", "capital" : "Jefferson City"},
	{"state" : "Montana", "statecode" : "MT", "capital" : "Helena"},
	{"state" : "Nebraska", "statecode" : "NE", "capital" : "Lincoln"},
	{"state" : "Nevada", "statecode" : "NV", "capital" : "Carson City"},
	{"state" : "New Hampshire", "statecode" : "NH", "capital" : "Concord"},
	{"state" : "New Jersey", "statecode" : "NJ", "capital" : "Trenton"},
	{"state" : "New Mexico", "statecode" : "NM", "capital" : "Santa Fre"},
	{"state" : "New York", "statecode" : "NY", "capital" : "Albany"},
	{"state" : "North Carolina", "statecode" : "NC", "capital" : "Raleigh"},
	{"state" : "North Dakota", "statecode" : "ND", "capital" : "Bismarck"},
	{"state" : "Ohio", "statecode" : "OH", "capital" : "Columbus"},
	{"state" : "Oklahoma", "statecode" : "OK", "capital" : "Oklahoma City"},
	{"state" : "Oregon", "statecode" : "OR", "capital" : "Salem"},
	{"state" : "Pennsylvania", "statecode" : "PA", "capital" : "Harrisburg"},
	{"state" : "Rhode Island", "statecode" : "RI", "capital" : "Providence"},
	{"state" : "South Carolina", "statecode" : "SC", "capital" : "Columbia"},
	{"state" : "South Dakota", "statecode" : "SD", "capital" : "Pierre"},
	{"state" : "Tennessee", "statecode" : "TN", "capital" : "Nashville"},
	{"state" : "Texas", "statecode" : "TX", "capital" : "Austin"},
	{"state" : "Utah", "statecode" : "UT", "capital" : "Salt Lake City"},
	{"state" : "Vermont", "statecode" : "VY", "capital" : "Montpelier"},
	{"state" : "Virginia", "statecode" : "VA", "capital" : "Richmond"},
	{"state" : "Washington", "statecode" : "WA", "capital" : "Olympia"},
	{"state" : "West Virginia", "statecode" : "WV", "capital" : "Charleston"},
	{"state" : "Wisconsin", "statecode" : "WI", "capital" : "Madison"},
	{"state" : "Wyoming", "statecode" : "WY", "capital" : "Cheyenne"}
  ];
  db.collection(collection).insertMany(stateInfo, function(err, res) {
	  if (err) throw err;
	  console.log("Number of records inserted: " + res.insertedCount);
      db.close();
  });
}); 