// requestServer.js file
var args = process.argv.slice(2);

const http = require("http");
const request = require("request");

const port = 3000;


var server = http.createServer(function (req, res) {

    var url = args[0] ? args[0] : "https://mail.google.com/";
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(body);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(error.toString());
            console.log(' Fail:' + error);
        }
        res.end();
    })
});

server.listen(port);

console.log(`on port ${port}`);


/*
    to start up server type (node requestServer.js) in the wsl terminal. before doing this make sure you
    are in the correct file by typing (pwd) in any terminal in vsCode. if it is not, go to the wsl terminal
    then you can cd (aka "Continuous Deployment") to it by doing cd then your file structre in vs code.
    for example for me it would be (cd projects/Raspberry-Pie/are-you-being-served)if you need to go
    back in your file structure you can type (cd ..) to go back one file ((note) I am not exactly sure
    on how to go back in files)
*/