var timecardReviewApp = angular.module('timecardReview', ['ngRoute', 'ngCookies', 'angles']);

timecardReviewApp.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: './views/login.html'
    });
    
    $routeProvider.when('/list', {
        templateUrl: './views/list.html'
    });

    $routeProvider.when('/review/:name', {
        templateUrl: './views/review.html'
    });

    $routeProvider.when('/instructions', {
        templateUrl: './views/instructions.html'
    });

    $routeProvider.otherwise({
        templateUrl: './views/login.html'
    });
});

timecardReviewApp.controller('timecardReviewCtrl', function ($scope, $cookieStore, locationFactory) {
    //$scope.$watch(locationFactory.getCurrentPathLocation, locationFactory.loginRedirect);

    $scope.logOut = function() {
        //$cookieStore.remove('activeUser'); // Remove the active user cookie.
    }
});