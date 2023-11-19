// Create web server using Node.js
// Run using Node.js: node comments.js

var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
	var path = url.parse(request.url).pathname;
	var file = __dirname + path;
	var fileExtension = path.split('.').pop();

	// Check if file exists
	fs.exists(file, function(exists) {
		// If file exists
		if (exists) {
			// Read file
			fs.readFile(file, function(error, data) {
				// If no error
				if (!error) {
					// Write response header
					response.writeHead(200, {
						'Content-Type': 'text/' + fileExtension,
						'Content-Length': data.length
					});

					// Write response body
					response.write(data);
					response.end();
				}
				else {
					// Write response header
					response.writeHead(500, {
						'Content-Type': 'text/' + fileExtension,
						'Content-Length': data.length
					});

					// Write response body
					response.write(data);
					response.end();
				}
			});
		}
		else {
			// Write response header
			response.writeHead(404, {
				'Content-Type': 'text/' + fileExtension,
				'Content-Length': 0
			});

			// Write response body
			response.write('File not found');
			response.end();
		}
	});
});

server.listen(8080);
console.log('Server running at http:// localhost:8080/');


