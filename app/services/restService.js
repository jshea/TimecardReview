angular.module('timecardReview')
    .factory('restService', function($http) {
        return {
            get: function (url, callback) {
                return $http.get(url).success(callback);
            },
            put: function (url, data, callback) {
                return $http.put(url, data).success(callback);
            },
            login: function (credentials) {
                return $http.put('/login/', credentials);
            }
        }
    });