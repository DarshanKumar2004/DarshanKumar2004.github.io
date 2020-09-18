		/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////////////////////////////
			//////////////////////////  SETUP  ///////////////////////////////
			//////////////////////////////////////////////////////////////////

            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
            var positionX = 0;
			var speedX = 10;
			var points = 0;

            // Every 50 milliseconds, call the update Function (see below)
			setInterval(update, 50);

			// Every time the box is clicked, call the handleBoxClick Function (see below)
			$('#box').on('click', handleBoxClick);

            //////////////////////////////////////////////////////////////////
			////////////////////////  CORE LOGIC  ////////////////////////////
			//////////////////////////////////////////////////////////////////

            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
				updateHelper();
			}

			/* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
			function handleBoxClick() {
                handleBoxClickHelper();
            }
                

            //////////////////////////////////////////////////////////////////
			////////////////////  HELPER FUNCTIONS  //////////////////////////
			//////////////////////////////////////////////////////////////////

			function handleBoxClickHelper() {
                //increase points
				points += 1;
				$('#box').text(points);
				
                //increase speed
				if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
					speedX -= 3;
				}
				
                //reset position of the box
				positionX = 0;
            }

            function updateHelper() {
                //makes box move
                positionX += speedX;
				$('#box').css("left", positionX);

                //makes box move  backwards if it hits the wall
				if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
				}
            }

			

			

			


		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE