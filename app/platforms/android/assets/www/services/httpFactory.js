angular.module('timecardReview')
    .factory('httpFactory', function($http, URL) {
        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                //var url = baseUrl + '/all/' + $cookieStore.get('activeUser');
                var url = URL + '/all/mslate';

                $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('httpFactory.getAllEmployeesForActiveManager() Error: ' + data);
                });
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = URL + '/employee/' + name;

                $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('httpFactory.getEmployeeByUsername() Error: ' + data);
                });
            },
            updateEmployeeReviewedByUsername: function(name, data, successCallback) {
                var url = URL + '/employee/' + name;

                $http.put(url, data).success(successCallback).error(function (data, status, headers, config) {
                    console.log('httpFactory.updateEmployeeByUsername() Error: ' + data);
                });
            },
            loginWithCred: function (credentials, successCallback, errorCallback) {
                $http.put(URL + '/login/', credentials).success(successCallback).error(errorCallback);
            }
        }
    });