/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 10 / 60;
  var KEY = {
    "DOWN":40,
    "RIGHT":39,
    "LEFT":37,
    "UP":38,
  }
  
  // Game Item Objects
  var headX = 0;
  var headY = 0;
  var headSpeedX = 0;
  var headSpeedY = 0;
  var appleX;
  var appleY;
  var score = 0


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
    repositionHead();
    redrawHead();
    border();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
        headSpeedY = 0.7;
        headSpeedX = 0;
        console.log("key down pressed");
    }
    else if (event.which === KEY.RIGHT) {
        headSpeedX = 0.7;
        headSpeedY = 0;
        console.log("key right pressed");
    }
    else if (event.which === KEY.LEFT) {
        headSpeedX = -0.7;
        headSpeedY = 0
        console.log("key left pressed");
    }
    else if (event.which === KEY.UP) {
        headSpeedY = -0.7;
        headSpeedX = 0;
        console.log("key up pressed");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionHead() {
      headX += headSpeedX;
      headY += headSpeedY
  }

  function redrawHead() {
      $("#head").css("left", headX);
      $("#head").css("top", headY);
  }

  function border() {
      if (headY < -1) {
        prompt('GAME OVER! Your score was ' + score);
        headX = 0;
        headY = 0;
        headSpeedX = 0;
        headSpeedY = 0;
        score = 0;
      }
      else if (headY > 421) {
        prompt('GAME OVER! Your score was ' + score);
        headX = 0;
        headY = 0;
        headSpeedX = 0;
        headSpeedY = 0;
        score = 0;
      }
      else if (headX < -1) {
        prompt('GAME OVER! Your score was ' + score);
        headX = 0;
        headY = 0;
        headSpeedX = 0;
        headSpeedY = 0;
        score = 0;
      }
      else if (headX > 421) {
        prompt('GAME OVER! Your score was ' + score);
        headX = 0;
        headY = 0;
        headSpeedX = 0;
        headSpeedY = 0;
        score = 0;
      }
  }

  function repositionApple() {
    var locationX = Math.random(22) * 440;
    var locationY = Math.random(22) * 440;
    console.log(location);
    appleX = locationX;
    appleY = locationY;
    }

  function redrawApple() {
      $("#apple").css("left", appleX);
      $("#apple").css("top", appleY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
