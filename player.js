var Player = (function(){

	var video;
	var playButton;
	var progressbarContainer;
	var progressbar;
	var updateProgressBar;
	var timeField;

	
	function init() {

		video             = document.querySelector('#video');
		playButton        = document.querySelector('#play-button');
		progressbarContainer = document.querySelector('.progressbar-container');
		progressbar       = document.querySelector('#progressbar');
		updateProgressBar = undefined;
		timeField = document.querySelector('.time-field');

		video.load();
		bindEvents();

	}


	function bindEvents() {

		video.addEventListener('canplay', function(){
			
			playButton.addEventListener('click', playOrPause, false);
			progressbarContainer.addEventListener('click', skipVideoTime, false);
			updateProgressbarPlayer();

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
		timeField.innerHTML = getFormattedTime();

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

	
	function getFormattedTime() {
		var seconds = Math.round(video.currentTime);
		var minutes = Math.floor(seconds / 60);

		if(minutes > 0) seconds -= minutes * 60;
		if(seconds.toString().length === 1) seconds = '0' + seconds;

		var totalSeconds = Math.round(video.duration);
		var totalMinutes = Math.floor(totalSeconds / 60);

		if(totalMinutes > 0) totalSeconds -= totalMinutes * 60;
		if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;


		return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
	}

	return {init:init};
	
})();



(function(Player, window, document){
	
	document.addEventListener("DOMContentLoaded", function(event) {
    	console.log('ready');
    	Player.init();
    });

})(Player, window, document);