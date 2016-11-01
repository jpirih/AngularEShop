// cart controller
angular.module('app').controller('CartController', function ($scope, CartItemsFactory, $stateParams) {
    $scope.items = CartItemsFactory.items;
    $scope.firstName = '';
    $scope.lastName = '';
    var cartTotal = 0;

    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
    }
    $scope.cartTotal = cartTotal
});
