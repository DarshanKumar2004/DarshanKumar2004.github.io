/* global $, sessionStorage */

$(document).ready(runProgram); 
// wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
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
  //snake stuff
  var snakeArray = [head, tail];

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   
  // execute newFrame every 0.0166 seconds (60 Frames per second)

  $(document).on('keydown', handleKeyDown);                           
  // change 'eventType' to the type of event you want to handle

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
  $(".body").remove();

  function newFrame() {
    repositionHead();
    redrawSnake();
    doCollide();
    border();
    scoreDisplay();
    follow();
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

  function redrawSnake() {
    if (points > -1) {
      for (var i = snakeArray.length-1; i >= 0; i--) {
        $(snakeArray[i].id).css("left", snakeArray[i].x);
        $(snakeArray[i].id).css("top", snakeArray[i].y);
      }
    }  
  }

  function addNewBodyToSnake() {
        var newID = "body" + snakeArray.length;
        $('<div>').attr('id', newID).appendTo("#board").addClass('body');
        var newBody = itemCreationBody("#" + newID);
        newBody.x = snakeArray[snakeArray.length-1].x;
        newBody.y = snakeArray[snakeArray.length-1].y;
        $("#" + newID).css("left", newBody.x);
        $("#" + newID).css("top", newBody.y);
        snakeArray.push(newBody);
        console.log(newID);
    }

  function follow() {
    for (var i = snakeArray.length - 1; i >= 1; i--) {
	    snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
    }
  }

  function border() {
      if (head.y < -1) {
        alert('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.y > 421) {
        alert('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.x < -1) {
        alert('GAME OVER! Your score was ' + points);
        head.x = 100;
        head.y = 100;
        head.speedX = 0;
        head.speedY = 0;
        points = 0;
        repositionApple();
        redrawApple();
      }
      else if (head.x > 421) {
        alert('GAME OVER! Your score was ' + points);
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
        var locationX = Math.ceil(Math.random() * 21) * 20;
        var locationY = Math.ceil(Math.random() * 21) * 20;
        apple.x = locationX;
        apple.y = locationY;
        console.log(apple.x + ' X apple');
        console.log(apple.y + ' Y apple');

        for (var i = 0; i < snakeArray.length; i++){
            if ( doCollideApple(apple, snakeArray[i])){
                repositionApple();
                redrawApple();
                break;
            }
        }
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

  function itemCreationBody(id) {
    var newPiece = {};
    newPiece.id = id;
    newPiece.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    newPiece.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    newPiece.width = $(".body").width();
    newPiece.top = $(".body").height();

    return newPiece
  }

  function doCollideApple(obj1, obj2) {
        if ((obj1).x === (obj2).x && (obj1).y === (obj2).y) {
            console.log("collision detected apple on snake");
            return true;
        }
        else {
            return false;
        }
    }

  function doCollide() {
        appleC = {};
        appleC.leftX = apple.x;
        appleC.rightX = apple.x + apple.width;
        appleC.topY = apple.y;
        appleC.bottomY = apple.y + apple.top;

        headC = {};
        headC.leftX = head.x;
        headC.rightX = head.x + head.width;
        headC.topY =  head.y;
        headC.bottomY = head.y + head.top;
        
        if (((headC.rightX > appleC.leftX) && (headC.leftX < appleC.rightX) && 
            (headC.topY < appleC.bottomY) && (headC.bottomY > appleC.topY))) {
            points++;
            repositionApple();
            redrawApple();
            addNewBodyToSnake();
        }

        for (var i = snakeArray.length - 1; i >= 2; i--) {
            if (head.x === snakeArray[i - 1].x && head.y === snakeArray[i - 1].y && points !== 0) {
                alert('GAME OVER! Your score was ' + points);
                head.x = 100;
                head.y = 100;
                head.speedX = 0;
                head.speedY = 0;
                points = 0;
                repositionApple();
                redrawApple();
                $(".body").remove();
            }
        }
    }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
