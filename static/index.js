  console.log('https://sheets.googleapis.com/v4/spreadsheets/1nEwfV8Xx0QGkYPUtVrXA4aodUE36NejZkVYmqGNSU7g');
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/1nEwfV8Xx0QGkYPUtVrXA4aodUE36NejZkVYmqGNSU7g';
  $.ajax({
    type: "get",
    url: url,
    data: {
      includeGridData: true,
      ranges: "A1:A5",
      key: 'AIzaSyDiYuKQN0G3TC6P0cuTeoE2vKl8dDoZBXI'
    },
    success: function (response) {
      console.log(response);
    }
  });