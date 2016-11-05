angular.module('app').controller('ProductsController', function ($stateParams, $scope, ProductsFactory) {
    // list of all products /products
    $scope.products = ProductsFactory.query({});

});