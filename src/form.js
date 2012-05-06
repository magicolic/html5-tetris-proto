/*
	Abstract Class
	Information and behavior for a form of the game
*/
function Form(x, y, direction) {
	// Array that contain the squares of the form
	this.Squares = [];
	// Integer (0 to 3) that indicate the rotation direction of the form
	this.Direction = direction;
	
	this.FillSquares(x, y);
}

/*
	Abstract Method
	Generate squares of the form depend on the position and direction
*/
Form.prototype.FillSquares = function(x, y) {}

/*
	Change the direction of the form and regenerate the squares
*/
Form.prototype.Rotate = function() {
	this.Direction++;
	if (this.Direction > 3) this.Direction = 0;
	this.FillSquares(this.Squares[0].x, this.Squares[0].y);
}

/*
	Change position of the squares of the form
*/
Form.prototype.Move = function(xMod, yMod) {
	for (var i=0; i<this.Squares.length; i++) {
		this.Squares[i].x = this.Squares[i].x + xMod;
		this.Squares[i].y = this.Squares[i].y + yMod;
	}
}
