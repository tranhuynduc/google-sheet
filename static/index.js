
$(function() {
  // $.support.cors = true;
  var workbook = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
  var excelIO = new GC.Spread.Excel.IO();
  var excelUrl = $("#importUrl").val();
  function ImportFile() {
    var excelUrl = "./test.xlsx";

    var oReq = new XMLHttpRequest();
    oReq.open('get', excelUrl, true);
    oReq.responseType = 'blob';
    oReq.onload = function () {
        var blob = oReq.response;
        excelIO.open(blob, LoadSpread, function (message) {
            console.log(message);
        });
    };
    oReq.send(null);
}
function LoadSpread(json) {
    jsonData = json;
    workbook.fromJSON(json);
  console.log('jsonData', jsonData);
  
    workbook.setActiveSheet("Sheet1");
    // ExportFile();
}
ImportFile();

var ExportFile = function () {
  var sheet = workbook.getActiveSheet();
  console.log(sheet);
  // sheet.addRows(11, 1);

  var array = getketqua().reverse();
  for (var i = 0; i < array.length; i ++) {
    console.log('column', i);
    sheet.addColumns(i,1);
  }
  var maxRow = 17600;
  
  for (var i = 0; i < maxRow; i ++) {
    console.log('row', i);
    sheet.addRows(i,1);
  }

  for (var i = 0; i < array.length; i++) {
    if(!array[i]) {
      break;
    }
    var a = array[i];

    var len = a.length;
    for (var j = 0; j < len; j++) {
      if (!a[j]) break;
      var value = a[j];
      console.log('setValue', value, j, i);
      sheet.setValue(j, i, value);
    }
  }




  
  var fileName = 'export.xlsx';
  if (fileName.substr(-5, 5) !== '.xlsx') {
      fileName += '.xlsx';
  }
  var json = JSON.stringify(workbook.toJSON());

  excelIO.save(json, function (blob) {
      saveAs(blob, fileName);
  }, function (e) {
      if (e.errorCode === 1) {
          alert(e.errorMessage);
      }
  });
}
window.ExportFile = ExportFile;
  function pad2(number) {

    return (number < 10 ? '0' : '') + number
  }
  // var ele = $('#element');
  // var count = 0;
  // var total = 100;
  // var is = 0;
  // var ie = 10;
  // for (i = is; i < ie; i++) {
  //   for (j = i+1; j < total; j++) {
  //     for (k = j+1; k < total; k++) {
  //       ele.append('<p>' +  pad2(i) +'_' + pad2(j) + '_' +  pad2(k) +'</p>');
  //       count++;
  //     }
  //   }
  // }
  // console.log(count);
  window.download = function download(content, fileName, contentType) {
    contentType = contentType || 'text/plain';
    var a = document.createElement("a");
    
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName || 'data.txt';
    a.click();
}
  window.getketqua = function getketqua() {
    var elements = $('.kqbackground.vien.tb-phoi');
    console.log(elements.length);
    var dataO = [];
    var dataDate = [];
  // download('asdsad', 'json.txt', 'text/plain');
  var tempStr = "";
    for (var i = elements.length - 1; i > -1; i--) {
    // $.each(elements, function (indexInArray, valueOfElement) { 
      // if (indexInArray > 5) {
      //   return false;
      // }
      var self = $(elements[i]);
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
      
      var mn =  mixThreeNumber(a, date);
      tempStr += date
      for (var ii = 0; ii < a.length; ii++) {
        tempStr+= "\t"  + a[ii];
      }

      tempStr += "\n";
      // console.log(mn, indexInArray);
      // dataO[indexInArray] = mn;
      // dataDate[indexInArray] = str;
      // console.log(tempStr);
      // mixNumber(a);
      log  = dataObj;
      // console.log(log);
    };
    // console.log(dataO);
    window.dataO = dataO;
    window.tempStr = tempStr;
    
    return dataO;
  }
  function mixThreeNumber(a, date) {
    var len = a.length;
    var array = [];
    var count = 0;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        for (var k = j + 1; k < len; k++) {
          array[0] = date;
          count++;
          array[count] = a[i] + '_' + a[j] + '_' + a[k];
        }
      }
    }
    return array;
  }
  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
  }

  function mixFourNumber(a, date) {

    a = uniq_fast(a);
    console.log(a);
    var len = a.length;
    var array = [];
    var count = 0;
    
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        for (var k = j + 1; k < len; k++) {
          for (var l = k + 1; l < len; l++) {
            window.gCount++;
            array[0] = date;
            count++;
            array[count] = a[i] + '_' + a[j] + '_' + a[k] + '_' + a[l];
          }
        }
      }
    }
    console.log('count', count++);
    return array;
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
      makeApiCall(data2);

    // getData2();
      
    }, function(response) {
      console.log(response);
    });

  }
  window.gCount = 0;

  var sheetID = '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk';
  function getData2() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1KnNhjBa3OTY2nFhuaL-hB94Zec6z7TwKQw8WP4KAGVk',
      range: 'Kết Quả!A1:D1',
    }).then(function(response) {
      data2 = response;
      console.log(11111);
      // calculateData();
    }, function(response) {
      console.log(response);
    });
  }


  function makeApiCall(data) {
    var values = getketqua().reverse();
    console.log(data);
    
    console.log(5555, values);
    var length = values.length;
    var range = 'Hỗ trợ nhập';
    var params = {
      // The ID of the spreadsheet to update.
      spreadsheetId: '1n2Jk9ZzGWlWcQr2liNwx7kXks9zwFnKabcUKvma0yDc',  // TODO: Update placeholder value.

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
    makeApiCall();
    
    if (isSignedIn) {
      // authorizeButton.style.display = 'none';
      // signoutButton.style.display = 'block';
    } else {
      // authorizeButton.style.display = 'block';
      // signoutButton.style.display = 'none';
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
