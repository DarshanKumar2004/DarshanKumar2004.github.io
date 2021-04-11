var resources = require('../../resources/model');
var sensorDriver = require('node-dht-sensor');

var interval, sensor;
var device = resources.pi.sensors.dht;
var localParams = { 'frequency': 2000 };

function connectHardware() {
        sensor = {
                "initialize": sensorDriver.initialize(device.model, device.gpio),
                "read": sensorDriver.read()
        }
        device.temperature.value = parseFloat(sensor.read.temperature);
        device.humidity.value = parseFloat(sensor.read.humidity);
        
        interval = setInterval(function () {
                sensor.initialize();
                sensor.read();
        }, localParams.frequency);
}

exports.start = function (params) {
        localParams = params ? params : localParams;
        connectHardware();
        clearInterval(interval);
        exports.stop = function() {
                sensor.unexport();
        }
}
