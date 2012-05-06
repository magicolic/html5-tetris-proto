/*
	Class that inherit from the GameMode abstract class
*/
function GameModePause(game) { GameMode.call(this, game); }
GameModePause.prototype = new GameMode();
GameModePause.prototype.constructor = GameModePause;

/*
	Abstract Method Implementation
*/
GameModePause.prototype.Update = function() {
	if (this.Game.Engine.Keyboard.Pause.IsPress && !this.Game.Engine.Keyboard.Pause.IsBlock) {
		this.Game.Engine.Keyboard.Pause.IsBlock = true;
		this.Game.CurrentMode = this.Game.GameMode;
	}
}

/*
	Abstract Method Implementation
*/
GameModePause.prototype.Render = function() {
	this.Game.ClearOutput();
	this.Game.Output.beginPath();
	this.Game.Output.fillStyle = "black";
	this.Game.Output.fillText("Pause", 10, 50);
	this.Game.Output.fillText("Press pause again to continue", 10, 65);
}
