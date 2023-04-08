// replace these values with those generated in your TokBox Account
//var apiKey = "47241704";
//var sessionId = "1_MX40NzI0MTcwNH5-MTYyMjIwNjkzMzI5N352amcrckZWbzZTLzM3cmRqVmxaQ1NodXh-fg";
//var token = "6c8b1deb3f04a41544a69466c29ea8b9916e6ea3";

var apiKey = "47696341";
var sessionId = "2_MX40NzY5NjM0MX5-MTY4MDk1MjM1MjIwNX5CdFFZQzE2dXE4Rk55ME92WjVhRmV4WUZ-fn4";
var token = "var token = "T1==cGFydG5lcl9pZD00NzY5NjM0MSZzaWc9N2UzN2M2NzMxMWU4MmQxNTIzOThiZGMzYmFhY2ZjNTcwNzA2M2NlNjpzZXNzaW9uX2lkPTJfTVg0ME56WTVOak0wTVg1LU1UWTRNRGsxTWpNMU1qSXdOWDVDZEZGWlF6RTJkWEU0Ums1NU1FOTJXalZoUm1WNFdVWi1mbjQmY3JlYXRlX3RpbWU9MTY4MDk1MjQxMCZub25jZT0wLjgxNzY5ODI4NTMwNDM0NDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTY4MzU0NDQwOSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

//var apiKey = "4102714";
//var token = "c4bc9a8e9fb12536b60b92252c98637dc026e921"

// (optional) add server code here
initializeSession();
// var SERVER_BASE_URL = 'https://moddakirkids.herokuapp.com';
// fetch(SERVER_BASE_URL + '/session').then(function (res) {
//     return res.json()
// }).then(function (res) {
//     apiKey = res.apiKey;
//     sessionId = res.sessionId;
//     token = res.token;
//     initializeSession();
// }).catch(handleError);



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
