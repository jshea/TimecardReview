angular.module('timecardReview')
    .factory('twilioFactory', function($http) {
        return {
            getCapabilityToken: function(callback) {
                return $http.get('/twilio/token').success(callback).error(function (error) {
                    console.log('twilioFactory.token() Error: ' + error);
                });
            },
            makeCall: function(number) {
                return function() {
                    Twilio.Device.connect({
                        CallerId:'', // My Twilio number.
                        PhoneNumber:number // Number to call.
                    });
                }
            },
            hangUpCall: function() {
                return function() {
                    Twilio.Device.disconnectAll();
                }
            }
        }
    });