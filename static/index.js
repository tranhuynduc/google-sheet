


 var data1, data;
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1gi5PMxmjyLxwgM6M0mAs9CbPpFYY39otY99MnojNbTk',
    range: 'data1!D4:O',
  }).then(function(response) {
    data1 = response;
    console.log(data1);
    // var range = response.result;
    // if (range.values.length > 0) {
    //   appendPre('Name, Major:');
    //   for (i = 0; i < range.values.length; i++) {
    //     var row = range.values[i];
    //     // Print columns A and E, which correspond to indices 0 and 4.
    //     appendPre(row[0] + ', ' + row[4]);
    //   }
    // } else {
    //   appendPre('No data found.');
    // }
  getData2();
    
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });

}

function getData2() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: sheetID,
    range: 'data2!D4:O',
  }).then(function(response) {
    data2 = response;
    // var range = response.result;
    // if (range.values.length > 0) {
    //   appendPre('Name, Major:');
    //   for (i = 0; i < range.values.length; i++) {
    //     var row = range.values[i];
    //     // Print columns A and E, which correspond to indices 0 and 4.
    //     appendPre(row[0] + ', ' + row[4]);
    //   }
    // } else {
    //   appendPre('No data found.');
    // }

    console.log(data1, data2);
    calculateData();
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });

}
function calculateData() {
  var machineValues = data1.result.values;
  var humanValues = data2.result.values;
// var newData = Object.assign({}, machineValues);
  
  // console.log('newData', newData);
  for ( var i = 0; i < humanValues.length; i++) {
    for (var j = 0 ; j < humanValues[i].length; j++) {
      var value = humanValues[i][j];
      if (!value) {
        continue;
      }

      if (!machineValues[i][j + 1]) {
        console.log(value, machineValues[i][j+1]);
        machineValues[i][j + 1] = machineValues[i][j]
        
      }
      machineValues[i][j] = value;
      // console.log(humanValues[i][j]);
      // var beginningTime = moment(humanValues[i][j],"HH:mm:ss");
      // var endTime = moment(machineValues[i][j],"HH:mm:ss");
      // // if (beginningTime.isBefore(endTime)) {
      //   console.log(beginningTime, endTime);

      // // }
      // console.log(beginningTime.isBefore(endTime))


    }
  }
  console.log(555);
  makeApiCall(machineValues);

}


function makeApiCall(data) {
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: sheetID,  // TODO: Update placeholder value.

    // The A1 notation of the values to update.
    range: 'data3!' + ranges,  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
  };
  console.log(data);
  console.log(22, data1.result.values)
  // ranges = "D4:D"
  var valueRangeBody = {
    "range": 'data3!' + ranges,
    "majorDimension": "ROWS",
    "values": data1.result.values
  };

  var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(111, response.result, 'result');
    handleOT(data1.result.values);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}


//////// OT
var opts = {
  sheetID: sheetID,
  tableName: 'tangca',
  ranges: 'B3:F'
}
function handleOT(tableData) {
  var newTable = new Array(10);
  for (var i = 0; i < 10; i++) {
    newTable[i] = new Array(20);
  }
  var startDate = moment('1/8/2016', "DD/MM/YYYY");
  getData(opts, function(data) {
    var values = data.result.values;
    console.log('OTvalue', values);
  console.log(startDate);
    
    var data;
    // var start = moment("2018-03-10", "YYYY-MM-DD");
    
    //Difference in number of days
    // moment.duration(start.diff(end)).asDays();
    
    //Difference in number of weeks
    // moment.duration(start.diff(end)).asWeeks();
    for (var i = 0 ; i< values.length; i++) {
      var value = values[i];
      if (!values[i][3] || !values[i][4]) {
        var endDate = moment(values[i][2], "DD/MM/YYYY");
        console.log(2222, endDate, startDate);
        var dayDiff = Math.floor(moment.duration(endDate.diff(startDate)).asDays());        
        
        var index = value[0];
        var target = tableData[index - 1];
        if (!target[dayDiff * 2 + 1]) {
          continue;
        }
        console.log(target, dayDiff, target[dayDiff * 2 + 1]);
        var endHours = new moment(target[dayDiff * 2 + 1], "HH:mm");

        var endWorkingTime  = new moment("17:00", "HH:mm");
        // console.log();
        newTable[index-1][dayDiff * 2 + 1] = moment(moment.duration(endHours.diff(endWorkingTime)).asMinutes(), "HH:MM");
        
      } else {

      }
    }

    makeApiCallOT(newTable);
  })

}

function makeApiCallOT(data) {
  console.log(data);
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: sheetID,  // TODO: Update placeholder value.

    // The A1 notation of the values to update.
    range: 'OT!' + ranges,  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
  };
  console.log(data);
  console.log(22, data1.result.values)
  // ranges = "D4:D"
  var valueRangeBody = {
    "range": 'OT!' + ranges,
    "majorDimension": "ROWS",
    "values": data
  };

  var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(111, response.result, 'result');

  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}
