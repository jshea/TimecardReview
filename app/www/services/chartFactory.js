angular.module('timecardReview')
    .factory('chartFactory', function() {
        return {
            getWeeklyHoursBarChartData: function (employee) {
                return {
                        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        datasets: [
                            {
                                label: "Weekly Work Hours Distribution",
                                fillColor: "rgba(151,187,205,0.5)",
                                strokeColor: "rgba(151,187,205,0.8)",
                                highlightFill: "rgba(151,187,205,0.75)",
                                highlightStroke: "rgba(151,187,205,1)",
                                data: employee.laborhoursdistribution[0].hours
                            }
                        ]
                }
            },
            getAccrualsPieChartData: function (employee) {
                return [
                    {
                        value: employee.accrual.sick,
                        color:"#F7464A",
                        highlight: "#FF5A5E",
                        label: "Sick Days"
                    },
                    {
                        value: employee.accrual.vacation,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "Vacation Days"
                    },
                    {
                        value: employee.accrual.personalholiday,
                        color: "#FDB45C",
                        highlight: "#FFC870",
                        label: "Personal Holidays"
                    }
                ]
            }
        }
    });