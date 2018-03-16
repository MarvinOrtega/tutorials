var sequenceHolder = [];
var sequence = [];
var clicked = [];
var counter = document.querySelector("#counter");
var selections = document.querySelectorAll(".selection");
var start = document.querySelector("#start");
var next = document.querySelector("#next");
var status = document.querySelector("#state");
var mode =document.querySelector("#mode");
var resetButton = document.querySelector("#reset");
var clickCount = 0;
var displayCount = 0;
var displayInterval;
var timerInterval;
var audio = document.querySelector("#audio");

reset();
disableSelections();

resetButton.addEventListener("click",reset);

start.addEventListener("click",function() {
	if((mode.checked == true && sequenceHolder.length >= 0) || (mode.checked == false && sequenceHolder.length == 0)) {
		reset();
		mode.setAttribute("disabled",true);
		start.setAttribute("disabled",true);
		createSeries();
		addSequence();
		highlightLoop();
	}

	else if(mode.checked == false && sequenceHolder.length > 0){
		endDisplay();
		clicked = [];
		displayCount = 0;
		clickCount = 0;
		mode.setAttribute("disabled",true);
		start.setAttribute("disabled",true);
		highlightLoop();
	}

});

next.addEventListener("click",function(){
	endTimer();
	clicked = [];
	displayCount = 0;
	clickCount = 0;
	mode.setAttribute("disabled",true);
	start.setAttribute("disabled",true);
	counter.textContent = Number(counter.textContent) + 1;
	addSequence();
	highlightLoop();
});

for(var i = 0; i < selections.length; i ++){
	selections[i].addEventListener("click",function(){
		playAudio();
		endTimer();
		var key = this.value;
		clicked.push(key);
		setTimeout(function(){
			compare();
		},500);

	});
}

function createSeries() {
	sequenceHolder = [];
	for(var i = 0; i < 20; i++){
		sequenceHolder.push(Math.floor(Math.random() *(5 - 1) + 1));
	}
}

function addSequence() {
	sequence.push(sequenceHolder[counter.textContent-1]);
}

function highlightLoop() {
	disableSelections();
	next.setAttribute("disabled",true);
	displayInterval = setInterval(function(){
		if(displayCount < sequence.length){
			highlightButton(displayCount);
			displayCount++;
		}
		else{
			endDisplay();
			enableSelections();
			startTimer();
	    }
	},1200);
}

function highlightButton(num){
	document.querySelector('input[name="' + sequence[num]  + '"]').classList.add('textBold');
	playAudio();
	setTimeout(function(){
		document.querySelector('input[name="' + sequence[num]  + '"]').classList.remove('textBold');
	},200);
}

function compare(){
	if((clickCount == 20) && (sequence.length == 20) && (clicked[clickCount] == sequence[clickCount]))
	{
		endGame();
		alert("You win!");
	}

	else if(( clickCount >= sequence.length) || (clicked[clickCount] != sequence[clickCount])){
	  loseGame();
	  next.setAttribute("disabled",true);
	  mode.removeAttribute("disabled");
	  disableSelections();
	  endTimer();
	}

	else if((clickCount < sequence.length) && (clicked[clickCount] == sequence[clickCount])){
	    if(clickCount + 1 == sequence.length){
	    	alert("Press Next");
	    	disableSelections();
	    	endTimer();
	    	next.removeAttribute("disabled");
	    	clickCount++;
	    }
	    else{
	    	startTimer();
	    	clickCount++;
	    }

	  }
}

function disableSelections(){
	for (var i = 0; i < selections.length; i++){
	    selections[i].setAttribute("disabled",true);
	}
}

function enableSelections(){
	for (var i = 0; i < selections.length; i++){
	    selections[i].removeAttribute("disabled");
	}
}

function reset(){
	sequenceHolder = [];
	sequence = [];
	clicked = [];
	endDisplay();
	displayCount = 0;
	clickCount = 0;
	counter.textContent = 1;
	endDisplay();
	endGame();
}

function startTimer(){
	timerInterval = setTimeout(function(){
		loseGame();
	},7000);
}

function endTimer(){
	clearTimeout(timerInterval);
	timerInterval = "";
}

function endDisplay(){
	clearInterval(displayInterval);
	displayInterval = "";
}

function loseGame(){
	endGame();
	alert("Wrong sequence. Press Reset or Start");
}

function endGame(){
	next.setAttribute("disabled",true);
	mode.removeAttribute("disabled");
	start.removeAttribute("disabled");
	disableSelections();
	endTimer();
}

function playAudio(){
	setTimeout(function(){
		audio.play();
	},15)
}
