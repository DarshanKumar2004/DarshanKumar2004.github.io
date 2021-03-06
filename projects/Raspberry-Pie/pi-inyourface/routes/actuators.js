const ledsPlugin = require('./../plugins/internal/ledsPlugin');
var express = require('express'),
	router = express.Router(),
	resources = require('../resources/model');

router.route('/leds/:id').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds[req.params.id];
	next();
}).put(function(req, res, next){
	req.result = req.body.value;
	ledsPlugin.switchOnOff[req.params.id](req.body.value);
	next();
});
router.route('/').get(function (req, res, next) {
	req.result = resources.pi.actuators;
	next();
});
router.route('/leds').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds;
	next();
});

module.exports = router;
