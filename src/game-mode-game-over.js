/*
	Class that inherit from the GameMode abstract class
*/
function GameModeGameOver(game) { GameMode.call(this, game); }
GameModeGameOver.prototype = new GameMode();
GameModeGameOver.prototype.constructor = GameModeGameOver;

/*
	Abstract Method Implementation
*/
GameModeGameOver.prototype.Update = function() {
	if (this.Game.Engine.Keyboard.Enter.IsPress && !this.Game.Engine.Keyboard.Enter.IsBlock) {
		this.Game.Engine.Keyboard.Enter.IsBlock = true;
		this.Game.Restart();
	}
}

/*
	Abstract Method Implementation
	Render the GameOver screen
*/
GameModeGameOver.prototype.Render = function() {
	this.Game.ClearOutput();
	this.Game.Output.beginPath();
	this.Game.Output.fillStyle = "black";
	this.Game.Output.fillText("Game Over", 10, 50);
	this.Game.Output.fillText("Total of your points : " + this.Game.Points, 10, 65);
	this.Game.Output.fillText("Press enter key to play again", 10, 80);
}
