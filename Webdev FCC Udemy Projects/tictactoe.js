var box = [
/*0*/{ num: 0, id: "zero", weight: 0, groupsIndex:[0,1,2] },
/*1*/{ num: 1, id: "one", weight: 0, groupsIndex:[0,3] },
/*2*/{ num: 2, id: "two", weight: 0, groupsIndex:[0,4,5] },
/*3*/{ num: 3, id: "three", weight: 0, groupsIndex:[1,6] },
/*4*/{ num: 4, id: "four", weight: 0, groupsIndex:[2,3,5,6] },
/*5*/{ num: 5, id: "five", weight: 0, groupsIndex:[4,6] },
/*6*/{ num: 6, id: "six", weight: 0, groupsIndex:[1,5,7] },
/*7*/{ num: 7, id: "seven", weight: 0, groupsIndex:[3,7] },
/*8*/{ num: 8, id: "eight", weight: 0, groupsIndex:[2,4,7] },
];

var groups = [
/*0*/{ counter: 0, groupName: ["zero","one","two"], weight: 0 },
/*1*/{ counter: 0, groupName: ["zero","three","six"], weight: 0 },
/*2*/{ counter: 0, groupName: ["zero","four","eight"], weight: 0 },
/*3*/{ counter: 0, groupName: ["one","four","seven"], weight: 0 },
/*4*/{ counter: 0, groupName: ["two","five","eight"], weight: 0 },
/*5*/{ counter: 0, groupName: ["two","four","six"], weight: 0 },
/*6*/{ counter: 0, groupName: ["three","four","five"], weight: 0 },
/*7*/{ counter: 0, groupName: ["six","seven","eight"], weight: 0 },
];

var humanMarker = "X";
var computerMarker = "O";
var block = document.querySelectorAll(".block");
var X = document.querySelector("#X");
var O = document.querySelector("#O");
var start = document.querySelector("#start");
var xOrO = "X";
var turn = 0; // 0 == human; 1 == computer
var clickedBox; // id of clicked box
var unmarkedBoxes = [];
var selectedBoxes = [];
var chosenBox;
var boxGroupsIndex; //box[i].groupsIndex
var filteredGroups = [];
var holder;
var counter = 0;
var winner = null;


X.addEventListener("click",function(){
	humanMarker = "X";
	markerAssign();	
	console.log("Button: X clicked");
});

O.addEventListener("click",function(){
	humanMarker = "O";
	markerAssign();	
	console.log("Button: 0 clicked");
});

start.addEventListener("click",function(){
	turn = randomizer(0,1);
	markerChange();
	start.setAttribute("disabled",true);
	if(turn == 1){
		alert("Computer starts");
		resetVariables();
		console.log("Computer starts");
	}
	else{
		alert("You start");
		console.log("Human starts");
	}
});

function markerAssign(){
	humanMarker == "X" ? computerMarker = "O": computerMarker = "X";
	X.setAttribute("disabled",true);
	O.setAttribute("disabled",true);
	start.removeAttribute("disabled");
	console.log("Computer uses " + computerMarker);
}

