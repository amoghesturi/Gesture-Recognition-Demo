$(document).ready(function() {
    var cameraElement = document.querySelector("#webcamVideo");
    var messageDiv = $("#messages");
    var VIDEO = "youtubeVideo";
    var detector, utils;

    /**
     * Method to load all the scripts to process further
     * @param urls
     * @param callback
     * @returns {*}
     */
    function loadScripts(urls, callback) {
        var numDone = 0;
        var deferred = $.Deferred();

        function getScript(url, callback) {
            var script = document.createElement('script'),
                head = $('head')[0],
                done = false;

            script.src = url;
            script.onload = script.onreadystatechange = function() {
                if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    callback();
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                }
            };

            head.appendChild(script);
        }

        function getScriptCallback() {
            if (urls.length > 0)
                getScript(urls.shift(), getScriptCallback);
            else
                deferred.resolve("Completed loading all scripts");
        }

        getScript(urls.shift(), getScriptCallback);
        return deferred.promise();
    }

    /**
     * Initializes the video element and gets the API that to operate the video on
     * @returns {YoutubeAPI}
     */
    function initVideo() {
        // Initialize Youtube API
        return new YoutubeAPI(VIDEO);
    }

    /**
     * Initializes the WebRTC and starts preview from the web camera
     */
    function initWebCam() {
        // Initialize the utility class for printing errors
        utils = new Utils(messageDiv, cameraElement);
        webcamUtils = new WebCamUtils(cameraElement, utils);
    }

    /**
     * Method to initialize detector and start tracking the hand gestures
     */
    function startTracking() {
        // Initilaize the detector once
        if (!detector) {
            detector = new objectdetect.detector(80, 80, 1.1, objectdetect.handfist);
        }

        // Get the co ordinates of the hand gesture (closed hand fist)
        var coords = detector.detect(cameraElement, 1);
        if(coords[0]) {
            console.log(coords);
            youtubeApi.togglePlay();
            setTimeout(startTracking, 2000);
        }
        else {
            setTimeout(startTracking, 1000);
        }

    }

    // Load all the scripts
    var scripts = ["js/Utils.js",
        "js/ObjectDetect/objectdetect.js",
        "js/ObjectDetect/objectdetect.handfist.js",
        "js/WebCamera.js",
        "js/Youtube.js"];
    $.when(loadScripts(scripts))
        .then(initVideo)
        .then(initWebCam)
        .then(function() {
            youtubeApi.togglePlay();
            webcamUtils.streamCamera();
            startTracking();
        })
});
