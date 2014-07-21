angular.module('timecardReview')
    .controller('listCtrl', function ($scope, URL, restFactory, locationFactory) {
        // Get all employees under active supervisor.
        restFactory.getAllEmployeesForActiveManager(function (data) {
            $scope.employees = data;

            if ($scope.online) {
                localforage.setItem(URL + '/all/' + data[0].manager.userName, data);
            }
            else {
                $scope.$digest();
            }
        });

        // Call a REST service to get a supervisors data.
        restFactory.getActiveManager(function (data) {
            $scope.manager = data;

            if ($scope.online) {
                localforage.setItem(URL + '/employee/' + data.userName, data);
            }
            else {
                $scope.$digest();
            }
        });

        // Get the loadByName service in this scope.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });