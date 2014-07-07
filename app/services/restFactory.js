angular.module('timecardReview')
    .factory('restFactory', function($http) {
        return {
            get: function (url, callback) {
                return $http.get(url).success(callback).error(function (error) {
                    console.log('restFactory.get() Error: ' + error);
                });
            },
            put: function (url, data, callback) {
                return $http.put(url, data).success(callback).error(function (error) {
                    console.log('restFactory.put() Error: ' + error);
                });
            },
            login: function (credentials) {
                return $http.put('/login/', credentials);
            },
            getToken: function(callback) {
                return $http.get('/twilio/token').success(callback).error(function (error) {
                    console.log('restFactory.token() Error: ' + error);
                });
            }
        }
    });