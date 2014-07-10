angular.module('timecardReview')
    .factory('restFactory', function($http, $cookieStore) {
        return {
            getAllEmployeesForActiveUser: function (successCallback) {
                var url = '/all/' + $cookieStore.get('activeUser');

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getAllEmployeesForActiveUser() Error: ' + error);
                });
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = '/employee/' + name;

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getEmployeeByUsername() Error: ' + error);
                });
            },
            getActiveEmployee: function (successCallback) {
                var url = '/employee/' + $cookieStore.get('activeUser');

                return $http.get(url).success(successCallback).error(function (error) {
                    console.log('restFactory.getActiveEmployee() Error: ' + error);
                });
            },
            updateEmployeeByUsername: function(name, data, successCallback) {
                var url = '/employee/' + name;

                return $http.put(url, data).success(successCallback).error(function (error) {
                    console.log('restFactory.updateEmployeeByUsername() Error: ' + error);
                });
            },
            loginWithCred: function (credentials, successCallback, errorCallback) {
                return $http.put('/login/', credentials).success(successCallback).error(errorCallback);
            }
        }
    });