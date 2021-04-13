var sensorRoutes = require('../routes/sensors');
var converter = require('./../middleware/converter');
var bodyParser = require('body-parser');
var actuatorRoutes = require('../routes/actuators');

bodyParser;
app.use(bodyParser.json());

var express = require('express'),
	cors = require('cors');
var app = express();
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
