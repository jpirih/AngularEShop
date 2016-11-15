angular.module('app').directive('orderDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/order-form.template.html',
        controllerAs: 'OrderCtrl',
        controller: 'OrderController'
    };
});
