/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  const KEY = {
    "DOWN":40,
    "UP":38,
    "W":87,
    "S":83
  }
  
  // Game Item Objects
  //left paddle
  var pAPositionX = 0;
  var pASpeedX = 0;
  var pAPositionY = 100;
  var pASpeedY = 0;
  //right paddle
  var pBPositionX = 0;
  var pBSpeedX = 0;
  var pBPositionY = 100;
  var pBSpeedX = 0;
  //ball
  var ballPositionX = 0;
  var ballSpeedX = 0;
  var ballPositionY = 130;
  var ballSpeedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //redraw
    redrawLeftPaddle();
    redrawRightPaddle();
    redrawBall();
    //reposition
    repositionLeftPaddle();
    repositionRightPaddle();
    repositionBall();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
        pBSpeedY = 5;
        console.log("key down pressed");
    }
    else if (event.which === KEY.UP) {
        pBSpeedY = -5;
        console.log("key up pressed");
    }
    else if (event.which === KEY.W) {
        pASpeedY = -5;
        console.log("key W pressed");
    }
    else if (event.which === KEY.S) {
        pASpeedY = 5;
        console.log("key S pressed");
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.DOWN) {
        pBSpeedY = 0;
    }
    else if (event.which === KEY.UP) {
        pBSpeedY = 0;
    }
    else if (event.which === KEY.W) {
        pASpeedY = 0;
    }
    else if (event.which === KEY.S) {
        pASpeedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //redraw items
  function redrawLeftPaddle(){
    $("#leftPaddle").css("top", pAPositionY);
  }
  function redrawRightPaddle(){
    $("#rightPaddle").css("top", pBPositionY);
  }
  function redrawBall(){
    $("#ball").css("top", ballPositionY);
  }
  //reposition items
  function repositionLeftPaddle(){
    pAPositionY += pASpeedY;
  }
  function repositionRightPaddle(){
    pBPositionY += pBSpeedY;
  }
  function repositionBall(){
      ballPositionY += ballSpeedY;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
