angular.module('timecardReview')
    .controller('loginCtrl', function($scope, $location, $cookieStore, restService) {
        $scope.login = function (user, pass) {
            $scope.credentials = {
                username: user,
                password: pass
            }

            restService.login($scope.credentials)
                .success(function (res) {
                    $cookieStore.put('employeenumber', '1');
                    $location.path('/list');
                })
                .error(function (error) {
                    $scope.authenticationError = error;
                });
        }
    });