/*
	Class that inherit from the GameMode abstract class
*/
function GameModeStart(game) { GameMode.call(this, game); }
GameModeStart.prototype = new GameMode();
GameModeStart.prototype.constructor = GameModeStart;

/*
	Abstract Method Implementation
*/
GameModeStart.prototype.Update = function() {
	if (this.Game.Engine.Keyboard.Enter.IsPress && !this.Game.Engine.Keyboard.Enter.IsBlock) {
		this.Game.Engine.Keyboard.Enter.IsBlock = true;
		this.Game.CurrentMode = this.Game.GameMode;
	}
}

/*
	Abstract Method Implementation
*/
GameModeStart.prototype.Render = function() {
	this.Game.ClearOutput();
	this.Game.Output.beginPath();
	this.Game.Output.fillStyle = "black";
	this.Game.Output.fillText("HTML5 Prototype : Tetris", 10, 50);
	this.Game.Output.fillText("By MAGICOLIC", 10, 65);
	this.Game.Output.fillText("Press enter key to play", 10, 90);
}
