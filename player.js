var Player = (function(){

		
	var video = document.getElementById('video'),
		playButton = document.getElementById('play-button');

	
	function init() {

		video.load();
		bindEvents();

	}


	function bindEvents() {

		video.addEventListener('canplay', function(){
			playButton.addEventListener('click', playOrPause, false);
		}, false);

	}


	function playOrPause() {
		if(video.paused) {
			video.play();
			playButton.src= 'images/play.png';
		} else {
			video.pause();
			playButton.src= 'images/pause.png';
		}
	}


	return {init:init};
	
})();



(function(Player, window, document){
	
	document.addEventListener("DOMContentLoaded", function(event) {
    	console.log('ready');
    	Player.init();
    });

})(Player, window, document);