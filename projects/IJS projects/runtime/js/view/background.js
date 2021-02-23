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
        var tree;
        var cloud;
        var cloud2;
        var cloud3;
        var moon;
        var sun;
        var buildings = [];
     
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
            var top = draw.bitmap('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUw_uUwBPfo_Pya2lE-tTd_zWn0SbZu_EF1w&usqp=CAU');
            top.x = 0;
            top.y = 0;
            top.scaleX = 3.41;
            top.scaleY = 2.05;
            background.addChild(top);
            
            

            
            
            var circle;
            for(var i=0;i<75;i++) {
            circle = draw.circle(1,'lightgrey','white',1);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            }
            

            
            var under = draw.bitmap('data:image/jpeg;base64,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');
            under.x = 0;
            under.y = 352;
            under.scaleX = 3.41;
            under.scaleY = 2.1;
            background.addChild(under);
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<6;++i) {
            var buildingHeight = Math.random() * 200;
            var building = draw.rect(75,buildingHeight,'dimGrey','Black',1);
            building.x = 200*i;
            building.y = groundY-buildingHeight;
            background.addChild(building);
            buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('https://pics.clipartpng.com/midle/Cartoon_Tree_PNG_Clip_Art-1092.png');
            tree.x = 250;
            tree.y = 225;
            tree.scaleX = 0.25;
            tree.scaleY = 0.25;
            background.addChild(tree);
            
            cloud = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG32.png');
            cloud.x = 650;
            cloud.y = 40;
            cloud.scaleX = 0.2;
            cloud.scaleY = 0.2;
            background.addChild(cloud);
            
            cloud2 = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG30.png');
            cloud2.x = 380;
            cloud2.y = 60;
            cloud2.scaleX = 0.3;
            cloud2.scaleY = 0.3;
            background.addChild(cloud2);
            
            cloud3 = draw.bitmap('http://pngimg.com/uploads/cloud/cloud_PNG13.png');
            cloud3.x = 200;
            cloud3.y = 20;
            cloud3.scaleX = 0.2;
            cloud3.scaleY = 0.2;
            background.addChild(cloud3);
            
            moon = draw.bitmap('img/moon.png');
            moon.x = 10;
            moon.y = 25;
            moon.scaleX = 0.25;
            moon.scaleY = 0.25;
            background.addChild(moon);
            
            sun = draw.bitmap('http://pngimg.com/uploads/sun/sun_PNG13449.png');
            sun.x = 880;
            sun.y = 13;
            sun.scaleX = 0.55;
            sun.scaleY = 0.55;
            background.addChild(sun);
            

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            
            var groundY = ground.y;
            tree.x = tree.x - 1;
            if(tree.x < -200) {
            tree.x = canvasWidth;
            }
            cloud3.x = cloud3.x - 0.06;
            if(cloud3.x < -200) {
            cloud3.x = canvasWidth;
            }
            cloud.x = cloud.x - 0.045;
            if(cloud.x < -200) {
            cloud.x = canvasWidth;
            }
            cloud2.x = cloud2.x - 0.10;
            if(cloud2.x < -200) {
            cloud2.x = canvasWidth;
            }
            moon.x = moon.x - 0.01;
            if(moon.x < -200) {
            moon.x = canvasWidth;
            }
            sun.x = sun.x - 0.01;
            if(sun.x < -200) {
            sun.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Move the tree!
            
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
            var building = buildings[i];
            
            building.x = building.x - 0.5;
            if(building.x < -200) {
                building.x = canvasWidth;
            }
            }

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
