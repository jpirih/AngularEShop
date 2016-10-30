// cart controller
angular.module('app').controller('CartController', function ($scope, CartItemsFactory) {
    $scope.items = CartItemsFactory.items;
    var cartTotal = 0;

    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
    }
    $scope.cartTotal = cartTotal;
});
