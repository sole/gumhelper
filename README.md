# gumHelper

## What it is

A WebRTC's getUserMedia wrapper.

## How to use it

### Detect if getUserMedia is available

(with no prefixes)

```javascript
if(navigator.getMedia) {
    console.log('getUserMedia is available');
} else {
    console.error('No luck');
}
```

### Start streaming

```javascript
gumHelper.startVideoStreaming(function errorCallback() {
    // Error!
    // This can fail for many reasons, even if the user doesn't accept the
    // prompt for using the webcam (we set a timeout for detecting this)
}, function successCallback(stream, videoElement, width, height) {
    // Success
    // stream: the video stream
    // videoElement: an HTML5 <video> element
    // width, height: the original dimensions of the video stream

    // You can append the video element to the current DOM,
    // if you want to show the unprocessed stream:
    document.body.appendChild(videoElement);

    // or you could just keep a reference and use it later.
});
```

### Getting video data

In your rendering function, check whether a new frame is available in the video stream:

```javascript
if(videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
    // There is! You can copy the video to a canvas to get the pixel data, for example:
    canvasContext.drawImage(videoElement, 0, 0);
}
```

### Stop streaming

```javascript
gumHelper.stopVideoStreaming();
```

## Demo

Have a look at the demo in the ```demo/``` folder.

If you edit demo.js and want to see the changes, you need to regenerate the ```demo-bundle.js``` file.

Install browserify in case it's not installed yet:

> npm install browserify -g

then just cd to the package directory and:

> browserify ./demo/demo.js -o ./demo/demo-bundle.js

