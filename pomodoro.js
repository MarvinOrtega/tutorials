var displayMinutes = document.querySelector("#minutes");
var displaySeconds = document.querySelector("#seconds");
var startButton = document.querySelector("#Start");
var stopButton = document.querySelector("#Stop");
var resetButton = document.querySelector("#Reset");
var focusTime = document.querySelector("#focusTime");
var breakTime = document.querySelector("#breakTime");
var focusAddButton = document.querySelector("#focusAdd");
var focusMinusButton = document.querySelector("#focusMinus");
var breakAddButton = document.querySelector("#breakAdd");
var breakMinusButton = document.querySelector("#breakMinus");
var interval;
var breakSwitch = false;

//Focus and break time buttons

focusAddButton.addEventListener("click",function() {
	focusTime.textContent = Number(focusTime.textContent) + 1;
});

focusMinusButton.addEventListener("click",function() {
	if(focusTime.textContent > 1) {
		focusTime.textContent = Number(focusTime.textContent) - 1;
	}
});

breakAddButton.addEventListener("click",function() {
	breakTime.textContent = Number(breakTime.textContent) + 1;
});

breakMinusButton.addEventListener("click",function(){
	if(breakTime.textContent > 1) {
		breakTime.textContent = Number(breakTime.textContent) - 1;
	}
});

//start, stop and reset buttons

stopButton.addEventListener("click",stopInterval);

resetButton.addEventListener("click",function() {
	stopInterval();
	resetInterval();
	twoDigitMinutes();
});

function stopInterval() {
	startButton.removeAttribute("disabled");
	removeInterval();
}

function removeInterval() {
	clearInterval(interval);
	interval = "";
}

function resetInterval() {
	displayMinutes.textContent = focusTime.textContent;
	twoDigitMinutes();
	displaySeconds.textContent = "00";
	breakSwitch = false;
}

function twoDigitMinutes(){
	if(displayMinutes.textContent < 10) {
		displayMinutes.textContent = "0" + Number(displayMinutes.textContent);
	}
}

startButton.addEventListener("click", countdown);

function countdown() {
	interval = setInterval(function() {
		startButton.setAttribute("disabled",true);

		if(displayMinutes.textContent == 0 && displaySeconds.textContent == 0 && breakSwitch == false) {
			removeInterval();
			displayMinutes.textContent = breakTime.textContent;
			twoDigitMinutes();
			displaySeconds.textContent = "00";
			breakSwitch = true;
			countdown();
		}

		else if(displayMinutes.textContent == 0 && displaySeconds.textContent == 0 && breakSwitch == true){
			displayMinutes.textContent = "00";
			displaySeconds.textContent = "00";
			stopInterval();
			resetInterval();
		}

		else if(displaySeconds.textContent == 0) {
			displaySeconds.textContent = 59;
			displayMinutes.textContent = displayMinutes.textContent - 1;
			twoDigitMinutes();
		}

		else if(displaySeconds.textContent <= 10) {
			displaySeconds.textContent = "0" + (displaySeconds.textContent -1);
		}

		else{
				displaySeconds.textContent = displaySeconds.textContent -1;
			}

	},1000)

// check this --> https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

}
