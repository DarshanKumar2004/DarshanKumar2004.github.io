# second-slice-of-pi
Add in middleware to handle data format conversion

**Table of Contents**
 
- [Installation](#installation)
- [Lesson Steps](#lesson-steps)
    - [TODO 1: Update Server](#todo-1-update-server)
    - [TODO 2: The Converter](#todo-2-the-converter)
    - [TODO 3: Modify Sensor Routes](#todo-3-modify-sensor-routes)
    - [TODO 4: Modify Actuator Routes](#todo-4-modify-actuator-routes)
    - [TODO 5: Test Web Page](#todo-5-test-web-page)

## Installation
* This project should be completed on your Pi.
* Enter the command `git clone https://github.com/operationspark/second-slice-of-pi` to download some base files for this project to your projects directory
* Assuming you have installed **second-slice-of-pi** in the same location as **first-slice-of-pi**, enter the command `cp -r first-slice-of-pi/* second-slice-of-pi/.` to copy your completed first-slice-of-pi into second-slice-of-pi's directory
* Enter the command `cd second-slice-of-pi` to enter the new project's directory
* Enter the command `rm -rf .git .gitignore` so you don't accidentally add the git management files to your own repository when you commit later
* Run the command `npm install -g body-parser xmlhttprequest node-json2html`

## Lesson Steps
This project is the second part of the multi-project undertaking that is setting up a server to allow others to interface with your Pi. For your server itself, you will only be adding in a converter middleware to allow for multiple data formats to be sent back as responses for the server and the necessary changes to support that converter. However, part of this project is writing a script to test that functionality.

### TODO 1: Update Server
This is a small step, but an important one. At the top of your **servers/http.js** file, import your middleware converter with `require('./../middleware/converter')` and the body-parser library with `require('body-parser')`. 

Assuming you stored the body-parser library in a variable called "bodyParser", add the line

    app.use(bodyParser.json());

Just before where you tell Express to use cors.

Finally, at the end of the file (but before the `module.exports`), add in the line

    app.use(converter());

The ordering is important, as by putting body-parser first, you ensure that incoming request data is easily readable during routing or converting (it's how you can get `req.accepts` in the converter file). By putting the converter at the end, it lets the routes pass data into the converter.

### TODO 2: The Converter
First, let's talk about what is actually happening. Whenever someone puts the URL of one of your devices in the browser, your server sends back information about that device to be displayed. What gets sent back is decided on by your server, but by default it is a JSON representation of your device as described in the resources.json file you have, except up to date (i.e., whether or not an LED is on or off).

The first step is to create a converter that will handle sending back responses in the requested data format. This will be in your **middleware/converter.js** file. We're only requiring support for two formats, but you can add in more if you want. Just be aware that some formats are harder to work with than others.

#### 2a) Check for Results and Send Default
The first thing that needs to be done in the converter is to check if there is even a result that needs to be sent back from the server. You can do this with the condition

    if (req.result) {}

If there is not a result to send back, then what you should do instead is call `next()`. Make sure you have this before attempting to process the result with the converter.

If there is a result to send back, then the default behavior should be to send back json data. This can be done with the line 

    res.send(req.result);

#### 2b) Check if HTML is requested and send HTML
Keeping in mind that JSON is the default behavior (meaning it should only be sent back if no other data format was requested), you should now handle the case of HTML data requests. 

If you have a result to send back, then you can check if HTML is requested with an additional condition:

    if (req.accepts('html')){}

If HTML is requested, then there are two steps you must follow to send that back. 

**2b-i) The tranformation object**
The first is to create a transformation object for **json2html** to use when converting the default JSON object into HTML. This object should take on the form:

```js
let transform = {'<>': 'div', 'html': [
    {'<>': 'p', 'html': [
        {'<>': 'b', 'html': 'Property1: '},
        {'<>': 'p', 'html': '${property1}'}
    ]},
    {'<>': 'p', 'html': [
        {'<>': 'b', 'html': 'Property2: '},
        {'<>': 'p', 'html': '${property2}'}
    ]},
    {'<>': 'p', 'html': [
        {'<>': 'b', 'html': 'Property3: '},
        {'<>': 'p', 'html': '${property3}'}
    ]}
]};
```

However, the three properties that you should use are the `name`, `description`, and `value` of whatever device's information you are sending back, which if you look at your resources.json file you will see are properties present in each of your connected devices.

Feel free to add on additional properties, or to change up how the information is displayed (i.e. replace 'b' with 'h1', or put the whole thing in a `<ul>` tag and make the information display in list format).

**2b-ii) The transformation**
Once you have your transformation object created, you can send back the HTML using `res.send()`, where the data sent back is generated by a call to `json2html.transform()`. The first argument to **json2html.transform()** should be your JSON result, and the second should be your transformation object.

After sending the result, it is good practice to return from the function.

### TODO 3: Modify Sensor Routes
Once you have your converter set up you will need to update your routes to use the converter. First on the list are the sensor routes in **routes/sensors.js**.

This step is actually fairly straightforward. Basically, for each of your routes, you should replace the res.send() with an assignment to req.result and a call to next(). i.e.

```js
res.send(resourses.pi.sensors);
```

would become

```js
req.result = resources.pi.sensors;
next();
```

This needs to be done for all routes in your sensors.js file.

Why? Well, by doing this you first store a result in the request data that is the JSON format of your device data. When you call next(), that's jumping over to the converter (remember how you put `app.use(converter())` after your routes in the http.js file), and req is passed along thanks to the Express server.

### TODO 4: Modify Actuator Routes
Here, just do the same thing for the actuator routes that you did for the sensor routes. Once you've done that, you're ready for testing!

### TODO 5: Test Web Page
To test your changes to your server, you will need to work in the file **data-requester.html**. 

#### 5a) Prepare the request
Inside of the `processForm()` function, you will need to create a new XMLHttpRequest client (i.e. `const xhttp = new XMLHttpRequest()`). You will also need to get the URL that you will be using. Because you are in the processForm function, it is safe to use jQuery to grab the URL from the form. You can do so using the line

    const url = $('#host').val();

After that use `xhttp.open()` to declare the nature of the request. You should use "GET" as your verb, the URL you just got as the URL, and you'll want the request to be asynchronous (it might not even let you send it if it's not).

Next, set the requester header with the header of "Accept" and the header value of "text/html". This will let the server check for what data type to send back (in this case HTML).

Finally, use `xhttp.send()` to send the request.

#### 5b) Handle readystate changes
You will need to tell the program how to handle changes to the XMLHttpRequest client's readyState. After sending the request, assign to `xhttp.onreadystatechange` a function that accepts no parameters. The body of this function will make use of the readyState and status to decide what to do.

If the readyState (accessable from the function via `this.readystate`) is 4, then and only then should you update your page using jQuery.

If the status (`this.status`) is 200, then the data exchange was successful and you should update the page to load the received HTML (`$('#data').html(this.responseText)`). If the status is anything other than 200, then you should update the page to display "ERROR" in its data element instead.

#### 5c) Test your page to make sure it and your server work
Put in various URLs that should be supported by your server. Start up your server using the command `node wot-server.js`. If you're testing directly on your Pi, keep localhost as the root of your URL. If you are testing on a different machine, you will need to put the IP address of your Pi in place of "localhost". If you are getting back information other than "ERROR", congratulations, you've done it!
