angular.module('app').directive('categoriesDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/categories-list.template.html',
        controller: categoriesDirectiveController
    }
});

function categoriesDirectiveController($scope, CategoriesFactory) {
    $scope.categories = CategoriesFactory.query({});

}
