angular.module('timecardReview')
    .controller('loginCtrl', function($scope, $location, $cookieStore, restService) {
        $scope.login = function (user, pass) {
            restService.login({username: user, password: pass})
                .success(function (res) {
                    $cookieStore.put('employeenumber', '1');
                    $location.path('/list');
                })
                .error(function (error) {
                    $scope.authenticationError = error;
                });
        }
    });