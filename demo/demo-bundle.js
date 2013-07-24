;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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


},{"../gumhelper":2}],2:[function(require,module,exports){
'use strict';

// A couple of shims for having a common interface

window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);


//

var video;
var cameraStream;
var noGUMSupportTimeout;


/**
 * Requests permission for using the user's camera,
 * starts reading video from the selected camera, and calls
 * `okCallback` when the video dimensions are known (with a fallback
 * for when the dimensions are not reported on time),
 * or calls `errorCallback` if something goes wrong
 */
function startStreaming(errorCallback, onStreaming, okCallback) {

    var videoElement;
    var cameraStream;
    var attempts = 0;
    var readyListener = function(event) {

        findVideoSize();

    };
    var findVideoSize = function() {

        if(videoElement.videoWidth > 0 && videoElement.videoHeight > 0) {

            videoElement.removeEventListener('loadeddata', readyListener);
            onDimensionsReady(videoElement.videoWidth, videoElement.videoHeight);

        } else {

            if(attempts < 10) {

                attempts++;
                setTimeout(findVideoSize, 200);

            } else {

                onDimensionsReady(640, 480);

            }

        }

    };
    var onDimensionsReady = function(width, height) {
        okCallback(cameraStream, videoElement, width, height);
    };
    
    videoElement = document.createElement('video');
    videoElement.autoplay = true;

    videoElement.addEventListener('loadeddata', readyListener);

    navigator.getMedia({ video: true }, function (stream) {

        onStreaming();

        if(videoElement.mozSrcObject) {
            videoElement.mozSrcObject = stream;
        } else {
            videoElement.src = window.URL.createObjectURL(stream);
        }

        cameraStream = stream;
        videoElement.play();

    }, errorCallback);

}

/**
 * Try to initiate video streaming, and transparently handle cases
 * where that is not possible (includes 'deceptive' browsers, see inline
 * comment for more info)
 */
function startVideoStreaming(errorCallback, okCallback) {
    
    if(navigator.getMedia) {

        // Some browsers apparently have support for video streaming because of the
        // presence of the getUserMedia function, but then do not answer our
        // calls for streaming.
        // So we'll set up this timeout and if nothing happens after a while, we'll
        // conclude that there's no actual getUserMedia support.
        noGUMSupportTimeout = setTimeout(onNoGUMSupport, 10000);

        startStreaming(errorCallback, function() {
                
                // The streaming started somehow, so we can assume /there is/
                // gUM support
                clearTimeout(noGUMSupportTimeout);

            }, function(stream, videoElement, width, height) {


                // Keep references, for stopping the stream later on.
                cameraStream = stream;
                video = videoElement;

                okCallback(stream, videoElement, width, height);

            }
        );

    } else {

        onNoGUMSupport();
    }

    function onNoGUMSupport() {
        errorCallback('Native device media streaming (getUserMedia) not supported in this browser.');
    }
}


function stopVideoStreaming() {
    
    if(cameraStream) {

        cameraStream.stop();

    }

    if(video) {

        video.pause();
        // TODO free src url object
        video.src = null;
        video = null;

    }

}

if(module !== undefined && module.exports) {

    module.exports = {
        startVideoStreaming: startVideoStreaming,
        stopVideoStreaming: stopVideoStreaming
    };

}

},{}]},{},[1])
;