var Player = (function(){

	var video;
	var playButton;
	var progressbarContainer;
	var progressbar;
	var updateProgressBar;
	var timeField;
	var soundButton;
	var soundBarContainer;
	var soundBar;
	var fullScreenButton;
	var pauseScreen;
	var screenButton;

	
	function init() {

		video                = document.querySelector('#video');
		playButton           = document.querySelector('#play-button');
		progressbarContainer = document.querySelector('.progressbar-container');
		progressbar          = document.querySelector('#progressbar');
		updateProgressBar    = undefined;
		timeField            = document.querySelector('.time-field');
		soundButton          = document.querySelector('#sound-button');
		soundBarContainer    = document.querySelector('.soundbar-container');
		soundBar             = document.querySelector('#soundbar');
		fullScreenButton     = document.querySelector('#fullscreen-button');
		pauseScreen          = document.querySelector('#screen');
		screenButton         = document.querySelector('#screen-button');

		video.load();
		bindEvents();

	}


	function bindEvents() {

		video.addEventListener('canplay', function(){
			
			playButton.addEventListener('click', playOrPause, false);
			progressbarContainer.addEventListener('click', skipVideoTime, false);
			soundButton.addEventListener('click', muteorUnmute, false);
			soundBarContainer.addEventListener('click', changeVolume, false);
			fullScreenButton.addEventListener('click', showFullScreen, false);
			screenButton.addEventListener('click', playOrPause, false);
			
			updateProgressbarPlayer();

		}, false);

	}


	function playOrPause() {

		if(video.paused) {
			video.play();
			playButton.src= 'images/play.png';
			pauseScreen.style.display = 'none';
			updateProgressBar = setInterval(updateProgressbarPlayer, 30);
		} else {
			video.pause();
			playButton.src= 'images/pause.png';
			pauseScreen.style.display = 'block';
			screenButton.src='images/pause/png';
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
			pauseScreen.style.display = 'block';
			screenButton.src = 'images/replay.png';
		} else if(video.paused) {
			playButton.src = 'images/play.png';
			screenButton.src = 'images/play.png';
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


	function muteorUnmute() {
		if(!video.muted) {
			video.muted = true;
			soundButton.src = 'images/mute.png';
			soundBar.style.display = 'none';
		} else {
			video.muted = false;
			soundButton.src = 'images/sound.png';
			soundBar.style.display = 'block';
		}
	}


	function changeVolume(event) {
		var mouseX = event.pageX - soundBarContainer.offsetLeft;
		var width = window.getComputedStyle(soundBarContainer).getPropertyValue('width');
		
		width = parseFloat(width.substr(0, width.length - 2))
		video.volume = (mouseX / width);
		soundBar.style.width = (mouseX / width) * 100 + '%';
		video.muted = false;
		soundButton.src = 'images/sound.png';
		soundBar.style.display = 'block';
	}

	function showFullScreen() {
		if(video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen();
		} else if (video.mozRequestFullscreen) {
			video.mozkitRequestFullscreen();
		} else if (video.mskitRequestFullscreen) {
			video.mskitRequestFullscreen();
		}
	}
 
	return {init:init};
	
})();



(function(Player, window, document){
	
	document.addEventListener("DOMContentLoaded", function(event) {
    	Player.init();
    });

})(Player, window, document);