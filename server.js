//
// This simple web server written in Node responds with "Hello World" for every request.
//
var http = require('http');
var util = require('util');
var app_port = process.env.app_port || 8080;
var app_host = process.env.app_host || '127.0.0.1';

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World from Cloudnode\n\n');
    res.end();
}).listen(app_port);
console.log('Web server running at http://' + app_host + ':' + app_port);