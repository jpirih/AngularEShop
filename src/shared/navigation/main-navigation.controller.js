function MainNavigationController($scope,$http, ProductsFactory, $state, CartItemsFactory) {
    // navbar collapse
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;

    // navbar product search
    $scope.selected = "";
    $scope.products = ProductsFactory.query({});
    $scope.getItems = function (query) {
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params: {query: query}}).then(function (response) {
            return response.data;
        });
    };

    $scope.getProductDetails = function (product) {
        $state.go('productDetails', {productId: product.id});
    };

    // navbar cart button
    $scope.items = CartItemsFactory.items;
}
