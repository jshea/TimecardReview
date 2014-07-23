angular.module('timecardReview')
    .factory('exportFactory', function(URL) {
        return {
            getCsvEmployee: function (employee) {
                var result = [];

                var employeeProperties = [
                    'firstName', 'lastName', 'userName', 'employeeNumber', 'orgNumber',
                    'workWeek', 'weekEnding', 'timeClass', 'timeCardStatus', 'timeCardReviewed',
                    'accruals', 'laborHoursDist', 'paidLeave', 'wams', 'manager'
                ];

                for (var i = 0; i < employeeProperties.length; i += 1) {
                    if (employeeProperties[i] === 'accruals') {
                        result.push({name:'ACCRUALS', a:'vacation', b:employee['accruals']['vacation'], c:'holiday', d:employee['accruals']['holiday'], e:'sick', f:employee['accruals']['sick']});
                    }
                    else if (employeeProperties[i] === 'laborHoursDist') {
                        for (var j = 0; j < employee['laborHoursDist'].length; j += 1) {
                            var emp = employee['laborHoursDist'][j];
                            result.push({name:'PROJECT', a:'projectNumber', b:emp['projectNumber'], c:'projectName', d:emp['projectName'], e:'task', f:emp['task'], g:'svCode', h:emp['svCode'], i:'description', j:emp['description'], k:'percentage', l:emp['percentage'], m:'comments', n:emp['comments'], o:'hours', p:emp['hours']});
                        }
                    }
                    else if (employeeProperties[i] === 'paidLeave') {
                        for (var j = 0; j < employee['paidLeave'].length; j += 1) {
                            var emp = employee['paidLeave'][j];
                            result.push({name:'PAID-LEAVE', a:'payCode', b:emp['payCode'], c:'hours', d:emp['hours'], e:'comments', f:emp['comments']});
                        }
                    }
                    else if (employeeProperties[i] === 'wams') {
                        for (var j = 0; j < employee['wams'].length; j += 1) {
                            var emp = employee['wams'][j];
                            result.push({name:'WAM', a:'projectNumber', b:emp['projectNumber'], c:'projectName', d:emp['projectName'], e:'from', f:emp['from'], g:'to', h:emp['to'], i:'chargeable', j:emp['chargeable']});
                        }
                    }
                    else if (employeeProperties[i] === 'manager') {
                        result.push({name:'MANAGER', a:'firstName', b:employee['firstName'], c:'lastName', d:employee['lastName'], e:'userName', f:employee['userName'], g:'employeeNumber', h:employee['employeeNumber']});
                    }
                    else {
                        result.push({a:employeeProperties[i], b:employee[employeeProperties[i]]});
                    }
                }

                return function() { return result; }
            },
            getJsonEmployeeUrl: function (name) {
                return URL + '/employee/' + name;
            }
        }
    });