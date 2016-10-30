angular.module('app').controller('ProductDetailsController', function ($stateParams, $scope, ProductsFactory) {
    var products = ProductsFactory.products;
    var selectedProduct = {};
    for (product in products){
        if(products[product].id == $stateParams.productId){
            selectedProduct = products[product];
        }
    }
    $scope.product = selectedProduct;
});