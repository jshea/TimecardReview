angular.module('timecardReview')
    .controller('listCtrl', function ($scope, $cookieStore, restService, loadService) {
        restService.get('supervisor/' + $cookieStore.get('employeenumber'), function(data) {
            $scope.employees = data;
        });

        $scope.loadById = loadService.byId;
    });