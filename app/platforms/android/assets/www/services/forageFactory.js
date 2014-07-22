angular.module('timecardReview')
    .factory('forageFactory', function(URL) {
        // These functions should only be called in the case that the application is off-line.
        var url = URL + '/all/mslate'; // TO DO: Replace with login cookie user information.
        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                localforage.getItem(url, successCallback); 
            },
            getEmployeeByUsername: function (name, successCallback) {
                localforage.getItem(url, function (employees) {
                    for (var i = 0; i < employees.length; ++i) {
                        if (employees[i].userName === name) {
                            successCallback(employees[i]);
                        }
                    }
                });
            },
            updateEmployeeReviewed: function (employee, successCallback) {
                localforage.getItem(url, function (employees) {
                    employees[employee.index].timeCardReviewed = employee.timeCardReviewed;
                    employees[employee.index].isDirty = true;
                    localforage.setItem(url, employees, successCallback);
                });
            }
        }
    });