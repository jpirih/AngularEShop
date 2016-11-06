angular.module('app').controller('ProductsController', function ($stateParams, $scope, ProductsFactory) {
    $scope.loading = true;
    // search for product by name
    $scope.$watch('query', function (newValue) {
        $scope.products = ProductsFactory.query({query: newValue});
    });
    // list of all products /products
    $scope.products = ProductsFactory.query({}, function (success) {
        $scope.loading = false;
    });

});