function randomizer(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

addClick();

function addClick(){
	for(var i = 0; i < block.length; i++){
		block[i].setAttribute('boxIndex', i);
		block[i].addEventListener("click", function(){
			var boxIndex = Number(this.getAttribute("boxIndex"));
			holder = box[boxIndex];
			if(holder.weight == 0){
				clickedBox = chosenBox = this.id;
				clickBox();
				setTimeout(resetVariables,2000);
			}
		});			
	}
	console.log("EventListener added");	
}

function clickBox(){
	for(var i = 0; i <block.length; i++){
		if(block[i].id == chosenBox){
			clickedBox = block[i].id 
			block[i].textContent = xOrO;
			console.log("clickBox() " + block[i].id);	
		}
	}
	setTimeout(updateBox,150);
}

function updateBox(){
	for(var i = 0; i < box.length; i++){
		if(box[i].id == clickedBox && turn == 0){
			box[i].weight = -5;
			boxGroupsIndex = Array.from(box[i].groupsIndex);
			console.log("updateBox() human " + box[i].weight);
		}
		else if(box[i].id == clickedBox && turn == 1){
			box[i].weight = 5;
			boxGroupsIndex = Array.from(box[i].groupsIndex);
			console.log("updateBox() computer " + box[i].weight);
		}
	}
	setTimeout(updateGroups,150);
}

function updateGroups(){
	for(var i = 0; i < boxGroupsIndex.length; i++){
		if(turn == 0){
			groups[boxGroupsIndex[i]].weight = groups[boxGroupsIndex[i]].weight + (-5);
			groups[boxGroupsIndex[i]].counter+=1;
			counter = counter + 1;
			console.log("updateGroups() human weight " + JSON.stringify(groups[boxGroupsIndex[i]].weight));
			console.log("updateGroups() human counter " + JSON.stringify(groups[boxGroupsIndex[i]].counter));
			if(groups[boxGroupsIndex[i]].weight == (-15)){
				winner = 0;		
				i = boxGroupsIndex;
			}
		}
		else if(turn == 1){
			groups[boxGroupsIndex[i]].weight+=5;
			groups[boxGroupsIndex[i]].counter+=1;
			counter = counter + 1;
			console.log("updateGroups() computer weight " + JSON.stringify(groups[boxGroupsIndex[i]].weight));
			console.log("updateGroups() computer counter " + JSON.stringify(groups[boxGroupsIndex[i]].counter));
			if(groups[boxGroupsIndex[i]].weight == (15)){
				winner = 1;		
				i = boxGroupsIndex;
			}
		}	
	}
	console.log("counter " + counter);
	setTimeout(turnChange,150);
}

function turnChange(){
	if(winner == null && counter != 24){
		turn == 0 ? turn = 1: turn = 0;
		setTimeout(markerChange,150);
		console.log("turnChange() " + turn);		
	}
	else if(winner == null && counter == 24){
		alert("It's a tie!");
		console.log("It's a tie!")
		resetGame();
	}

	else if(winner != null){
		winner == 0 ? (alert("You win!"), resetGame()): (alert("Computer Wins"),resetGame());
		console.log("Winner " + winner);
	} 
}


function markerChange(){
	turn == 0 ? xOrO = humanMarker: xOrO = computerMarker;
	console.log("markerChange() " + xOrO);
}

function resetVariables(){
	if(turn !== null){
		clickedBox = "";
		unmarkedBoxes = [];
		selectedBoxes = [];
		chosenBox = "";
		boxGroupsIndex = [];
		filteredGroups = [];
		console.log("resetVariables() " + (filteredGroups.length));
		setTimeout(iterateBox,150);
	}
}

function iterateBox(){
	for(var i = 0; i < box.length; i++){
		if(box[i].weight == 0){
			unmarkedBoxes.push(box[i].id);
		}
	}
	console.log("iterateBox() " + unmarkedBoxes);
	setTimeout(iterateGroups,150);
}

function iterateGroups(){
	for(var i = 0; i < groups.length; i++){
		if(groups[i].weight == 10) {
			filteredGroups = [];
			filteredGroups.push(Array.from(groups[i].groupName));
			console.log("ALERT! POSITIVE 10!")
			i = groups.length;
		}

		else if(groups[i].weight == (-10)) {
			filteredGroups = [];
			filteredGroups.push(Array.from(groups[i].groupName));
			console.log("ALERT! NEGATIVE 10!")
			i = groups.length;
		}

		else{
			filteredGroups.push(Array.from(groups[i].groupName));
		}
	}
	console.log("iterateGroups() " + filteredGroups.length);
	setTimeout(searchBoxInGroups,150);
}

function searchBoxInGroups(){
	for(var i = 0; i < unmarkedBoxes.length; i++){
		for(var j = 0; j < filteredGroups.length; j++){
			for(var k = 0; k < filteredGroups[j].length; k++){
				if(filteredGroups[j][k].indexOf(unmarkedBoxes[i]) !== -1){
				selectedBoxes.push(unmarkedBoxes[i]);
				}
			}			
		}
	}
	console.log("searchBoxInGroups() " + selectedBoxes.length);
	setTimeout(chooseBox,150);	
}

function chooseBox(){
	chosenBox = selectedBoxes[randomizer(0,selectedBoxes.length -1)];
	console.log("chooseBox() " + chosenBox);
	setTimeout(clickBox,150);
}

function resetGame(){
	for(var i = 0; i < box.length; i++){
		box[i].weight = 0;
		block[i].textContent = "";			
	}
	for(var i = 0; i < groups.length; i++){
		groups[i].weight = 0;
		groups[i].counter = 0;
		console.log("groups var updated");
	}		 
	setTimeout(reset,1000);
}	

function reset(){
	unmarkedBoxes = [];
	selectedBoxes = [];
	boxGroupsIndex = [];
	filteredGroups = [];
	xOrO = "";
	turn = null;
	winner = null;
	holder = "";
	clickedBox = "";
	chosenBox = "";
	counter = 0;
	X.removeAttribute("disabled");
	O.removeAttribute("disabled");
	start.setAttribute("disabled",true);
	console.log("resetGame() " + filteredGroups.length);
}