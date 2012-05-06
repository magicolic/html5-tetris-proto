/*
	Class to manage usefull features for html5 gaming
*/
function Engine() {
	var self = this;
	
	self.Keyboard = new EngineKeyboard();
	self.Images = {};
	
	self.Init = function(callback) {
		_LoadImages(null, function(){
			if (callback) callback();
		});
	};
	
	var _LoadImages = function(images, callback) {
		if (images == null) {
			images = [];
			for (var key in self.Images) {
				images.push(key);
			}
		}
		
		if (images.length == 0) {
			if (callback) callback();
		} else {
			var key = images.pop();
			var src = self.Images[key];
			self.Images[key] = new Image();
			self.Images[key].onload = function() {
				_LoadImages(images, callback);
			};
			self.Images[key].src = src;
		}
	};
}
