/*
	Class to help manage user keyboard interaction
*/
function EngineKeyboard() {
	var self = this;
	
	self.Up = {IsPress:false, IsBlock:false};
	self.Down = {IsPress:false, IsBlock:false};
	self.Left = {IsPress:false, IsBlock:false};
	self.Right = {IsPress:false, IsBlock:false};
	self.Pause = {IsPress:false, IsBlock:false};
	self.Enter = {IsPress:false, IsBlock:false};
	self.Space = {IsPress:false, IsBlock:false};
	
	var _ChangePressStatus = function(keyCode, status) {
		var key = null;
		if (keyCode == 37) key = self.Left;
		else if (keyCode == 38) key = self.Up;
		else if (keyCode == 39) key = self.Right;
		else if (keyCode == 40) key = self.Down;
		else if (keyCode == 19) key = self.Pause;
		else if (keyCode == 13) key = self.Enter;
		else if (keyCode == 32) key = self.Space;
		
		if (key != null) {
			key.IsPress = status;
			if (!status) {
				key.IsBlock = false;
			}
		}
	};
	
	window.onkeydown = function(e) {
		_ChangePressStatus(e.keyCode, true);
	};
	window.onkeyup = function(e) {
		_ChangePressStatus(e.keyCode, false);
	};
}
