angular.module('timecardReview')
    .factory('locationFactory', function($location, $window, $cookieStore, $route) {
        return {
            toReviewPageByName: function (name) {
                $location.path('/review/' + name); // Change to an employee review page.
            },
            toListPage: function() {
                $location.path('/list'); // Change to list page.
            },
            loginRedirect: function(newPath, oldPath) {
                var cookie = $cookieStore.get('activeUser'); // Get login cookie.

                if ((cookie === undefined) && newPath != '/login') {
                    $location.path('/login'); // Redirect to login.
                }
            },
            getCurrentPathLocation: function () {
                return $location.path(); // Return the current path.
            },
            reloadWindow: function() {
                $window.location.reload(); // Refresh the page.
            },
            reloadRoute: function() {
                $route.reload(); // Refresh the page.
            }
        }
    });