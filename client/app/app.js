angular.module('app', [
  'app.services',
  'ngMaterial'
  ])
.controller('AppController', function($http, $window, $scope, GooglePlaces) {

  $scope.places = [];
  $scope.searching = false;

  $scope.googlePlacesSearch = function() {
    $scope.searching = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      var data = {
        location: lat + ',' + lon,
        keyword: $scope.queryString
      };

      $scope.queryString = '';
      console.log(data);

      GooglePlaces.search(data)
        .then(function(response) {
          console.log(response);
          $scope.places = response.data.results;
          $scope.searching = false;
        });

    });
  };

  $scope.openMap = function(place) {
    console.log(place);
    $window.open('//google.com/maps?q=' + place.name);
  };
});
