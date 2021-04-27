var converter = require('../middleware/converter');
var sensorRoutes = require('../routes/sensors');
var bodyParser = require('body-parser');
var actuatorRoutes = require('../routes/actuators');
var express = require('express'),
	cors = require('cors');
var app = express();

// bodyParser;

app.use(bodyParser.json());
app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get('/', function (req, res) {
	res.send('instead try /pi');
});
app.get('/pi', function (req, res) {
	res.send('welcome');
});

app.use(converter());
module.exports = app;
