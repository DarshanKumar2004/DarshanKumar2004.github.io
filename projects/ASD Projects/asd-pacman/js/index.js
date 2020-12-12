/* global $, sessionStorage, getLevel */

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // HTML jQuery Objects
  var $board = $("#board");

  // Constant Variables
  var FPS = 5;
  var BOARD_WIDTH = $board.width();
  var BOARD_HEIGHT = $board.height();
  var SQUARE_SIZE = 20;
  const KEY = {
    "D":40,
    "U":38,
    "L":37,
    "R":39
  }
  
  // other game variables
  var pacmanTimer;  // for starting/stopping the timer that draws new Pacman frames
  var ghostTimer;   // for starting/stopping the timer that draws new ghost frames
  var pacman;       // an Object to manage Pacman's $element and movement/location data
  var redGhost;     // an Object to manage the redGhost's $element and movement/location data
  var level;        // a 2D representation of the level with numbers representing walls, pellets, etc...
  var pelletsEaten; // the number of pellets eaten by Pacman
  var newFrame;

  function startGame() {
    // set initial values for the global variables...
    
    // start the timers to draw new frames
    var timeBetweedNewFrame = 500 / FPS;            // updates very fast
    var timeBetweenPacmanFrames = 1000 / FPS;       // 5 frames per second
    var timeBetweenGhostFrames = 1000 / (FPS - 1);  // 4 frames per second 
    pacmanTimer = setInterval(drawNewPacmanFrame, timeBetweenPacmanFrames);
    ghostTimer = setInterval(drawNewGhostFrame, timeBetweenGhostFrames);
    newFrame = setInterval(drawNewFrame, timeBetweedNewFrame);
  
    // turn on event handlers
    $(document).on('keydown', handleEvent);
  }
  
  function endGame() {
    // stop the timers
    clearInterval(pacmanTimer);
    clearInterval(ghostTimer);
  
    // turn off event handlers
    $(document).off();
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  //called once
  createMaze("level1");
  pacman = itemCreationPiece('#pacman');

  // start the game
  startGame();

  /* 
  * Called once per "tick" of the pacmanTimer. This function should execute the 
  * high-level logic for drawing new frames of Pacman:
  *   
  * - determine where pacman should move to 
  * - if the next location is a wall:
  *   - don't move pacman
  * - otherwise:
  *   - move and redraw pacman
  * - if pacman is in the same location as a pellet:
  *   - "eat" the pellet by removing it from the DOM
  *   - increase the score 
  * - if pacman is in the same location as a ghost:
  *   - end the game!
  */
  function drawNewPacmanFrame() {
    $("#pacman").css("left", pacman.x);
    $("#pacman").css("top", pacman.y);
  }

  /* 
  * Called once per "tick" of the ghostTimer which is slightly slower than 
  * the pacmanTimer. This function should execute the high-level logic for 
  * drawing new frames of the ghosts:
  * 
  * - determine where the ghost should move to (it should never be a wall)
  * - move and redraw the ghost
  */
  function drawNewGhostFrame() {
    //$("#redGhost").css("left", redGhost.x);
    //$("#redGhost").css("top", redGhost.y);
  }

  function drawNewFrame() {
      win();
      //console.log('working');
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// make maze ///////////////////////////////////////////

  function createMaze(lev) {
    var level = getLevel(lev);
    console.log(level);

    for (var j = 0; j < lev.length; j++) {
        console.log('row ' + j);
        for (var i = 0; i < lev.length; i++) {
            console.log('collom ' + i);
            if (lev[j][i] === 0) {
                console.log('pellet detected');                     //pellet code
                var newPiecePellet = $('<div>').class('pellet')
                                        .css('left', i * 20)
                                        .css('top', j * 20)
                                        .css('id', 'piece'+j)
                                        .css('id', 'piece'+i);
            }
            if (lev[j][i] === 1) {
                console.log('wall detected');                       //wall code
                var newPieceWall = $('<div>').class('wall')
                                        .css('left', i * 20)
                                        .css('top', j * 20)
                                        .css('id', 'piece'+j)
                                        .css('id', 'piece'+i);
            }
            if (lev[j][i] === 2) {
                console.log('pacman detected');                     //pacman code
            }
            if (lev[j][i] === 3) {
                console.log('red ghost detected');                  //red ghost code
            }
            if (lev[j][i] === 7) {
                console.log('gate detected');                       //gate code
                var newPieceGate = $('<div>').class('gate')
                                        .css('left', i * 20)
                                        .css('top', j * 20)
                                        .css('id', 'piece'+j)
                                        .css('id', 'piece'+i);
                
            }
            else {
                console.log('empty spot detected');                 //empty code
            }
        }
    }
  }

    ///////////////////////// item creation //////////////////////////////

    function itemCreationPiece(id) {
        var gameItem = {}
        gameItem.id = id;
        gameItem.x = 300 //Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        gameItem.y = 10 //Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        gameItem.width = $(id).width();
        gameItem.top = $(id).height();
        return gameItem;
    }

    ////////////////// other //////////////////////////////

    function scoreDisplay() {
      $('#score').text("Score: " + points);
    }

    function win() {
        if (pelletsEaten === 175) {
            alert("You beat level 1!!!");
            pelletsEaten = 0;
            level++;
        }
    }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// EVENT HELPER FUNCTIONS //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// looking for key touches /////////////////////////////

  function handleEvent(event) {
    if (event.which === KEY.D) {
        console.log('down');
    }
    if (event.which === KEY.U) {
        console.log('up');
    }
    if (event.which === KEY.L) {
        console.log('left');
    }
    if (event.which === KEY.R) {
        console.log('right');
    }
  }
});
