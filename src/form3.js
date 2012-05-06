/*
	Class that inherit from the Form abstract class
*/
function Form3(x, y, direction) { Form.call(this, x, y, direction); }
Form3.prototype = new Form();
Form3.prototype.constructor = Form3;

/*
	Abstract Method Implementation
	Generate squares of the form depend on the position and direction
*/
Form3.prototype.FillSquares = function(x, y) {
	var color = "purple";
	if (this.Direction == 0) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x+1, y:y, color:color},
			{x:x+2, y:y, color:color},
			{x:x+3, y:y, color:color}
		];
	} else if (this.Direction == 1) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y+1, color:color},
			{x:x, y:y+2, color:color},
			{x:x, y:y+3, color:color}
		];
	} else if (this.Direction == 2) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x-1, y:y, color:color},
			{x:x-2, y:y, color:color},
			{x:x-3, y:y, color:color}
		];
	} else if (this.Direction == 3) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y-1, color:color},
			{x:x, y:y-2, color:color},
			{x:x, y:y-3, color:color}
		];
	}
}
