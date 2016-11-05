angular.module('app').controller('ProductDetailsController', function ($scope, ProductsFactory, $stateParams) {
    $scope.product = ProductsFactory.get({id: $stateParams.productId});
});
