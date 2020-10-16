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
    //check for winner
    winner();
    //paddle boarders
    leftPaddleBorder();
    rightPaddleBorder();
    //boarders
    border();
    points();
    //redraw
    redrawLeftPaddle();
    redrawRightPaddle();
    redrawBall();
    //reposition
    repositionLeftPaddle();
    repositionRightPaddle();
    repositionBall();
    //instructions
    gameInstructions()
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
        ballRNG();
        ballAngleRNG();
        $('#winnerIs').text("");
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
        pAPoints += 1;
        //resets ball to center
        ballPositionX = 265;
        ballPositionY = 130;
        ballSpeedX = 0;
        ballSpeedY = 0;
        //displays score
        $('#playerAScore').text(pAPoints);
        //code bellow makes ball bounce off of left and right wall
        //ballSpeedX *= -1;
        console.log("player A has " + pAPoints + " points");
        console.log("boarder hit");
    }
    else if (ballPositionX >= 530) {
        pBPoints += 1;
        //resets ball to center
        ballPositionX = 265;
        ballPositionY = 130;
        ballSpeedX = 0;
        ballSpeedY = 0;
        //displays score
        $('#playerBScore').text(pBPoints);
        //code bellow makes ball bounce off of left and right wall
        //ballSpeedX *= -1;
        console.log("player B has " + pBPoints + " points");
        console.log("boarder hit");
    }
  }

  function border() {
    if (ballPositionY <= 0) {
        ballSpeedY *= -1;
        console.log("boarder hit");
    }
    else if (ballPositionY >= 280) {
        ballSpeedY *= -1;
        console.log("boarder hit");
    } 
  }

  function leftPaddleBorder() {
    if (pAPositionY <= 0) {
        pAPositionY = 1;
        //console.log("left paddle hit the top border");
    }
    else if (pAPositionY >= 220) {
        pAPositionY = 219;
        //console.log("left paddle hit the bottom border");
    }
  }

  function rightPaddleBorder() {
    if (pBPositionY <= 0) {
        pBPositionY = 1;
        //console.log("right paddle hit top border");
    }
    else if (pBPositionY >= 220) {
        pBPositionY = 219;
        //console.log("right paddle hit bottom border");
    }
  }

  //ball side picker
  function ballRNG() {
    var RNG = Math.ceil(Math.random() * 2);
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
    var ballAngle = Math.floor(Math.random() * 6);
    console.log("the angle is " + ballAngle);
    if (ballAngle >= 4) {
        ballSpeedY -= ballAngle;
    }
    else if (ballAngle <= 3) {
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

  function winner() {
      if (pAPoints === 11) {
        //A wins left team
        pAPoints = 0;
        pBPoints = 0;
        ballPositionX = 265;
        ballPositionY = 130;
        ballSpeedX = 0;
        ballSpeedY = 0;
        console.log('winner is player A/left team');
        $('#playerAScore').text(pAPoints);
        $('#playerBScore').text(pBPoints);
        $('#winnerIs').text("Player B WON!!!");
      }
      else if (pBPoints === 11) {
        //B wins right team
        pAPoints = 0;
        pBPoints = 0;
        ballPositionX = 265;
        ballPositionY = 130;
        ballSpeedX = 0;
        ballSpeedY = 0;
        console.log('winner is player B/right team');
        $('#playerAScore').text(pAPoints);
        $('#playerBScore').text(pBPoints);
        $('#winnerIs').text("Player A WON!!!");
      }
  }

  function gameInstructions() {
    $('#instructions').text("Player A is the Left side and Player B is the right side. Player A's controlles are W and S. Player B's controles are the Up and Down Arrows. Additional controlles are T, Y, G and H. These where here for developer testing purposes. T and Y move the ball up and down. G and H move the ball left and right. To START the game press the  Space bar. The first to 11 points wins. Good Luck!");
  }

  //after this the game ends dont code past this

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
