// cart controller
angular.module('app').controller('CartController', function ($scope, CartItemsFactory, ProductsFactory) {
    $scope.products = ProductsFactory.query({});
    $scope.totalItems = 0;
    // cart template data
    $scope.items = CartItemsFactory.items;
    var cartTotal = 0;
    var cartItemstotal = 0;

    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
        $scope.totalItems = $scope.totalItems + $scope.items[item].quantity;
        console.log($scope.totalItems);


    }
    $scope.cartTotal = cartTotal;



});
