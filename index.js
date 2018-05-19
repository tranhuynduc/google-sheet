const express = require('express');
var path = require('path');
var app = express();

var data = {};
app.get('/data/data.json', (req, res) => {
  console.log('url', res.url)

  res.sendFile(path.join(__dirname, '/data', 'data.json'));
});
app.use(express.static('static'));

app.listen(process.env.port || 4000, function(){
  console.log('listen on port 4000');
});