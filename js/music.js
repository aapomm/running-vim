$(function(){

	var audio = document.getElementById('sound');

	function musicSwitch(){
		if(audio.paused){
	 	 audio.play();
			}
		else{
			audio.pause()
			}
	}
	document.getElementById('mute').addEventListener('click', musicSwitch);
});