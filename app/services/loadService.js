angular.module('timecardReview')
    .factory('loadService', function($location) {
        return {
            byId: function (id) {
                return $location.path('/review/' + id);
            }
        }
    });