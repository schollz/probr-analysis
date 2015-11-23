'use strict';

angular.module('probrAnalysisCommon')
    .controller('AnalysisNavbarCtrl', function ($scope, $state, $stateParams, $location, Packet) {

        var params = { startTimestamp: $stateParams.startTimestamp, endTimestamp: $stateParams.endTimestamp, tags: $stateParams.tags };

        $scope.menu = [
            {
                'title': 'Log',
                'link': $state.href('packets', params)
            },
            {
                'title': 'Utilization',
                'link': $state.href('utilization', params)
            },
            {
                'title': 'Location',
                'link': $state.href('heatmap', params)
            },
            {
                'title': 'Stats',
                'link': $state.href('devices', params)
            },
        ];

        Packet.query({distinct: 'tags'}, function (resultObj) {
            $scope.tags = resultObj;
        });

        $scope.selectTag = function (tag) {
            $scope.selectedTag = tag;
        }

        // DatePicker
        $scope.datePickerDate = {startDate: parseInt($stateParams.startTimestamp) || null, endDate: parseInt($stateParams.endTimestamp) || null};
        $scope.selectedTag = $stateParams.tags || null;

        $scope.$watchGroup(['datePickerDate', 'selectedTag'], function () {
            $location.search({
                tags: $scope.selectedTag,
                startTimestamp: $scope.datePickerDate.startDate == undefined ? new Date().getTime() - 60 * 24 * 24 : $scope.datePickerDate.startDate.valueOf(),
                endTimestamp: $scope.datePickerDate.endDate == undefined ? new Date().getTime() : $scope.datePickerDate.endDate.valueOf()
            });
        });

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.isActiveRoot = function (route) {
            var subStr = $location.path().split("/")[1];
            return route.slice(0, subStr.length) == subStr;
        };

    });