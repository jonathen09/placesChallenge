var express = require('express');
var app = express();
var request = require('request');
var rp = require('request-promise');

//config
var port = process.env.PORT || 3000;

//connect client
app.use(express.static(__dirname + '/../client'));

//routes
app.get('/places', function(req, res) {
  var keyword = req.query.keyword;
  var location = req.query.location;
  return rp.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      + '&location=' + location
      + '&radius=' + 10000
      + '&keyword=' + keyword
    )
    .then(function(data) {
      res.json(JSON.parse(data.body));
    });
});

app.listen(port, function(err) {
  if (err) {
      return console.log(err);
  }
  console.log('Application listening on ' + port);
});
