angular.module('app').controller('ProductSearchController', function($scope, $http, ProductsFactory, $state){
    $scope.selected = "";
    $scope.products = ProductsFactory.query({});
    $scope.getItems = function (query) {
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params: {query: query}}).then(function (response) {
            return response.data;
        });
    };

    $scope.getProductDetails = function (product) {

        $scope.product = ProductsFactory.get({productId: product.id});
        $state.go('productDetails', {productId: product.id});

    }
});