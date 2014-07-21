angular.module('timecardReview')
    .controller('listCtrl', function ($scope, restFactory, locationFactory) {
        // Get all employees under active supervisor.
        restFactory.getAllEmployeesForActiveManager(function (data) {
            $scope.employees = data;
        });

        // Call a REST service to get a supervisors data.
        restFactory.getActiveManager(function (data) {
            $scope.manager = data;
        });

        // Get the loadByName service in this scope.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });