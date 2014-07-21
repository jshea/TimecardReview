angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, restFactory, locationFactory, chartFactory, exportFactory) {
        // Get all employees under a active supervisor.
        restFactory.getAllEmployeesForActiveManager(function (data) {
            $scope.employees = data;
        });
        
        // Get a single employee to review.
        restFactory.getEmployeeByUsername($routeParams.name, function (data) {
            $scope.employee = data;
            $scope.weeklyHoursChart = chartFactory.getWeeklyHoursBarChartData(data);
            $scope.accrualsChart = chartFactory.getAccrualsPieChartData(data);
        });

        // Called to update employees reviewed status.
        $scope.updateReviewed = function () {
            restFactory.updateEmployeeByUsername($scope.employee.userName, $scope.employee, 
                function (data) {
                    $scope.employee = data;
                }
            );
            locationFactory.reloadRoute();
        }

        // Let the user export an employees timecard data.
        $scope.getCsvEmployee = exportFactory.getCsvEmployee;

        // Change to review page based on login name.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });