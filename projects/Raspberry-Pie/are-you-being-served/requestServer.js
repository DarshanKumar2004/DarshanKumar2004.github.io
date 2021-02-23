// requestServer.js file

const http = require("http");
const request = require("request");

const port = 8686;


http.createServer(function(req, res){

    request("https://DarshanKumar2004/DarshanKumar2004.github.io", function(err, resp, body) {
        if (!err === true && resp.statusCode === 200) {
            console.log(body.data);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(error)
            res.end;
        }
    })

}).listen(port);
