angular.module('odin.controllers')
.controller('SocialsController', SocialsController);

function SocialsController($scope, $location) {
    $scope.shareUrl = $location.absUrl();
    $scope.collapsed = false;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };
    $scope.currentColor = sessionStorage.getItem('currentColor') || '';
}
