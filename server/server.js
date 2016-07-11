var express = require('express');
var app = express();
var request = require('request');
var rp = require('request-promise');
var bodyParser =require('body-parser');
var GOOGLE_PLACES_API_KEY = require(__dirname + '/../googleplaces.js');

//config
var port = process.env.PORT || 3000;

//connect client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));

//routes
app.post('/places', function(req, res) {
  console.log(req.body);
  var keyword = req.body.keyword;
  var location = req.body.location;
  return rp.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      + '&location=' + location
      + '&radius=' + 10000
      + '&keyword=' + keyword
      + '&key=' + GOOGLE_PLACES_API_KEY
    )
    .then(function(data) {
      console.log(data);
      return res.json(JSON.parse(data));
    });
});

app.listen(port, function(err) {
  if (err) {
      return console.log(err);
  }
  console.log('Application listening on ' + port);
});
