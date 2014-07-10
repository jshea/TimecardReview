angular.module('timecardReview')
    .controller('loginCtrl', function($scope, $cookieStore, restFactory, locationFactory) {

        // Login function activated when a user clicks Log In.
        $scope.login = function (user, pass) {
            restFactory.loginWithCred({username: user, password: pass}, 
                function() { // Call the login REST service.
                    $cookieStore.put('activeUser', user); // Store a login cookie.
                    locationFactory.toListPage(); // Change the page to the main employees list.
                }, 
                function(error) {
                    $scope.authenticationError = error;
            });
        }
    });