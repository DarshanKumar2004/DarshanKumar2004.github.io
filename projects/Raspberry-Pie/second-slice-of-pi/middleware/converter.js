var json2html = require('node-json2html');

let transform = {
	'<>': 'div', 'html': [
		{
			'<>': 'p', 'html': [
				{ '<>': 'b', 'html': 'name: ' },
				{ '<>': 'p', 'html': '${name}' }
			]
		},
		{
			'<>': 'p', 'html': [
				{ '<>': 'b', 'html': 'description: ' },
				{ '<>': 'p', 'html': '${description}' }
			]
		},
		{
			'<>': 'p', 'html': [
				{ '<>': 'b', 'html': 'value: ' },
				{ '<>': 'p', 'html': '${value}' }
			]
		}
	]
};

module.exports = function () {
	return function (req, res, next) {
		// TODO 2: Create the converter function
		if (req.result) {
			if (req.accepts('html')) {
				json2html.transform(req.result, transform);
				res.send();
			}
			else {
				res.send(req.result);
			}
		}
		else {
			next();
		}
	};
};
