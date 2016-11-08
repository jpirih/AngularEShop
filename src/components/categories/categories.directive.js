angular.module('app').directive('categoriesDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/categories-list.template.html',
        controller: CategoriesController
    }
});
