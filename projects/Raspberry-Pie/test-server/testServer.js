var http = require("http");
var port = 8686;

http.createServer(function(req,res){
  // handle response
  res.writeHeader();
  res.write();
  res.end()
}).listen(port);