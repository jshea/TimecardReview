angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, $location, $window, restService) {
        var handleSuccess = function(data) {
            $scope.employee = data;
        }

        restService.get('/employees/' + $routeParams.empnum, handleSuccess)

        $scope.put = function () {
            restService.put('/employees/' + $scope.employee.employeenumber, $scope.employee, handleSuccess);

            $location.path('/review/' + $scope.employee.employeenumber);

            $window.location.reload(); // Refresh the page.
        }
    });