/**
 * Created by janko on 12/11/2016.
 */
angular.module('app').directive('clearCart', function () {
    return {
        restrict: 'E',
        controller: ClearCartController,
        template: '<button class="btn btn-danger" ng-click="openModal()">Izprazni Košarico</button>'
    };
});



