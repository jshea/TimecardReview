angular.module('timecardReview')
    .controller('listCtrl', function ($scope, URL, restFactory, locationFactory, forageFactory) {
        if ($scope.online) {
            // Get all employees under active supervisor.
            restFactory.getAllEmployeesForActiveManager(function (data) {
                $scope.employees = data;
                localforage.setItem(URL + '/all/' + data[0].manager.userName, data);
            });

            // Call a REST service to get a supervisors data.
            restFactory.getActiveManager(function (data) {
                $scope.manager = data;
                localforage.setItem(URL + '/employee/' + data.userName, data);
            });
        }
        else {
            forageFactory.getAllEmployeesForActiveManager(function (data) {
                $scope.employees = data;
                $scope.$digest();
            });

            forageFactory.getActiveManager(function (data) {
                $scope.manager = data;
                $scope.$digest();
            });
        }

        // Get the loadByName service in this scope.
        $scope.loadByName = locationFactory.toReviewPageByName;
    });