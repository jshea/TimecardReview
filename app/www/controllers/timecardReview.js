var timecardReviewApp = angular.module('timecardReview', ['ngRoute', 'angles', 'ngCsv']);

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

timecardReviewApp.constant('URL', 'http://localhost:3000');

timecardReviewApp.run(function($window, $rootScope, restFactory) {
    $rootScope.online = navigator.onLine;

    $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
            $rootScope.online = false;
        });
    }, false);

    $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
            if (!$rootScope.online) {
                restFactory.updateDirtyEmployees();
            }
            $rootScope.online = true;
        });
    }, false);
});

timecardReviewApp.controller('timecardReviewCtrl', function ($rootScope, $scope, locationFactory) {
    $scope.$watch(locationFactory.getCurrentPathLocation, locationFactory.loginRedirect);

    $scope.logOut = function() {
        $rootScope.activeManager = undefined;
        localforage.removeItem('activeManager');
    }
});