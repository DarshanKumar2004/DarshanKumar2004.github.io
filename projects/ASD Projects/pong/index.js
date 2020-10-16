/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var BOARD_WIDTH = $('#board').width();
  var BOARD_HEIGHT = $('#board').height();
  const KEY = {
    "DOWN":40,
    "UP":38,
    "W":87,
    "S":83,
    "G":71,
    "H":72,
    "T":84,
    "Y":89,
    "SPACE":32
  }
  
  // Game Item Objects
  //left paddle
  var pAPositionX = 0;
  var pASpeedX = 0;
  var pAPositionY = 100;
  var pASpeedY = 0;
  var pAPoints = 0;
  //right paddle
  var pBPositionX = 0;
  var pBSpeedX = 0;
  var pBPositionY = 100;
  var pBSpeedY = 0;
  var pBPoints = 0;
  //ball
  var ballPositionX = 265;
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
    //boarders
    boarder();
    points();
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
    else if (event.which === KEY.G) {
        ballPositionX -= 5;
        console.log("key G pressed");
    }
    else if (event.which === KEY.H) {
        ballPositionX += 5;
        console.log("key H pressed");
    }
    else if (event.which === KEY.T) {
        ballPositionY -= 5;
        console.log("key T pressed");
    }
    else if (event.which === KEY.Y) {
        ballPositionY += 5;
        console.log("key Y pressed");
    }
    else if (event.which === KEY.SPACE) {
        ballRNG(2);
        ballAngleRNG();
        console.log("key space pressed");
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
        pASpeedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function points() {
    if (ballPositionX <= 0) {
        pBPoints += 1;
        //code bellow makes ball bounce off of left and right wall
        ballSpeedX *= -1;
        console.log("player A has " + pAPoints + " points");
        console.log("boarder hit");
    }
    else if (ballPositionX >= 530) {
        pAPoints += 1;
        //code bellow makes ball bounce off of left and right wall
        ballSpeedX *= -1;
        console.log("player B has " + pBPoints + " points");
        console.log("boarder hit");
    }
  }

  function boarder() {
    if (ballPositionY <= 0) {
        ballSpeedY *= -1;
        console.log("boarder hit");
    }
    else if (ballPositionY >= 280) {
        ballSpeedY *= -1;
        console.log("boarder hit");
    } 
  }

  

  //ball side picker
  function ballRNG(sides) {
    var RNG = Math.ceil(Math.random() * sides);
    if (RNG === 1) {
        //ball goes left
        ballSpeedX -= 3;
        console.log("1 left ball");
    }
    else if (RNG === 2) {
        //ball goes right
        ballSpeedX += 3;
        console.log("2 right ball");
    }
  }

  function ballAngleRNG() {
    var ballAngle = Math.floor(Math.random() * 4);
    console.log("the angle is " + ballAngle);
    if (ballAngle >= 3) {
        ballSpeedY -= ballAngle;
    }
    else if (ballAngle < 3) {
        ballSpeedY += ballAngle;
    }
  }

  //reposition items
  function repositionLeftPaddle(){
    pAPositionY += pASpeedY;
  }
  function repositionRightPaddle(){
    pBPositionY += pBSpeedY;
  }
  function repositionBall(){
      ballPositionX += ballSpeedX;
      ballPositionY += ballSpeedY;
  }

  //redraw items
  function redrawLeftPaddle(){
    $("#leftPaddle").css("top", pAPositionY);
  }
  function redrawRightPaddle(){
    $("#rightPaddle").css("top", pBPositionY);
  }
  function redrawBall(){
    $("#ball").css("left", ballPositionX);
    $("#ball").css("top", ballPositionY);

    //gives ball shadows
    if (ballPositionX === 530 / 2){
        $("#ball").css("box-shadow", "0px 10px 3px rgb(87, 87, 87)")
    }
    else if (ballPositionX < 530 / 2){
        $("#ball").css("box-shadow", "-5px 10px 3px rgb(87, 87, 87)");
    }
    else {
        $("#ball").css("box-shadow", "5px 10px 3px rgb(87, 87, 87)");
    }
  }

  //after this the game ends dont code past this

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
