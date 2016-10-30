/**
 * Created by janko on 28/10/2016.
 */
angular.module('app').directive('navigationDirective', function () {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: '/templates/navigation-template.html'
    };
});

