/*
	Class that inherit from the GameMode abstract class
*/
function GameModeGame(game) { 
	GameMode.call(this, game); 
	this.Counter = 0;
	this.LeftFlag = 0;
	this.RightFlag = 0;
}
GameModeGame.prototype = new GameMode();
GameModeGame.prototype.constructor = GameModeGame;

/*
	Abstract Method Implementation
*/
GameModeGame.prototype.Update = function() {
	this.Counter++;
	
	// Check if the user want to pause game
	if (this.Game.Engine.Keyboard.Pause.IsPress && !this.Game.Engine.Keyboard.Pause.IsBlock) {
		this.Game.Engine.Keyboard.Pause.IsBlock = true;
		this.Game.CurrentMode = this.Game.PauseMode;
		return;
	}
	
	// Check if we need a new DownForm
	if (this.Game.DownForm == null) {
		this.Game.CreateRandomDownForm();
	}
	
	// Check if we need to rotate the DownForm
	if (this.Game.Engine.Keyboard.Space.IsPress && !this.Game.Engine.Keyboard.Space.IsBlock) {
		this.Game.Engine.Keyboard.Space.IsBlock = true;
		this.Game.RotateDownForm();
	}
	
	// Calculate the move that we can do on this tick
	var xMod = 0;
	var yMod = 0;
	if (this.Game.Engine.Keyboard.Left.IsPress && !this.Game.Engine.Keyboard.Left.IsBlock) {
		this.Game.Engine.Keyboard.Left.IsBlock = true;
		this.LeftFlag = 1;
	}
	if (this.Game.Engine.Keyboard.Right.IsPress && !this.Game.Engine.Keyboard.Right.IsBlock) {
		this.Game.Engine.Keyboard.Right.IsBlock = true;
		this.RightFlag = 1;
	}
	if (this.Counter % 30 == 0) yMod = 1;
	if (this.Counter % 15 == 0) {
		if (this.Game.Engine.Keyboard.Down.IsPress) yMod = 1;
		if (this.Game.Engine.Keyboard.Left.IsPress || this.LeftFlag == 1) xMod--;
		if (this.Game.Engine.Keyboard.Right.IsPress || this.RightFlag == 1) xMod++;
		this.LeftFlag = 0;
		this.RightFlag = 0;
	}

	// Move the DownForm	
	var moved = null;
	if (xMod != 0 || yMod != 0) {
		moved = this.Game.MoveDownForm(xMod, yMod);
		if (!moved && yMod != 0 && xMod != 0) {
			moved = this.Game.MoveDownForm(xMod, 0);
			if (!moved) {
				moved = this.Game.MoveDownForm(0, yMod);
			}
		}
		if (yMod == 0) moved = true;
	}
	
	// if moved === false it's because the DownForm was block
	// so we must continue the game
	if (moved === false) {
		// Transfer the DownForm squares in the game squares
		for (var i=0; i<this.Game.DownForm.Squares.length; i++) {
			this.Game.Squares.push(this.Game.DownForm.Squares[i]);
		}
		this.Game.DownForm = null;
		
		// Remove the completed lines
		var completeLines = this.Game.FindCompleteLines();
		if (completeLines.length > 0) {
			for (var i=0; i<completeLines.length; i++) {
				var lineY = completeLines[i];
				for (var j=0; j<this.Game.Squares.length; j++) {
					if (this.Game.Squares[j].y == lineY) {
						this.Game.Squares[j].y = 999;
						this.Game.Points++;
					}
					if (this.Game.Squares[j].y < lineY) this.Game.Squares[j].y++;
				}
			}
			var newSquares = [];
			for (var i=0; i<this.Game.Squares.length; i++) {
				if (this.Game.Squares[i].y != 999) newSquares.push(this.Game.Squares[i]);
			}
			this.Game.Squares = newSquares;
		}
		
		// Check if the user is game over
		if (this.Game.IsGameOver()) {
			this.Game.CurrentMode = this.Game.GameOverMode;
		}
	}
}

/*
	Abstract Method Implementation
*/
GameModeGame.prototype.Render = function() {
	this.Game.ClearOutput();
	
	this.Game.Output.beginPath();	
	this.Game.Output.fillText("Points : " + this.Game.Points, 200, 10);
	
	if (this.Game.DownForm != null) {
		for (var i=0; i<this.Game.DownForm.Squares.length; i++) {
			var square = this.Game.DownForm.Squares[i];
			this.Game.Output.drawImage(this.Game.Engine.Images[square.color], square.x * 30, square.y * 30);
		}
	}
	for (var i=0; i<this.Game.Squares.length; i++) {
		var square = this.Game.Squares[i];
		this.Game.Output.drawImage(this.Game.Engine.Images[square.color], square.x * 30, square.y * 30);
	}
}
