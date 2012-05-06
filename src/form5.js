/*
	Class that inherit from the Form abstract class
*/
function Form5(x, y, direction) { Form.call(this, x, y, direction); }
Form5.prototype = new Form();
Form5.prototype.constructor = Form5;

/*
	Abstract Method Implementation
	Generate squares of the form depend on the position and direction
*/
Form5.prototype.FillSquares = function(x, y) {
	var color = "pink";
	if (this.Direction == 0) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x+1, y:y, color:color},
			{x:x+1, y:y-1, color:color},
			{x:x+2, y:y-1, color:color}
		];
	} else if (this.Direction == 1) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y+1, color:color},
			{x:x+1, y:y+1, color:color},
			{x:x+1, y:y+2, color:color}
		];
	} else if (this.Direction == 2) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x-1, y:y, color:color},
			{x:x-1, y:y+1, color:color},
			{x:x-2, y:y+1, color:color}
		];
	} else if (this.Direction == 3) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y-1, color:color},
			{x:x-1, y:y-1, color:color},
			{x:x-1, y:y-2, color:color}
		];
	}
}
