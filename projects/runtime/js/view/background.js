var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, 343,'#d34200');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png');
            moon.x = 10;
            moon.y = 25;
            moon.scaleX = 0.25;
            moon.scaleY = 0.25;
            background.addChild(moon);
            
            var sun = draw.bitmap('http://pngimg.com/uploads/sun/sun_PNG13449.png');
            sun.x = 880;
            sun.y = 13;
            sun.scaleX = 0.55;
            sun.scaleY = 0.55;
            background.addChild(sun);
            
            var circle;
            for(var i=0;i<15;i++) {
            circle = draw.circle(3,'lightgrey','white',2);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            }
            
            var cloud = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG32.png');
            cloud.x = 650;
            cloud.y = 40;
            cloud.scaleX = 0.2;
            cloud.scaleY = 0.2;
            background.addChild(cloud);
            
            var cloud2 = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG30.png');
            cloud2.x = 380;
            cloud2.y = 60;
            cloud2.scaleX = 0.3;
            cloud2.scaleY = 0.3;
            background.addChild(cloud2);
            
            var cloud3 = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG13.png');
            cloud3.x = 200;
            cloud3.y = 20;
            cloud3.scaleX = 0.2;
            cloud3.scaleY = 0.2;
            background.addChild(cloud3);
            
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            
            // TODO 4: Part 1 - Add a tree
            
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
