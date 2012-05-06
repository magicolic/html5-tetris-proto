/*
	Abstract Class
	Information and behavior for an game mode
*/
function GameMode(game) {
	this.Game = game;
}

/*
	Abstract Method
	Update game object, check user input, etc...
*/
GameMode.prototype.Update = function() {}

/*
	Abstract Method
	Render game on the output canvas
*/
GameMode.prototype.Render = function() {}
