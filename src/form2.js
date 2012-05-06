/*
	Class that inherit from the Form abstract class
*/
function Form2(x, y, direction) { Form.call(this, x, y, direction); }
Form2.prototype = new Form();
Form2.prototype.constructor = Form2;

/*
	Abstract Method Implementation
	Generate squares of the form depend on the position and direction
*/
Form2.prototype.FillSquares = function(x, y) {
	var color = "red";
	this.Squares = [
		{x:x, y:y, color:color},
		{x:x+1, y:y, color:color},
		{x:x, y:y+1, color:color},
		{x:x+1, y:y+1, color:color}
	];	
}
