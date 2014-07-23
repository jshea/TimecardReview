angular.module('timecardReview')
    .controller('listCtrl', function ($scope, URL, restFactory, locationFactory) {
        restFactory.getAllEmployeesForActiveManager(function (data) {
            $scope.employees = data;

            if ($scope.online) localforage.setItem(URL + '/all/' + 'mslate', data);
            else $scope.$digest();
        });

        // Get the loadByName service in this scope.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });