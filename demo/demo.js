var gumHelper = require('../gumhelper');

if(navigator.getMedia) {

    gumHelper.startVideoStreaming(function() {

        window.alert('Oh oh, something failed');

    }, function(stream, videoElement, width, height) {

        var container = document.getElementById('videoContainer');

        container.appendChild(videoElement);

    });

} else {

    window.alert('For some reason it looks like your browser does not support getUserMedia');

}

