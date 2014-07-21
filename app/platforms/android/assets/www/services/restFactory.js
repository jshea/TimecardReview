angular.module('timecardReview')
    .factory('restFactory', function($http) {
        var baseUrl = 'http://15d8f5e4.ngrok.com';

        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                //var url = baseUrl + '/all/' + $cookieStore.get('activeUser');
                var url = baseUrl + '/all/mslate';

                return $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.getAllEmployeesForActiveUser() Error: ' + data);
                });
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = baseUrl + '/employee/' + name;

                return $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.getEmployeeByUsername() Error: ' + data);
                });
            },
            getActiveManager: function (successCallback) {
                //var url = baseUrl + '/employee/' + $cookieStore.get('activeUser');
                var url = baseUrl + '/employee/mslate';

                return $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.getActiveEmployee() Error: ' + data);
                });
            },
            updateEmployeeByUsername: function(name, data, successCallback) {
                var url = baseUrl + '/employee/' + name;

                return $http.put(url, data).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.updateEmployeeByUsername() Error: ' + data);
                });
            },
            loginWithCred: function (credentials, successCallback, errorCallback) {
                return $http.put(baseUrl + '/login/', credentials).success(successCallback).error(errorCallback);
            }
        }
    });