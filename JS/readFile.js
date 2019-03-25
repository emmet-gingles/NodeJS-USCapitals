// HTTP module for server
var http = require('http');
// URL module for parsing URL
var url = require('url');
// Functions file
var functions = require('./functions.js');
// Path to the JSON file
var filePath = '../Files/states.json';

// First make sure that the file exists
if(functions.fileExists(filePath)) {
	// Inform the user of what to do
	console.log("Server running on localhost:8080");
	// Create variable of file using the filePath
	var file = require(filePath);
	// Call function to parse the JSON
	var data = functions.parseJSON(file);
	// Get the states array from the data
	var states = data.states;

	// Use HTTP to run server on localhost
	http.createServer(function (req, res) {
		// Parse the URL
		var q = url.parse(req.url, true);
		// Check if state is included in the URL query. Query is everything after '?'
		query = q.query.state
		// Inform the page that JSON is about to be written
		res.writeHead(200, {'Content-Type': 'application/json'});
		
		// If URL is localhost:8080/countfirstletter
		if(q.pathname == "/countfirstletter"){
			// Call function to get a list of letters and their occurrences
			letters = functions.countFirstLetter(states);
			// If letter is included in the URL query
			if(q.query.letter != undefined){
				// Get the letter from the query
				var letter = q.query.letter;
				// Filter the list of letters to only return the states that start with the letter(s)
				var filter_letters = letters.filter(function(l) {	
					return l.letter == letter.toUpperCase();
				});
				// Write out each state as a JSON object
				res.write(JSON.stringify(filter_letters));
			}
			// Else no letter is specified so write out the whole list
			else{
				res.write(JSON.stringify(letters));
			}
		}
		else{
			// If state is included in the URL query 
			if (q.query.state != undefined){
				// Get the state from the query
				var search = q.query.state
				// Filter the list of states to only return the states that start with the parameter
				var filter_states = states.filter(function(st) {	
					return st.state.toLowerCase().startsWith(search.toLowerCase())
				});
				// If orderby is included in the URL query 
				if (q.query.orderby != undefined){
					// Call function to sort the list by the parameter
					filter_states = functions.sortArray(filter_states, q.query.orderby);
				}
				// Write out each state as a JSON object
				res.write(JSON.stringify(filter_states));
			}
			// Else no state is specified so all states will be written out
			else{
				if (q.query.orderby != undefined){
					states = functions.sortArray(states, q.query.orderby);
				}
				res.write(JSON.stringify(states));
			}	
		}
		// End response
		res.end(); 
	// Server listens on port 8080
	}).listen(8080);
}
// Else file does not exist
else{
	console.log("File not found");
}

