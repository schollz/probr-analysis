'use strict';

angular.module('probrAnalysisApp')
  .directive('probrPacketSearch', function () {
    return {
      restrict: 'E',
      scope: {
        query: '=',
        onSubmit: '&',
        pageLength: '=',
        filters: '='
      },
      templateUrl: 'components/probr/probrPacketSearch/probrPacketSearch.html',
      link: function ($scope, element, attrs) {

        $scope.fields = ['mac_address_src: ', 'mac_address_dst: ', 'lat: ', 'lon: ', 'tags: ', 'ssid: ', 'signal_strength: ', 'limit', 'skip'];

        $scope.submitInput = function () {
          if ($scope.typeaheadQuery.split(':', 2)[1] === undefined || $scope.typeaheadQuery.split(':', 2)[1].length <= 1) return;

          var params = $scope.typeaheadQuery.split(':', 1);
          var fieldName = params[0];
          var fieldContent = $scope.typeaheadQuery.substr($scope.typeaheadQuery.indexOf(':'), $scope.typeaheadQuery.length).replace(/:/g, '').trim();

          if ($scope.filters === undefined) {
            $scope.filters = {};
          }

          $scope.filters[fieldName] = fieldContent;
          $scope.typeaheadQuery = '';
        }

        $scope.removeLabel = function (key) {
          delete $scope.filters[key];
        }

        $scope.search = function () {
          $scope.query = angular.copy($scope.filters);
          $scope.onSubmit({query: $scope.query});
        }

      }
    };
  });