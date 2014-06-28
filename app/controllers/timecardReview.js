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
        return $location.path(); // Set a watcher on the path.
    }, function(newPath, oldPath) {  // If path changes we get the newPath and the oldPath.
        var cookie = $cookieStore.get('employeenumber'); // Get login cookie.

        if ((cookie === undefined) && newPath != '/login') {
            $location.path('/login'); // Redirect to login.
        }
    });

    $scope.logOut = function() {
        $cookieStore.remove('employeenumber'); // Remove cookie on logout.
    }
});