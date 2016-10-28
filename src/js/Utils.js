/**
 * Created by amoghesturi on 10/26/16.
 */

/* exported Utils */

/**
 * Class containing all the utility methods
 *
 * @param errorDiv DOM element for displaying errors
 * @param camerElement DOM element for the web camera
 * @returns {{error: displayError, hideCamera: hideCamera}}
 * @constructor
 */
function Utils(errorDiv, cameraElement) {
    /**
     * Method to display error messages in its section
     * @param messages
     */
    var displayError = function(messages) {
        if(messages.length === 0) {
            errorDiv.innerHTML = "<h3>Unexpected error occurred</h3>";
            return;
        }

        var messagesHtml = "<ul><strong>ERRORS: </strong>";
        messages.forEach(function(message) {
            messagesHtml += "<li>" + message + "</li>";
        });
        messagesHtml += "</ul>";
        errorDiv.html(messagesHtml);
        errorDiv.show();
        return;
    };

    /**
     * Hide the div containing the web camera preview
     */
    var hideCamera = function() {
        cameraElement.hide();
    };

    return {
        error: displayError,
        hideCamera: hideCamera
    };
}
