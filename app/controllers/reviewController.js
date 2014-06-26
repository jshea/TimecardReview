angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, $location, $window, $cookieStore, restService, loadService) {
        var setOneEmployee = function(data) {
            $scope.employee = data;
        }

        var setAllEmployees = function(data) {
            $scope.employees = data;
        }

        restService.get('/employees/' + $routeParams.empnum, setOneEmployee);

        restService.get('/supervisor/' + $cookieStore.get('employeenumber'), setAllEmployees);

        $scope.put = function () {
            restService.put('/employees/' + $scope.employee.employeenumber, $scope.employee, setOneEmployee);

            $location.path('/review/' + $scope.employee.employeenumber);
            $window.location.reload(); // Refresh the page.
        }

        $scope.loadById = loadService.byId;
    });