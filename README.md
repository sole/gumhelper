# gumhelper

## What it is

A WebRTC's getUserMedia wrapper.

## How to use it

### Detect if getUserMedia is available (with no prefixes)

Include the library in your HTML file:

```javascript
<script src="gumhelper.js"></script>
```

Then:

```javascript
if(navigator.getMedia) {
    console.log('getUserMedia is available');
} else {
    console.error('No luck');
}
```


### Start streaming

```javascript
gumHelper.startVideoStreaming(function callback(err, stream, videoElement, width, height) {
    if(err) {
        // Error!
        // This can fail for many reasons, even if the user doesn't accept the
        // prompt for using the webcam (we set a timeout for detecting this)
    } else {
        // Success!
        // stream: the video stream
        // videoElement: an HTML5 <video> element
        // width, height: the original dimensions of the video stream

        // You can append the video element to the current DOM,
        // if you want to show the unprocessed stream:
        document.body.appendChild(videoElement);

        // (or you could just keep a reference and use it later)
    }
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


### Using with browserify

You can use this library 'node style', with browserify too. Just install to `node_modules` with `npm install gumhelper`, and then you can just do:

```
var gumHelper = require('gumhelper');
// Use the gumHelper object as normal
```

Then to generate a bundle with browserify:

Install [browserify](http://browserify.org/) in case it's not installed yet:

> npm install browserify -g

then just do something like:

> browserify ./yourscript.js -o ./yourscript-bundle.js

And include `yourscript-bundle.js` in your HTML file.


## Demo

Have a look at [the demo](./demo/index.html) in the ```demo/``` folder.

## Changelog

0.0.5 

* Made the library package manager agnostic: you can use it with require, node/browserify or just plain JS includes. You don't need to use browserify to build the demo anymore!
* The library now uses node-style callbacks: send one function with err as first parameter, and everything else afterwards. If the call was successfull, err will be null. Otherwise, it will contain an Error object; check its `message` property for more information.
