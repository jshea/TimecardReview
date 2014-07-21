angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, URL, restFactory, locationFactory, chartFactory, exportFactory, forageFactory) {
        if ($scope.online) {
            // Get all employees under a active supervisor.
            restFactory.getAllEmployeesForActiveManager(function (data) {
                $scope.employees = data;
                localforage.setItem(URL + '/all/' + data[0].manager.userName, data);
            });
            
            // Get a single employee to review.
            restFactory.getEmployeeByUsername($routeParams.name, function (data) {
                $scope.employee = data;
                localforage.setItem(URL + '/employee/' + data.userName, data);

                $scope.weeklyHoursChart = chartFactory.getWeeklyHoursBarChartData(data);
                $scope.accrualsChart = chartFactory.getAccrualsPieChartData(data);
            });
        }
        else {
            forageFactory.getAllEmployeesForActiveManager(function (data) {
                $scope.employees = data;
                $scope.$digest();
            });

            forageFactory.getEmployeeByUsername($routeParams.name, function (data) {
                $scope.employee = data;
                $scope.$digest();
            });
        }

        // Called to update employees reviewed status.
        $scope.updateReviewed = function () {
            if ($scope.online) {
                restFactory.updateEmployeeByUsername($scope.employee.userName, $scope.employee, 
                    function (data) {
                        $scope.employee = data;
                        locationFactory.reloadRoute();
                    }
                );
            }
            else {
                forageFactory.updateEmployeeByUsername($scope.employee.userName, $scope.employee, 
                    function (data) {
                        $scope.employee = data;
                        for (var i = 0; i < $scope.employees.length; ++i) {
                            if ($scope.employees[i].userName === $scope.employee.userName) {
                                $scope.employees[i] = $scope.employee;
                                localforage.setItem(URL + '/all/' + $scope.employee.manager.userName, $scope.employees);
                            }
                        }
                        locationFactory.reloadRoute();
                    }
                );
            }
        }

        // Let the user export an employees timecard data.
        $scope.getCsvEmployee = exportFactory.getCsvEmployee;

        // Change to review page based on login name.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });