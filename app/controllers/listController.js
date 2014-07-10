angular.module('timecardReview')
    .controller('listCtrl', function ($scope, restFactory, locationFactory) {
        // Get all employees under active supervisor.
        restFactory.getAllEmployeesForActiveUser(function (data) {
            $scope.employees = data;
        });

        // Call a REST service to get a supervisors data.
        restFactory.getActiveEmployee(function (data) {
            $scope.supervisor = data;
        });

        // Get the loadByName service in this scope.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });