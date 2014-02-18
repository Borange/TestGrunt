this.example = this.example || {};

$(function(){
	var Main = function(){
		this.init();
	};
	
	var prototype = Main.prototype;

	prototype.init = function(){
		console.log("init");
	};

	example.Main = Main;

});