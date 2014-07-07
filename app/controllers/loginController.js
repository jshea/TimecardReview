angular.module('timecardReview')
    .controller('loginCtrl', function($scope, $window, $cookieStore, restFactory, relocateFactory) {

        // Login function activated when a user clicks Log In.
        $scope.login = function (user, pass) {
            restFactory.login({username: user, password: pass}) // Call the login REST service.
                .success(function (res) { // Upon success of the REST service.
                    $cookieStore.put('activeUser', user); // Store a login cookie.
                    $cookieStore.put('currentSupervisor', user); // Store a login cookie.

                    relocateFactory.toList(); // Change the page to the main employees list.
                })
                .error(function (error) { // Upon error of the REST service.
                    $scope.authenticationError = error; // Set the authentication error.
                });
        }
    });