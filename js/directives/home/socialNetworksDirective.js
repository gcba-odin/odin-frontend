angular.module('store-directives-home')
.directive("socialNetworks", function() {
    return {
        restrict: "E",
        templateUrl: "directives/home/social-networks.html",
        controller: SocialNetworkController,
        controllerAs: "socialnetworks"
    };
});
