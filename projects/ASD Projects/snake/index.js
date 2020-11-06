/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 150;
  var KEY = {
    "DOWN":40,
    "RIGHT":39,
    "LEFT":37,
    "UP":38,
  }

  // Game Item Objects
  var head = itemCreation('#head');
  var apple = itemCreation('#apple');
  var tail = itemCreation('#tail');
  var points = 0;
  var snakeArray = [head, body, tail];
  var $body = $("<div>").addClass("body");
  itemCreation($body);

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  //functions called once
  repositionApple();
  redrawApple();

  function newFrame() {
    doCollide();
    repositionHead();
    redrawHead();
    border();
    scoreDisplay();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN && head.speedY !== -20) {
        head.speedY = 20;
        head.speedX = 0;
        console.log("key down pressed");
    }
    else if (event.which === KEY.RIGHT && head.speedX !== -20) {
        head.speedX = 20;
        head.speedY = 0;
        console.log("key right pressed");
    }
    else if (event.which === KEY.LEFT && head.speedX !== 20) {
        head.speedX = -20;
        head.speedY = 0
        console.log("key left pressed");
    }
    else if (event.which === KEY.UP && head.speedY !== 20) {
        head.speedY = -20;
        head.speedX = 0;
        console.log("key up pressed");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionHead() {
      head.x += head.speedX;
      head.y += head.speedY;
  }

  function redrawHead() {
      $("#head").css("left", head.x);
      $("#head").css("top", head.y);
  }

  function border() {
      if (head.y < -1) {
        prompt('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.y > 421) {
        prompt('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.x < -1) {
        prompt('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.x > 421) {
        prompt('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
  }

  function repositionApple() {
    var locationX = Math.ceil(Math.random() * 21);
    var locationY = Math.ceil(Math.random() * 21);
    apple.x = locationX * 20;
    apple.y = locationY * 20;
    console.log(apple.x + ' X apple');
    console.log(apple.y + ' Y apple');
    }

  function redrawApple() {
      $("#apple").css("left", apple.x);
      $("#apple").css("top", apple.y);
  }

  function scoreDisplay() {
      $('#score').text("Score: " + points);
  }

  function itemCreation(id){
    var gameItem = {}
    gameItem.id = id;
    gameItem.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    gameItem.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    gameItem.width = $(id).width();
    gameItem.top = $(id).height();
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    
    return gameItem;
  }

  function doCollide() {
    headC = {};
    headC.leftX = head.x;
    headC.rightX = head.x + head.width;
    headC.topY =  head.y;
    headC.bottomY = head.y + head.top;

    appleC = {};
    appleC.leftX = apple.x;
    appleC.rightX = apple.x + apple.width;
    appleC.topY =  apple.y;
    appleC.bottomY = apple.y + apple.top;

    bodyC = {};
    bodyC.leftX = body.x;
    bodyC.rightX = body.x + body.width;
    bodyC.topY =  body.y;
    bodyC.bottomY = body.y + body.top;

    tail = {};
    tail.leftX = tail.x;
    tail.rightX = tail.x + tail.width;
    tail.topY =  tail.y;
    tail.bottomY = tail.y + tail.top;

    if (((headC.rightX > appleC.leftX) && (headC.leftX < appleC.rightX) && (headC.topY < appleC.bottomY) && (headC.bottomY > appleC.topY))) {
        points++;
        repositionApple();
        redrawApple();
        console.log("collision detected");
        console.log(points);
    }
  }

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
