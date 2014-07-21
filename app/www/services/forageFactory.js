angular.module('timecardReview')
    .factory('forageFactory', function(URL) {
        // These functions should only be called in the case that the application is off-line.
        return {
            getAllEmployeesForActiveManager: function (successCallback) {
                var url = URL + '/all/mslate';
                localforage.getItem(url, successCallback); 
            },
            getEmployeeByUsername: function (name, successCallback) {
                var url = URL + '/employee/' + name;
                localforage.getItem(url, successCallback);
            },
            getActiveManager: function (successCallback) {
                var url = URL + '/employee/mslate';
                localforage.getItem(url, successCallback);
            },
            updateEmployeeByUsername: function (name, data, successCallback) {
                var url = URL + '/employee/' + name;
                data.isDirty = true;
                localforage.setItem(url, data, successCallback);
            },
            updateAllDirtyEmployeesForActiveManager: function () {
                var url = URL + '/all/mslate';
            }
        }
    });