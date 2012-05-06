/*
	Class that inherit from the Form abstract class
*/
function Form6(x, y, direction) { Form.call(this, x, y, direction); }
Form6.prototype = new Form();
Form6.prototype.constructor = Form6;

/*
	Abstract Method Implementation
	Generate squares of the form depend on the position and direction
*/
Form6.prototype.FillSquares = function(x, y) {
	var color = "yellow";
	if (this.Direction == 0) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x+1, y:y, color:color},
			{x:x+1, y:y+1, color:color},
			{x:x+1, y:y+2, color:color}
		];
	} else if (this.Direction == 1) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y+1, color:color},
			{x:x-1, y:y+1, color:color},
			{x:x-2, y:y+1, color:color}
		];
	} else if (this.Direction == 2) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x-1, y:y, color:color},
			{x:x-1, y:y-1, color:color},
			{x:x-1, y:y-2, color:color}
		];
	} else if (this.Direction == 3) {
		this.Squares = [
			{x:x, y:y, color:color},
			{x:x, y:y-1, color:color},
			{x:x+1, y:y-1, color:color},
			{x:x+2, y:y-1, color:color}
		];
	}
}
