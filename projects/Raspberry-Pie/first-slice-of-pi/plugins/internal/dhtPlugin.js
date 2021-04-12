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
                device.temperature.value = parseFloat(device.temperature);
                sensor.initialize = function() {
                        return sensorDriver.initialize();
                }
                sensor.read = function() {
                        return sensorDriver.read(device.temperature.value);
                }
        }, localParams.frequency);
}

exports.start = function (params) {
        localParams = params ? params : localParams;
        connectHardware();
}

exports.stop = function() {
        clearInterval(interval);
        sensor.unexport();
}
