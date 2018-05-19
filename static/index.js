
$(function() {

  function pad2(number) {

    return (number < 10 ? '0' : '') + number
  }
  // var count = 0;
  // var total = 100;
  // var is = 85;
  // var ie = 100;
  // for (i = is; i < ie; i++) {
  //   for (j = i+1; j < total; j++) {
  //     for (k = j+1; k < total; k++) {
  //       ele.append('<p>' +  pad2(i) + '-' + pad2(j) + '-' +  pad2(k) +'</p>');
  //       count++;
  //     }
  //   }
  // }
  // console.log(count);

  function getketqua() {
    var elements = $('.kqbackground.vien.tb-phoi');
    console.log(elements.length);
    var dataO = [];
    
    $.each(elements, function (indexInArray, valueOfElement) { 
      // if (indexInArray > 5) {
      //   return false;
      // }
      var self = $(this);
      var text = self.find('#result_date').text();
      var mb = self.find('#dau_mb');
      var tr = mb.find('tbody tr');
      var len = text.length;
      var date = text.slice(len -10, len);
      var log = date;
      var numArray = []
      var strArray = [];
      var dataObj = {};

      var tt = '';
      $.each(tr, function (index, value) { 
        var s = $(this);
        var t = s.find('.need_blank');
        var text = t.text();
        
        tt += text;
        numArray[index] = t.text();
        // strArray[index] = a;

        
      });
      var a = tt.split('; ');
      a.splice(-1,1);
      dataObj['date'] = date;
      dataObj['number'] = numArray;
      dataObj['str'] = a;
      var mn =  mixNumber(a, date);
      // console.log(mn, indexInArray);
      dataO[indexInArray] = mn;
      // mixNumber(a);
      log  = dataObj;
      // console.log(log);
    });
    console.log(dataO);
    window.dataO = dataO;
    return dataO;
  }



  function mixNumber(a, date) {
    var len = a.length;
    var array = [];
    var count = 0;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        array[0] = date;
        count++;
        array[count] = a[i] + '_' + a[j];
      }
    }
    return array;
  }


  var data1, data;
  function listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk',
      range: 'Số Liệu!A:G',
    }).then(function(response) {
      data1 = response;
      console.log(data1);

    getData2();
      
    }, function(response) {
      console.log(response);
    });

  }

  var sheetID = '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk';
  function getData2() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk',
      range: 'Kết Quả!A1:D1',
    }).then(function(response) {
      data2 = response;
      console.log(11111);
      makeApiCall(data2);
      // calculateData();
    }, function(response) {
      console.log(response);
    });
  }


  function makeApiCall(data) {
    console.log(data);
    var values = getketqua().reverse();
    console.log(5555, values);
    var length = values.length;
    var range = 'test';
    var params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk',  // TODO: Update placeholder value.

      // The A1 notation of the values to update.
      range: range,

      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
    };

    var valueRangeBody = {
      "range": range,
      "majorDimension": "COLUMNS",
      "values": values
    };

    var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(111, response.result, 'result');
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });
  }
  // var ele = $('#data');
  

  // var str = "";
  // var i = j = k = 0;




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
  
  

  handleClientLoad();
});
