(function(){
  console.log('hello');
  var url = '';
  $.ajax({
    type: "get",
    url: url,
    data: "data",
    dataType: "dataType",
    success: function (response) {
      console.log('succes');
    },
    error: function(err) {
      console.log(err);
    }
  });
});