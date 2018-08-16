// Block patterns of all numbers, 1 - red, 0 - black.
var numbers = [ [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],[0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],[1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],[1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],[1,0,1,1,0,1,1,1,1,0,0,1,0,0,1],[1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],[1,1,1,1,0,0,1,1,1,1,0,1,1,1,1],[1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],[1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],[1,1,1,1,0,1,1,1,1,0,0,1,1,1,1] ];
var time = 0;
var interval;
// Indicates whether the clock is currently stopped or not.
var stopped = true;

$(document).ready(function() {
	// Setting color and background color....
	// I am sorry for this, fellow programmers, but I couldn't find a more elegant way to do this... :)
	var style = "<style>";
		style += ".red {background-color : " + config.numberColor + "!important;} ";
		style += "body, .block {background-color:" + config.backgroundColor + ";} ";
		style += ".block {border:1.5px solid " + config.backgroundColor + "; border-left:3px solid " + config.backgroundColor + ";}";
		style += "</style>";
	$("head").append(style);
});
$(window).keypress(function (e) {
	// If a pressed key is "space" 
	if (e.key === ' ' || e.key === 'Spacebar') {
		// If the clock is started, stop it
		if(stopped == false) {
			window.clearInterval(interval);
		} 
		// else, start it
		else {
			interval = setInterval(setClock,10);
		}
	stopped = stopped == false;
	}
	// If it is "0", reset the clock without starting it
	else if(e.keyCode == 48) {
		time = 0;
		setClock();
		window.clearInterval(interval);
		if(config.startAfterReset == false || config.onlyResetIfStopped == true && stopped == true) {
			stopped = true;
		} else {
			interval = setInterval(setClock,10);
			stopped = false;
		}
		// interval = setInterval(setClock,10);
		// 	stopped = false;
	}
})

// Sets a clock
function setClock() {
	$(".number").html(" ");

	// Holds a copy of the current time in milliseconds, used for divisions to change format
	// to minutes : seconds . milliseconds
	var tempTime = time;

	var minutes = ("00" + parseInt(tempTime / 6000).toString() ).substr(-2);
	var seconds = ("00" + parseInt((tempTime - minutes * 6000) / 100).toString() ).substr(-2);
	var miliseconds = ("00" + (tempTime - seconds * 100 - minutes * 6000).toString() ).substr(-2);

	var tempTimeNumber = minutes + seconds + miliseconds;
	var arr = tempTimeNumber.split("");
	// Building new time...
	for (var i = 1; i <= 6; i++) {
		// Holds new number.
		var newNumber = "";
		// Removes current number.
		$(".number" + i).html(" ");
		// Individual blocks creation.
		for(var o = 0; o < 15; o++) {
			newNumber += ' <div class="block';
			// Makes the block red by appending a class if needed.
			if(numbers[arr[i-1]][o] == 1)
				newNumber += ' red';
			newNumber += '">&nbsp;</div>';
		}
		$(".number" + i).append(newNumber);
	}
	time++;
}