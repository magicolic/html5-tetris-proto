/*
	Class that contain logic to initialize and play the game
*/
function Game() {
	this.Engine;
	this.Output;
	this.CurrentMode;
	
	// GAME MODES
	this.StartMode;
	this.GameMode;
	this.PauseMode;
	this.GameOverMode;
	
	// GAME VARIABLES
	this.DownForm;
	this.Squares;
	this.Points;
}

/*
	Initialize all that it's need for the game (images, canvas, engine, etc...)
*/
Game.prototype.Init = function(callback) {
	// Initialize the output context
	document.getElementById("GameContainer").innerHTML = '<canvas id="GameCanvas" width="300" height="600" style="border:1px solid black;"></canvas>';
	this.Output = document.getElementById("GameCanvas").getContext("2d");
	
	// Initialize the engine
	this.Engine = new Engine();
	this.Engine.Images = {"blue":"ressources/blue.png", "red":"ressources/red.png", "purple":"ressources/purple.png", "green":"ressources/green.png", "pink":"ressources/pink.png", "yellow":"ressources/yellow.png", "gray":"ressources/gray.png"};	
	this.Engine.Init(function(){
		if (callback) callback();
	});
}

/*
	Initialize game variables and start the game
*/
Game.prototype.Start = function() {
	this.StartMode = new GameModeStart(this);
	this.GameMode = new GameModeGame(this);
	this.PauseMode = new GameModePause(this);
	this.GameOverMode = new GameModeGameOver(this);
	this.CurrentMode = this.StartMode;
	this.DownSquare = null;
	this.Squares = [];
	this.Points = 0;
	this.GameLoop();
}
Game.prototype.Restart = function() {
	this.CurrentMode = this.StartMode;
	this.DownSquare = null;
	this.Squares = [];
	this.Points = 0;	
}

/*
	Game loop that is call 60x/second
*/
Game.prototype.GameLoop = function() {
	var beginGameLoop = new Date();
	
	this.CurrentMode.Update();
	this.CurrentMode.Render();
	
	var timespanGameLoop = new Date() - beginGameLoop;
	var game = this;
	setTimeout(function(){game.GameLoop()}, 1000/60-timespanGameLoop);
}

/*
	Clear all the output of the game
*/
Game.prototype.ClearOutput = function() {
	this.Output.clearRect(0,0,300,600);
}

/*
	Try to rotate the DownForm
	Return true if successfull
	Return false if can't be rotate
*/
Game.prototype.RotateDownForm = function() {
	var oldDownSquares = [
		{x:this.DownForm.Squares[0].x, y:this.DownForm.Squares[0].y, color:this.DownForm.Squares[0].color},
		{x:this.DownForm.Squares[1].x, y:this.DownForm.Squares[1].y, color:this.DownForm.Squares[1].color},
		{x:this.DownForm.Squares[2].x, y:this.DownForm.Squares[2].y, color:this.DownForm.Squares[2].color},
		{x:this.DownForm.Squares[3].x, y:this.DownForm.Squares[3].y, color:this.DownForm.Squares[3].color}
	];
	var oldDownSquareDirection = this.DownForm.Direction;

	this.DownForm.Rotate();
	
	var collision = false;
	for (var i=0; i<this.DownForm.Squares.length; i++) {
		if (this.DetectCollision(this.DownForm.Squares[i].x, this.DownForm.Squares[i].y)) {
			collision = true;
		}
	}
	
	if (collision) {
		this.DownForm.Squares = oldDownSquares;
		this.DownForm.Direction = oldDownSquareDirection;
		return false;
	}
	return true;
}

/*
	Try to move the DownForm
	Return true if moved successfully
	Return false if can't be moved there
*/
Game.prototype.MoveDownForm = function(xMod, yMod) {
	var oldDownSquares = [
		{x:this.DownForm.Squares[0].x, y:this.DownForm.Squares[0].y, color:this.DownForm.Squares[0].color},
		{x:this.DownForm.Squares[1].x, y:this.DownForm.Squares[1].y, color:this.DownForm.Squares[1].color},
		{x:this.DownForm.Squares[2].x, y:this.DownForm.Squares[2].y, color:this.DownForm.Squares[2].color},
		{x:this.DownForm.Squares[3].x, y:this.DownForm.Squares[3].y, color:this.DownForm.Squares[3].color}
	];
	
	this.DownForm.Move(xMod, yMod);

	var collision = false;
	for (var i=0; i<this.DownForm.Squares.length; i++) {
		if (this.DetectCollision(this.DownForm.Squares[i].x, this.DownForm.Squares[i].y)) {
			collision = true;
		}
	}
	
	if (collision) {
		this.DownForm.Squares = oldDownSquares;
		return false;
	}
	return true;
}

/*
	Create a new random DownForm at the top of the game
*/
Game.prototype.CreateRandomDownForm = function() {
	var rand = Math.floor((Math.random()*7)+1);
	switch (rand) {
		case 1:
			this.DownForm = new Form1(6, 0, 0);
			break;
		case 2:
			this.DownForm = new Form2(6, 0, 0);
			break;
		case 3:
			this.DownForm = new Form3(6, 0, 0);
			break;
		case 4:
			this.DownForm = new Form4(6, 0, 0);
			break;
		case 5:
			this.DownForm = new Form5(6, 0, 0);
			break;
		case 6:
			this.DownForm = new Form6(6, 0, 0);
			break;
		case 7:
			this.DownForm = new Form7(6, 0, 0);
			break;
	}
}

/*
	Check if a position is inside the bound of the game and if the position is empty
	Return true if outside of bound or use by a square
	Return false if inside of bound and not use by a square
*/
Game.prototype.DetectCollision = function(x, y) {
	if (y > 19 || x < 0 || x > 9) return true;
	for (var i=0; i<this.Squares.length; i++) {
		if (this.Squares[i].x == x && this.Squares[i].y == y) return true;
	}
	return false;
}

/*
	Check if the game is over
*/
Game.prototype.IsGameOver = function() {
	for (var i=0; i<this.Squares.length; i++) {
		if (this.Squares[i].y == 0) return true;
	}
	return false;
}

/*
	Return an array of y position of completed line that are ready to be erase
*/
Game.prototype.FindCompleteLines = function() {
	var nbByLine = [];
	for (var i=0; i<this.Squares.length; i++) {
		var y = this.Squares[i].y;
		if (nbByLine[y]) {
			nbByLine[y]++;
		} else {
			nbByLine[y] = 1;
		}
	}
	
	var completedLines = [];
	for (var i=0; i<nbByLine.length; i++) {
		if (nbByLine[i] == 10) completedLines.push(i);
	}
	
	return completedLines;
}
