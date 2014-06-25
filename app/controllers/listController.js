angular.module('timecardReview')
    .controller('listCtrl', function ($scope, $location, $cookieStore, restService) {
        var id = $cookieStore.get('employeenumber');

        restService.get('supervisor/' + id, function(data) {
            $scope.employees = data;
        });

        $scope.loadById = function (id) {
            $location.path('/review/' + id);
        };
    });