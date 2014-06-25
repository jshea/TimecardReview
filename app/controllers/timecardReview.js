var timecardReviewApp = angular.module('timecardReview', ['ngRoute', 'ngCookies']);

timecardReviewApp.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/views/login.html'
    });
    
    $routeProvider.when('/list', {
        templateUrl: '/views/list.html'
    });

    $routeProvider.when('/review/:empnum', {
        templateUrl: '/views/review.html'
    });

    $routeProvider.when('/instructions', {
        templateUrl: '/views/instructions.html'
    });

    $routeProvider.otherwise({
        templateUrl: '/login'
    });
});

timecardReviewApp.controller('timecardReviewCtrl', function ($scope, $location, $cookieStore) {
    $scope.$watch( function() { 
        return $location.path(); 
    }, function(newValue, oldValue) {  
        if (($cookieStore.get('employeenumber') === undefined) && newValue != '/login'){  
            $location.path('/login');  
        }
    });

    $scope.logOut = function() {
        $cookieStore.remove('employeenumber');
    }
});