angular.module('timecardReview')
    .factory('restFactory', function($http, $cookieStore) {
        var baseUrl = 'http://10.99.147.115:3000';

        return {
            getAllEmployeesForActiveUser: function (successCallback) {
                //var url = baseUrl + '/all/' + $cookieStore.get('activeUser');
                var url = baseUrl + '/all/' + 'mslate';

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getAllEmployeesForActiveUser() Error: ' + error);
                });
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = baseUrl + '/employee/' + name;

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getEmployeeByUsername() Error: ' + error);
                });
            },
            getActiveEmployee: function (successCallback) {
                //var url = baseUrl + '/employee/' + $cookieStore.get('activeUser');
                var url = baseUrl + '/employee/' + 'mslate';

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getActiveEmployee() Error: ' + error);
                });
            },
            updateEmployeeByUsername: function(name, data, successCallback) {
                var url = baseUrl + '/employee/' + name;

                return $http.put(url, data).success(successCallback).error(function (error) {
                    console.log('restFactory.updateEmployeeByUsername() Error: ' + error);
                });
            },
            loginWithCred: function (credentials, successCallback, errorCallback) {
                return $http.put(baseUrl + '/login/', credentials).success(successCallback).error(errorCallback);
            }
        }
    });