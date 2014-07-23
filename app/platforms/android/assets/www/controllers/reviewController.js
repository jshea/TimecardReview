angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, URL, restFactory, locationFactory, chartFactory, exportFactory) {
        restFactory.getAllEmployeesForActiveManager(function (data) {
            $scope.employees = data;

            if ($scope.online) localforage.setItem(URL + '/all/' + 'mslate', data);
            else $scope.$digest();
        });

        restFactory.getEmployeeByUsername($routeParams.name, function (data) {
            $scope.employee = data;

            $scope.weeklyHoursChart = chartFactory.getWeeklyHoursBarChartData(data);
            $scope.accrualsChart = chartFactory.getAccrualsPieChartData(data);

            if (!$scope.online) $scope.$digest();
        });

        // Called to update employees reviewed status.
        $scope.updateReviewed = function () {
            restFactory.updateEmployeeReviewed($scope.employee.userName, $scope.employee, function (data) {
                    $scope.employee = data;
                    locationFactory.reloadRoute();
                }
            );
        }

        // Let the user export an employees timecard data.
        $scope.getCsvEmployee = exportFactory.getCsvEmployee;

        // Change to review page based on login name.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });