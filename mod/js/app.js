// replace these values with those generated in your TokBox Account
var apiKey = "47241704";
var sessionId = "1_MX40NzI0MTcwNH5-MTYyMjIwNjkzMzI5N352amcrckZWbzZTLzM3cmRqVmxaQ1NodXh-fg";
var token = "";

// (optional) add server code here
//initializeSession();
var SERVER_BASE_URL = 'https://moddakirkids.herokuapp.com';
fetch(SERVER_BASE_URL + '/session').then(function (res) {
    return res.json()
}).then(function (res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;
    initializeSession();
}).catch(handleError);



// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
        alert(error.message);
    }
}

function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function (event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(token, function (error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}
