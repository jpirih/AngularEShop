angular.module('app').directive('orderDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/order-form.template.html'
    };
});
