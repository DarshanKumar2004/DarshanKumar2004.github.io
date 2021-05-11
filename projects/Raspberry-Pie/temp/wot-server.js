var httpServer = require('./servers/http');

var pirPlugin = require('./plugins/internal/pirPlugin');
var dhtPlugin = require('./plugins/internal/dhtPlugin');

const actuators = require('./routes/actuators');
const ledsPlugin = require('./plugins/internal/ledsPlugin');

resources = require('./resources/model');

pirPlugin.start({});
dhtPlugin.start({ 'frequency': 2000 });
ledsPlugin.start({})

var server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
});

process.on('SIGINT', function () {
	dhtPlugin.stop();
	pirPlugin.stop();
	ledsPlugin.stop();
	process.exit();
});
