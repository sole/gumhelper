
var gumHelper = window.GumHelper;

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

    gumHelper.startVideoStreaming(function(err, stream, videoElement, width, height) {

        if(err) {

            window.alert(err.message);

        } else {

            videoContainer.appendChild(videoElement);
            buttonStart.disabled = true;
            buttonStop.disabled = false;

        }

    });

}

function stopStreaming() {

    videoContainer.innerHTML = '';
    gumHelper.stopVideoStreaming();

    buttonStart.disabled = false;
    buttonStop.disabled = true;

}

