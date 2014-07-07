angular.module('timecardReview')
    .factory('relocateFactory', function($location, $window) {
        return {
            toReviewByName: function (name) {
                $location.path('/review/' + name);
            },
            toList: function() {
                $location.path('/list');
            },
            reloadWindow: function() {
                $window.location.reload(); // Refresh the page.
            }
        }
    });