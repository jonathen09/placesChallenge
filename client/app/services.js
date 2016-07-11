angular.module('app.services', [])

.factory('GooglePlaces', function($http) {
  var search = function(data) {
    return $http({
        method: 'POST',
        url: '/places',
        data: data
    }).then(function(resp) {
      return resp;
    });
  };

  return {
    search: search,
  };

});
