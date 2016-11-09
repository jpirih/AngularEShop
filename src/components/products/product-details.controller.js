 function ProductDetailsController($scope, ProductsFactory, $stateParams) {
    $scope.product = ProductsFactory.get({id: $stateParams.productId});
}
