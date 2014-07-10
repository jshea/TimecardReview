angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, restFactory, locationFactory) {
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

            locationFactory.toReviewPageByName($scope.employee.login); // Change to review page based on login name.
            locationFactory.reloadWindow(); // Refresh the page.
        }

        // Change to review page based on login name.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });