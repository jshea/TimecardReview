angular.module('timecardReview')
    .factory('restFactory', function(URL, $rootScope, httpFactory, forageFactory) {
        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                if ($rootScope.online) {;
                    httpFactory.getAllEmployeesForActiveManager(successCallback);
                }
                else {
                    forageFactory.getAllEmployeesForActiveManager(successCallback);
                }
            },
            getEmployeeByUsername: function (name, successCallback) {
                if ($rootScope.online) {
                    httpFactory.getEmployeeByUsername(name, successCallback);
                }
                else {
                    forageFactory.getEmployeeByUsername(name, successCallback);
                }
            },
            updateEmployeeReviewed: function (name, data, successCallback) {
                if ($rootScope.online) {
                    httpFactory.updateEmployeeReviewedByUsername(name, data, successCallback);
                }
                else {
                    forageFactory.updateEmployeeReviewed(data, successCallback);
                }
            },
            updateDirtyEmployees: function () {
                var url = URL + '/all/mslate';
                localforage.getItem(url, function (employees) {
                    for (var i = 0; i < employees.length; ++i) {
                        if (employees[i].isDirty) {
                            httpFactory.updateEmployeeReviewedByUsername(employees[i].userName, employees[i], function (data) {
                                console.log("Successfully updated dirty employees!");
                            });
                        }
                    }
                });
            }
        }
    });