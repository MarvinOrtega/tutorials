var keys = document.querySelectorAll(".keypad");
var output = document.querySelector("#output");
var input = document.querySelector("#input");
var arr = ["0","1","2","3","4","5","6","7","8","9"];
var decimal, negative, numerical, aritmethic, leftParenthesis, rightParenthesis, equation, key;
var leftParenthesisCounter = 0;

function resetFunctions() {
	decimal = negative = numerical  = aritmethic = leftParenthesis = rightParenthesis = false;
}

function concatFunctions() {
	decimal = negative = numerical = aritmethic = leftParenthesis = rightParenthesis = true;
}

function lockFunctions() {
	decimal = negative = numerical = aritmethic = leftParenthesis = rightParenthesis = "invalid";
 }

function digitalLimit() {
	output.textContent = "";
	input.textContent = "Digit Limit Met. Press CE.";
	lockFunctions();
}

function concatOutput() {
	output.textContent = output.textContent + key;
	input.textContent = input.textContent + key;
}

function writeEquation() {
	input.textContent = input.textContent + key;
}

function newOutput() {
	output.textContent = key;
	input.textContent = input.textContent + key;
}

resetFunctions();

for(var i = 0; i < keys.length; i++) {
	keys[i].addEventListener("click",function() {

		key = this.value;

		if(input.textContent.toString().length > 20 || output.textContent.length > 10) {
				digitalLimit();
		}

		if(key == "CE") {
			input.textContent = output.textContent = equation = "";
			resetFunctions();
			aritmethic = "invalid";
		}

		else if((key == ".") && (decimal == false)) {
			output.textContent = "0.";
			input.textContent = "0.";
			lockFunctions();
			numerical = true;
		}

		else if((key == ".") && (decimal == true)) {
			newOutput();
			lockFunctions();
			numerical = true;
		}

		else if ((key == "+" || key == "-" || key == "÷" || key == "x") && (aritmethic == true)) {
			writeEquation();
			resetFunctions();
			aritmethic = "invalid";
			decimal = true;
		}

		else if ((key == "(") && (leftParenthesis != "invalid")) {
			writeEquation();
			resetFunctions();
			aritmethic = rightParenthesis = "invalid";
			leftParenthesis = true;
			leftParenthesisCounter ++;
		}

		else if ((key == ")") && (rightParenthesis != "invalid") && (leftParenthesisCounter > 0)) {
			writeEquation();
			resetFunctions();
			aritmethic = true;
			leftParenthesis = rightParenthesis = "invalid";
			leftParenthesisCounter --;
		}

		else if((key == "+/-") && (negative == false) && (numerical == false)) {
			input.textContent = input.textContent + " -";
			output.textContent = "-";
			lockFunctions();
			numerical = decimal = true;
		}

		else if((key == "+/-") && (negative != false)) {
			negative = "invalid";
		}

		else if((arr.indexOf(key) !== -1) && (numerical == false)) {
			newOutput();
			concatFunctions();
			leftParenthesis = negative = "invalid";
			rightParenthesis = false;
		}

		else if((arr.indexOf(key) !== -1) && (numerical == true)) {
			concatOutput();
			concatFunctions();
			leftParenthesis = negative = "invalid";
			rightParenthesis = false;
		}

		else if(key == "=") {
			equation = input.textContent.replace(/x/g, '*').replace(/÷/g, '/').replace(/^0/,'');
			input.textContent = output.textContent = +(eval(equation,10)).toFixed(5);
			lockFunctions();
			aritmethic = true;
		}
	})
}
