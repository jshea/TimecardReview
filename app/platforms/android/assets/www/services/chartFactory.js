angular.module('timecardReview')
    .factory('chartFactory', function() {
        return {
            getWeeklyHoursBarChartData: function (employee) {
                // Sum the work totals for each project account.
                var resultArr = [0, 0, 0, 0, 0, 0, 0];
                angular.forEach(employee.laborHoursDist, function (project) {
                    for (i = 0; i < project.hours.length; i++) {
                        resultArr[i] += project.hours[i];
                    }
                });

                return {
                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        datasets: [
                            {
                                label: "Weekly Work Hours Distribution",
                                fillColor: "rgba(151,187,205,0.5)",
                                strokeColor: "rgba(151,187,205,0.8)",
                                highlightFill: "rgba(151,187,205,0.75)",
                                highlightStroke: "rgba(151,187,205,1)",
                                data: resultArr
                            }
                        ]
                }
            },
            getAccrualsPieChartData: function (employee) {
                return [
                    {
                        value: employee.accruals.sick,
                        color:"#F7464A",
                        highlight: "#FF5A5E",
                        label: "Sick Days"
                    },
                    {
                        value: employee.accruals.vacation,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Vacation Days"
                    },
                    {
                        value: employee.accruals.holiday,
                        color: "#FDB45C",
                        highlight: "#FFC870",
                        label: "Personal Holidays"
                    }
                ]
            }
        }
    });