

function getData(opts, callback) {
  var getValue = {
    spreadsheetId: opts.sheetID || sheetID,
    range: opts.tableName + '!' + opts.ranges || '',
  };
  console.log(getValue);
  gapi.client.sheets.spreadsheets.values.get(getValue).then(function(response) {
    typeof callback === 'function' && callback(response);
  });
}

var configs = {
  workingHours: 8,
  restingHours: 1,
}

var CLIENT_ID = '1090702840814-aibkt1o7smgbvcs6l37l1rb9j69l9d7g.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDiYuKQN0G3TC6P0cuTeoE2vKl8dDoZBXI';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

var sheetID = '1gi5PMxmjyLxwgM6M0mAs9CbPpFYY39otY99MnojNbTk';
// Array of API discovery doc URLs for APIs used by the quickstart
var ranges = 'D4:O';
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/drive";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    console.log('initclieng');
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listMajors();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

