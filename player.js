var Player = (function(){

	var video;
	var playButton;
	var progressbarContainer;
	var progressbar;
	var updateProgressBar;

	
	function init() {

		video             = document.querySelector('#video');
		playButton        = document.querySelector('#play-button');
		progressbarContainer = document.querySelector('.progressbar-container');
		progressbar       = document.querySelector('#progressbar');
		updateProgressBar = undefined;

		video.load();
		bindEvents();

	}


	function bindEvents() {

		video.addEventListener('canplay', function(){
			
			playButton.addEventListener('click', playOrPause, false);
			progressbarContainer.addEventListener('click', skipVideoTime, false);

		}, false);

	}


	function playOrPause() {

		if(video.paused) {
			video.play();
			playButton.src= 'images/play.png';
			updateProgressBar = setInterval(updateProgressbarPlayer, 30);
		} else {
			video.pause();
			playButton.src= 'images/pause.png';
			clearInterval(updateProgressBar);
		}

	}

	function updateProgressbarPlayer() {
		var percentage = (video.currentTime / video.duration) * 100;
		progressbar.style.width = percentage + '%';
		if(video.ended) {
			clearInterval(updateProgressBar);
			playButton.src = 'images/replay.png';
		}
	}


	function skipVideoTime(event) {
		var mouseX = event.pageX - progressbarContainer.offsetLeft;
		var barWidth = window.getComputedStyle(progressbarContainer).getPropertyValue('width');
		
		barWidth = barWidth.substring(0, barWidth.length - 2)
		video.currentTime = (mouseX / barWidth) * video.duration;

		updateProgressbarPlayer();
	}	

	return {init:init};
	
})();



(function(Player, window, document){
	
	document.addEventListener("DOMContentLoaded", function(event) {
    	console.log('ready');
    	Player.init();
    });

})(Player, window, document);