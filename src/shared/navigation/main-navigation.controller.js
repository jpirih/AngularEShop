angular.module('app').controller('MainNavigationController', function ($http, ProductsFactory, $state, CartItemsFactory, CategoriesFactory) {
    var vm = this;
    // navbar collapse
    vm.isNavCollapsed = true;
    vm.isCollapsed = false;

    // navbar product search
    vm.selected = "";
    vm.products = ProductsFactory.query({});
    vm.getItems = function (query) {
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params: {query: query}}).then(function (response) {
            return response.data;
        });
    };

    vm.getProductDetails = function (product) {
        $state.go('productDetails', {productId: product.id});
    };

    // navbar cart button
    vm.items = CartItemsFactory.items;

    // categories for dropdown menu
    vm.categories = CategoriesFactory.query({});
});
