var resources = require('./../../resources/model');
var sensorDriver = require('node-dht-sensor');

var interval, sensor;
var device = resources.pi.sensors.dht;
var localParams = { 'frequency': 2000 };

function connectHardware() {
        sensor = {
                "initialize": sensorDriver.initialize(device.model, device.gpio),
                "read": sensorDriver.read()
        }
        device.temperature.value = parseFloat(readout.temperature);
        device.humidity.value = parseFloat(readout.humidity);
        sensor.initialize();
        sensor.read();
        interval = setInterval(function () {
                sensor.read();
        }, localParams.frequency);
        exports.start = function (parms) {
                localParams = params ? params : localParams;
                connectHardware();
                clearInterval(interval);
                function stop() {
                        sensor.unexport();
                }
        }
}
