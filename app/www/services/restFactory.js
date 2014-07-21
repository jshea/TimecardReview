angular.module('timecardReview')
    .factory('restFactory', function($rootScope, $http, URL) {
        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                //var url = baseUrl + '/all/' + $cookieStore.get('activeUser');
                var url = URL + '/all/mslate';

                if ($rootScope.online) {
                    $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                        console.log('restFactory.getAllEmployeesForActiveManager() Error: ' + data);
                    });
                }
                else { // We are off-line.
                    localforage.getItem(url, successCallback);   
                }
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = URL + '/employee/' + name;

                $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.getEmployeeByUsername() Error: ' + data);
                });
            },
            getActiveManager: function (successCallback) {
                //var url = baseUrl + '/employee/' + $cookieStore.get('activeUser');
                var url = URL + '/employee/mslate';

                if ($rootScope.online) {
                    $http.get(url).success(successCallback).error(function (data, status, headers, config) {
                        console.log('restFactory.getActiveManager() Error: ' + data);
                    });
                }
                else {
                    localforage.getItem(url, successCallback);
                }
            },
            updateEmployeeByUsername: function(name, data, successCallback) {
                var url = URL + '/employee/' + name;

                $http.put(url, data).success(successCallback).error(function (data, status, headers, config) {
                    console.log('restFactory.updateEmployeeByUsername() Error: ' + data);
                });
            },
            loginWithCred: function (credentials, successCallback, errorCallback) {
                $http.put(URL + '/login/', credentials).success(successCallback).error(errorCallback);
            }
        }
    });