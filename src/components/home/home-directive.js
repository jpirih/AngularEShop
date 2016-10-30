/**
 * Created by janko on 29/10/2016.
 */
angular.module('app').directive('homeDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/home.template.html'
    };
});
