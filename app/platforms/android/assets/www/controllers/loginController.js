angular.module('timecardReview')
    .controller('loginCtrl', function($rootScope, $scope, httpFactory, locationFactory) {
        // Login function activated when a user clicks Log In.
        $scope.login = function (user, pass) {
            httpFactory.loginWithCred({username: user, password: pass}, 
                function() { // Call the login REST service.
                    localforage.setItem('activeManager', user);
                    $rootScope.activeManager = user;
                    locationFactory.toListPage(); // Change the page to the main employees list.
                }, 
                function(error) {
                    $scope.authenticationError = error;
            });
        }
    });