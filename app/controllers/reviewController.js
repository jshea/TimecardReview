angular.module('timecardReview')
    .controller('reviewCtrl', function ($scope, $routeParams, $cookieStore, restFactory, relocateFactory) {
        
        // Get all employees under a certain supervisor.
        restFactory.get('/all/' + $cookieStore.get('currentSupervisor'), function (data) {
            $scope.employees = data;
        });
        
        // Get a single employee to review.
        restFactory.get('/employee/' + $routeParams.name, function (data) {
            $scope.employee = data;
        });

        // Get a Twilio capability token from the server.
        restFactory.getToken(function (token) {
            Twilio.Device.setup(token); 
        });

        // Make a Twilio call.
        $scope.call = function () {
            Twilio.Device.connect({
                CallerId:'+14085983269', // My Twilio number.
                PhoneNumber:'+19092700137' // Number to call.
            });
        }

        // Hang up a Twilio call.
        $scope.hangUp = function () {
            Twilio.Device.disconnectAll();
        }

        // Called to update employees reviewed status.
        $scope.updateReviewed = function () {
            restFactory.put('/employee/' + $scope.employee.login, $scope.employee, function (data) {
                $scope.employee = data;
            });

            relocateFactory.toReviewByName($scope.employee.login); // Change to review page based on login name.
            relocateFactory.reloadWindow(); // Refresh the page.
        }

        // Change label based on employee reviewed status.
        $scope.labelReviewed = function(employee) {
            return employee.reviewed ? "label-success" : "label-danger";
        }

        // Change to review page based on login name.
        $scope.loadByName = function (name) {
            relocateFactory.toReviewByName(name);
        }
    });