const express = require('express');

var app = express();

app.use(express.static('static'));

// app.get('/', function(req, res) {
//   res.end();

// });
app.listen(process.env.port || 4000, function(){
  console.log('listen on port 4000');
});