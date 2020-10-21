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
  var paddleLeft = itemCreation("#leftPaddle");
  //right paddle
  var paddleRight = itemCreation("#rightPaddle");
  //ball
  var ball = itemCreation("#ball");

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
    //check for collisions
    doCollide();
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
        paddleRight.speedY = 5;
        console.log("key down pressed");
    }
    else if (event.which === KEY.UP) {
        paddleRight.speedY = -5;
        console.log("key up pressed");
    }
    else if (event.which === KEY.W) {
        paddleLeft.speedY = -5;
        console.log("key W pressed");
    }
    else if (event.which === KEY.S) {
        paddleLeft.speedY = 5;
        console.log("key S pressed");
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
        paddleRight.speedY = 0;
    }
    else if (event.which === KEY.UP) {
        paddleRight.speedY = 0;
    }
    else if (event.which === KEY.W) {
        paddleLeft.speedY = 0;
    }
    else if (event.which === KEY.S) {
        paddleLeft.speedY = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //colisions
    function doCollide(paddleL, paddleR, ballC) {
    //left paddle
    paddleL = {};
    paddleL.leftX = paddleLeft.x;
    paddleL.rightX = paddleLeft.x + paddleLeft.width;
    paddleL.topY =  paddleLeft.y;
    paddleL.bottomY = paddleLeft.y + paddleLeft.top;
    //right paddle
    paddleR = {};
    paddleR.leftX = paddleRight.x;
    paddleR.rightX = paddleRight.x + paddleRight.width;
    paddleR.topY =  paddleRight.y;
    paddleR.bottomY = paddleRight.y + paddleRight.top;
    //ball
    ballC = {};
    ballC.leftX = ball.x;
    ballC.rightX = ball.x + ball.width;
    ballC.topY = ball.y;
    ballC.bottomY = ball.y + ball.top;

    //collision detection
    if (((paddleL.rightX > ballC.leftX) && (paddleL.leftX < ballC.rightX) && (paddleL.topY < ballC.bottomY) && (paddleL.bottomY > ballC.topY)) || ((paddleR.rightX > ballC.leftX) && (paddleR.leftX < ballC.rightX) && (paddleR.topY < ballC.bottomY) && (paddleR.bottomY > ballC.topY))) {
        ball.speedX *= -1;
        console.log("collision detected");
    }
  }
  
  function points() {
    if (ball.x <= 0) {
        paddleLeft.points += 1;
        //resets ball to center
        ball.x = 265;
        ball.y = 130;
        ball.speedX = 0;
        ball.speedY = 0;
        //displays score
        $('#playerAScore').text(paddleLeft.points);
        //code bellow makes ball bounce off of left and right wall
        //ballSpeedX *= -1;
        console.log("player A has " + paddleLeft.points + " points");
        console.log("boarder hit");
    }
    else if (ball.x >= 530) {
        paddleRight.points += 1;
        //resets ball to center
        ball.x = 265;
        ball.y = 130;
        ball.speedX = 0;
        ball.speedY = 0;
        //displays score
        $('#playerBScore').text(paddleRight.points);
        //code bellow makes ball bounce off of left and right wall
        //ballSpeedX *= -1;
        console.log("player B has " + paddleRight.points + " points");
        console.log("boarder hit");
    }
  }

  function border() {
    if (ball.y <= 0) {
        ball.speedY *= -1;
        console.log("boarder hit");
    }
    else if (ball.y >= 280) {
        ball.speedY *= -1;
        console.log("boarder hit");
    } 
  }

  function leftPaddleBorder() {
    if (paddleLeft.y <= 0) {
        paddleLeft.y = 1;
        //console.log("left paddle hit the top border");
    }
    else if (paddleLeft.y >= 220) {
        paddleLeft.y = 219;
        //console.log("left paddle hit the bottom border");
    }
  }

  function rightPaddleBorder() {
    if (paddleRight.y <= 0) {
        paddleRight.y = 1;
        //console.log("right paddle hit top border");
    }
    else if (paddleRight.y >= 220) {
        paddleRight.y = 219;
        //console.log("right paddle hit bottom border");
    }
  }

  //ball side picker
  function ballRNG() {
    var RNG = Math.ceil(Math.random() * 2);
    if (RNG === 1) {
        //ball goes left
        ball.speedX -= 3;
        console.log("left ball");
    }
    else if (RNG === 2) {
        //ball goes right
        ball.speedX += 3;
        console.log("right ball");
    }
  }

  function ballAngleRNG() {
    var ballAngle = Math.floor(Math.random() * 6);
    console.log("the angle is " + ballAngle);
    if (ballAngle >= 4) {
        ball.speedY -= ballAngle;
    }
    else if (ballAngle === 0) {
        ball.speedY -= 4;
    }
    else if (ballAngle <= 3) {
        ball.speedY += ballAngle;
    }
  }

  //reposition items
  function repositionLeftPaddle(){
    paddleLeft.y += paddleLeft.speedY;
  }
  function repositionRightPaddle(){
    paddleRight.y += paddleRight.speedY;
  }
  function repositionBall(){
      ball.x += ball.speedX;
      ball.y += ball.speedY;
  }

  //redraw items
  function redrawLeftPaddle(){
    $("#leftPaddle").css("top", paddleLeft.y);
  }
  function redrawRightPaddle(){
    $("#rightPaddle").css("top", paddleRight.y);
  }
  function redrawBall(){
    $("#ball").css("left", ball.x);
    $("#ball").css("top", ball.y);

    //gives ball shadows
    if (ball.x === 530 / 2){
        $("#ball").css("box-shadow", "0px 10px 3px rgb(87, 87, 87)")
    }
    else if (ball.x < 530 / 2){
        $("#ball").css("box-shadow", "-5px 10px 3px rgb(87, 87, 87)");
    }
    else {
        $("#ball").css("box-shadow", "5px 10px 3px rgb(87, 87, 87)");
    }
  }

  function winner() {
      if (paddleLeft.points === 11) {
        //A wins left team
        paddleLeft.points = 0;
        paddleRight.points = 0;
        ball.x = 265;
        ball.y = 130;
        ball.speedX = 0;
        ball.speedY = 0;
        console.log('winner is player A/left team');
        $('#playerAScore').text(paddleLeft.points);
        $('#playerBScore').text(paddleRight.points);
        $('#winnerIs').text("Player A WON!!!");
      }
      else if (paddleRight.points === 11) {
        //B wins right team
        paddleRight.points = 0;
        paddleLeft.points = 0;
        ball.x = 265;
        ball.y = 130;
        ball.speedX = 0;
        ball.speedY = 0;
        console.log('winner is player B/right team');
        $('#playerAScore').text(paddleLeft.points);
        $('#playerBScore').text(paddleRight.points);
        $('#winnerIs').text("Player B WON!!!");
      }
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
    gameItem.points = 0;
    
    return gameItem;
  }

  function gameInstructions() {
    $('#instructions').text("Player A is the Left side and Player B is the right side. Player A's controlles are W and S. Player B's controles are the Up and Down Arrows. To START the game press the  Space bar. The first to 11 points wins. Good Luck!");
  }

  //after this the game ends dont code past this

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
