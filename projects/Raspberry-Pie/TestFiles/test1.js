var json2html = require("node-json2html");

let data = {
    "name": "daniel",
    "age": 34,
};
let transform = {
    '<>': [
        {'<>': 'h1', 'html': '${name}'},
        {'<>': 'p', 'html': '${age}'}
    ]
};
let html = json2html.transform(data, transform);
console.log(html.split('><').join('>\n<'));
