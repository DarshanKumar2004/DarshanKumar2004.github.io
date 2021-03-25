pirPlugin.start({});

var dhtSensor = require('.plugins/internal/dhtPlugin.js');
dhtPlugin.start({ 'frequency': 2000 });

var httpServer = require('./servers/http');

var pirPlugin = require('./plugins/internal/pirPlugin');
var dhtPlugin = require('./plugins/internal/dhtPlugin');

resources = require('./resources/model');

var server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function () {
	dhtPlugin.stop();
	pirPlugin.stop();
	process.exit();
});
