
var gumHelper = window.GumHelper;

var buttonStart = document.getElementById('start');
var buttonStartWithTimeout = document.getElementById('startWithTimeout');
var buttonStop = document.getElementById('stop');
var videoContainer = document.getElementById('videoContainer');

buttonStart.addEventListener('click', startStreaming, false);
buttonStartWithTimeout.addEventListener('click', startStreamingWithTimeout, false);
buttonStop.addEventListener('click', stopStreaming, false);

if(navigator.getMedia) {

    buttonStart.disabled = false;

    startStreaming();

} else {

    window.alert('For some reason it looks like your browser does not support getUserMedia');

}


function onStreamingStarted(err, videoElement) {

    if(err) {

        window.alert(err.message);

    } else {

        videoContainer.appendChild(videoElement);
        buttonStart.disabled = true;
        buttonStartWithTimeout.disabled = true;
        buttonStop.disabled = false;

    }

}


function startStreaming() {

    gumHelper.startVideoStreaming(function(err, stream, videoElement, width, height) {

        onStreamingStarted(err, videoElement);

    });

}


function startStreamingWithTimeout() {

    gumHelper.startVideoStreaming(function(err, stream, videoElement, width, height) {

        onStreamingStarted(err, videoElement);

    }, { timeout: 15000 });

}


function stopStreaming() {

    videoContainer.innerHTML = '';
    gumHelper.stopVideoStreaming();

    buttonStart.disabled = false;
    buttonStartWithTimeout.disabled = false;
    buttonStop.disabled = true;

}

