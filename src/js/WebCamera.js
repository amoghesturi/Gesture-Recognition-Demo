/**
 * Created by amoghesturi on 10/26/16.
 */
/* exported WebCamUtils */

/**
 @typedef WebCamUtils
 @type {Object}
 @property {Function} streamCamera Single function to initilize WebRTC and display camera stream
 on the camera element
 */

/**
 * Initializes the WebRTC component and stream the web camera if feature is available
 *
 * @param {Object} cameraElement HTML vdeo element where the camera preview needs to be initialized
 * @return {Object} WebCamUtils all the functions and properties needed to display webcamera preview
 */
var WebCamUtils = function(cameraElement, utils) {
    console.log("Initializing webcamera utilities");
    var URL = window.URL;

    /**
     * Function that handles errors
     * @param err
     */
    var error = function(err) {
        utils.error([err.name]);
        utils.hideCamera();
    };

    /**
     * Function that displays the web cam stream
     * @param stream
     */
    var playStream = function(stream) {
        cameraElement.src = URL.createObjectURL(stream);
    };

    /**
     * Function that initializes WebRTC and streams upon success
     * Displays error message when fails
     *
     * @returns {*}
     */
    var streamCamera = function () {
        console.log("Initializing WebRTC");
        // Handling multiple browser's implementation of navigator.getUserMedia
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.oGetUserMedia;

        if(navigator.getUserMedia) {
                return navigator.getUserMedia({video: true}, playStream, error);
        }
        else {
            return utils.error(["Browser does not support using webcam"]);
        }
    };

    return {
        streamCamera : streamCamera
    };

};
