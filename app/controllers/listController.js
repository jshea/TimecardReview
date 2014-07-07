angular.module('timecardReview')
    .controller('listCtrl', function ($scope, $cookieStore, restFactory, relocateFactory) {
        $scope.activeUser = $cookieStore.get('activeUser');
        
        $scope.currentSupervisor = $cookieStore.get('currentSupervisor');

        // Call a REST service to get all the employees data under a supervisor.
        restFactory.get('/all/' + $scope.currentSupervisor, function(data) {
            $scope.employees = data;
        });

        // Call a REST service to get a supervisors data.
        restFactory.get('/employee/' + $scope.currentSupervisor, function (data) {
            $scope.supervisor = data;
        });

        // Tests to see if the logged in user is the supervisor.
        $scope.isActive = function () {
            return $scope.activeUser === $scope.currentSupervisor;
        }

        // Load the current employees supervisor.
        $scope.drillUp = function () { 
            $cookieStore.put('currentSupervisor', $scope.supervisor.manager.login);

            restFactory.get('all/' + $scope.supervisor.manager.login, function(data) {
                $scope.employees = data;
            });

            relocateFactory.reloadWindow();
        }

        // Load a new supervisor.
        $scope.loadNewSupervisor = function (name) {
            $cookieStore.put('currentSupervisor', name);

            restFactory.get('all/' + name, function(data) {
                $scope.employees = data;
            });

            relocateFactory.reloadWindow();
        }

        // Get the loadById service in this scope.
        $scope.loadByName = function (name) {
            relocateFactory.toReviewByName(name);
        }
    });