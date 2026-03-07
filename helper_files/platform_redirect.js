// save data function
var nAttemptsDataSubmission = 0;

function saveDataAndRedirect( experimentSystem_params_local, outDir = '../data', data = jsPsych.data.get().csv() ) {
    // allows multiple attempts at data submission; this will (hopefully) prevent missing data files that happens sometimes when a php post fails
    var maxAttemptsDataSubmission = 6;     // number of times to try submitting the data
    var delayAttemptDataSubmission = 1500; // delay (in ms) before attempting data submission again
    // post response to server
    $.post("helper_files/write_data.py", {
        subjectID: subject_id,
        dataString: data,
        outDir: outDir
    }, () => {
        // if successful, redirect (if applicable)
        console.log('Success in saving data! Redirecting (if applicable)...');
        if ( experimentSystem_params_local['redirect'] == true ) {
            redirect(experimentSystem_params_local);
        }
    }).fail(() => {
        // if fail, attempt to submit `maxAttemptsDataSubmission` more times (so it doesn't get trapped in a loop)
        if (nAttemptsDataSubmission < maxAttemptsDataSubmission) {
            console.log('Failed submission of data; trying again...');
            nAttemptsDataSubmission++;
            // try once more at a delay of `delayAttemptDataSubmission` (in ms)
            setTimeout(function() { 
                saveDataAndRedirect(experimentSystem_params_local, outDir, data);
            }, delayAttemptDataSubmission);
        } else {
            console.log('Failed submission of data; just redirecting (if applicable)...');
            // if already tried `maxAttemptsDataSubmission` times, just give up and redirect (if applicable)
            if ( experimentSystem_params_local['redirect'] == true ) {
                redirect(experimentSystem_params_local);
            }
        }
    });
}

function createRedirectURL(experimentSystem_params_local) {
    var urlRedirect = experimentSystem_params_local['base_url'] + '?';
    for ( param in experimentSystem_params_local['urlParams'] ) {
        urlRedirect = urlRedirect.concat(param + '=' + experimentSystem_params_local['urlParams'][param] + '&');
    }
    // trim off last ampersand
    urlRedirect = urlRedirect.substring(0, urlRedirect.length-1);
    return urlRedirect;
}

function redirect(experimentSystem_params_local) {
    // remove event listener (to allow for redirect)
    window.removeEventListener('beforeunload', eventReturn);
     // redirect
    window.location = createRedirectURL(experimentSystem_params_local);
}