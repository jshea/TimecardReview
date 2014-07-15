angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, restFactory, locationFactory, $route) {
        // Get all employees under a active supervisor.
        restFactory.getAllEmployeesForActiveUser(function (data) {
            $scope.employees = data;
        });
        
        // Get a single employee to review.
        restFactory.getEmployeeByUsername($routeParams.name, function (data) {
            $scope.employee = data;
        });

        // Called to update employees reviewed status.
        $scope.updateReviewed = function () {
            restFactory.updateEmployeeByUsername($scope.employee.login, $scope.employee, 
                function (data) {
                    $scope.employee = data;
                }
            );
            locationFactory.reloadRoute();
        }

        // Change to review page based on login name.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });