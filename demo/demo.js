var gumHelper = require('../gumhelper');

var buttonStart = document.getElementById('start');
var buttonStop = document.getElementById('stop');
var videoContainer = document.getElementById('videoContainer');

buttonStart.addEventListener('click', startStreaming, false);
buttonStop.addEventListener('click', stopStreaming, false);

if(navigator.getMedia) {

    buttonStart.disabled = false;

    startStreaming();

} else {

    window.alert('For some reason it looks like your browser does not support getUserMedia');

}


function startStreaming() {

    gumHelper.startVideoStreaming(function() {

        window.alert('Oh oh, something failed');

    }, function(stream, videoElement, width, height) {

        videoContainer.appendChild(videoElement);
        buttonStart.disabled = true;
        buttonStop.disabled = false;

    });

}

function stopStreaming() {

    videoContainer.innerHTML = '';
    gumHelper.stopVideoStreaming();

    buttonStart.disabled = false;
    buttonStop.disabled = true;

}

