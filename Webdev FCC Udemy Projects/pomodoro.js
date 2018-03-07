var displayMinutes = document.querySelector("#minutes");
var displaySeconds = document.querySelector("#seconds");
var startButton = document.querySelector("#Start");
var stopButton = document.querySelector("#Stop");
var resetButton = document.querySelector("#Reset");
var focusTime = document.querySelector("#time");
var breakTime = document.querySelector("#breakTime");
var timeAddButton = document.querySelector("#timeAdd");
var timeMinusButton = document.querySelector("#timeMinus");
var breakAddButton = document.querySelector("#breakAdd");
var breakMinusButton = document.querySelector("#breakMinus");
var interval;
var breakSwitch = 1;

startButton.addEventListener("click", countdown);

stopButton.addEventListener("click",resetInterval);

resetButton.addEventListener("click",function(){
	resetInterval();
	displayMinutes.textContent = focusTime.textContent;
	displaySeconds.textContent = "00";
	breakSwitch = 1;
});

timeAddButton.addEventListener("click",function(){
	focusTime.textContent = Number(focusTime.textContent) + 1;
});

timeMinusButton.addEventListener("click",function(){
	if(focusTime.textContent < 1){
	}
	else {
		focusTime.textContent = Number(focusTime.textContent) - 1;		
	}
});

breakAddButton.addEventListener("click",function(){
	breakTime.textContent = Number(breakTime.textContent) + 1;
});

breakMinusButton.addEventListener("click",function(){
	if(breakTime.textContent < 1){
	}
	else {
		breakTime.textContent = Number(breakTime.textContent) - 1;		
	}
});

function countdown(){
	interval = setInterval(function(){
	startButton.setAttribute("disabled",true);	
	if(displayMinutes.textContent == 0 && displaySeconds.textContent == 0 && breakSwitch == 1){
		clearInterval(interval);
		interval = "";
		breakSwitch = 0;
		displayMinutes.textContent = breakTime.textContent;
		displaySeconds.textContent = "00";
		countdown();
	}

	else if(displayMinutes.textContent == 0 && displaySeconds.textContent == 0 && breakSwitch == 0){
		displayMinutes.textContent = "00";
		displaySeconds.textContent = "00";	
	}

	else if(displaySeconds.textContent == 0){
		displaySeconds.textContent = 59;
		displayMinutes.textContent = displayMinutes.textContent - 1;
	}
		
	else if(displaySeconds.textContent < 11){
		displaySeconds.textContent = "0" + (displaySeconds.textContent -1);
	}

	else{
			displaySeconds.textContent = displaySeconds.textContent -1;		
		}

	},1000)
}

function resetInterval(){
	startButton.removeAttribute("disabled");
	clearInterval(interval);
	interval = "";
}