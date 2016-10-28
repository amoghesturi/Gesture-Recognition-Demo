/**
 * Created by amoghesturi on 10/27/16.
 */

/**
 @typedef YoutubeAPI
 @type {Object}
 @property {Object} player embedded youtube player
 @property {Function} togglePlay plays/pauses the player based on the current state
 */

/**
 * Wrapper class containing all the methods to control the youtube video element
 * If successfully loaded, result contains player and togglePlay function
 *
 * @param {String} ytElement id attribute of the element that plays the video
 * @promise {Object} YoutubeAPI
 * @constructor
 */
var YoutubeAPI = function(ytElement) {
    console.log("Initializing youtube API");
    var deferred = $.Deferred();

    //Initilaize and load YouTube iFrame API into the page
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    $('head')[0].appendChild(tag);

    /**
     * Will be called from the YT iframe_api upon loading the embedded player
     * Must be implemented in the global scope for the API to be able to call.
     */
    window.onYouTubeIframeAPIReady = function() {
        console.log("Youtube iframe API created");
        new YT.Player(ytElement, {
            events: {
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        });
    };

    /**
     * success callback called from YT iframe_api when the video is loaded.
     * @param event
     * @resolve {Object} YoutubeAPI
     */
    function onPlayerReady(event) {
        console.log("Embedded youtube player is ready and will automatically play");
        this.player = event.target;
        youtubeApi = {
            player: this.player,
            togglePlay : togglePlay
        };
        console.log("Resolving YoutubeAPI promise");
        deferred.resolve(youtubeApi);
    }

    /**
     * called when YT ifrme_api encounters error while loading the video
     * @param error error.data contains the code of the error
     */
    function onPlayerError(error) {
        console.error("Error occurred with Youtube API. Error code : " + error.data );
        deferred.reject("Error occurred with Youtube API. Error code : " + error.data );
    }

    /**
     * Function to play/pause the player based on current state of the player
     */
    function togglePlay() {
        var playerState = player.getPlayerState();
        console.log("Toggling the play button, current state: " + playerState);
        switch(playerState) {
            // unstarted
            case (-1) :
                player.playVideo();
                break;
            case(0) :// Ended
                player.previousVideo();
                break;
            case(1): //playing
                player.pauseVideo();
                break;
            case(2) :
                player.playVideo();
                break;
            case(3): // Bufferring
                break;
            case(5): //Video cued
                player.playVideo();
                break;
            default:
                break;
        }
    }

    return deferred.promise();
};
