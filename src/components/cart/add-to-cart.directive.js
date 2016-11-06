/**
 * Created by janko on 04/11/2016.
 */
angular.module('app').directive('addToCartDirective', function () {
    return {
        restrict: 'E',
        scope: {id: '='},
        templateUrl: '/templates/add-to-cart.template.html',
        controller: addToCartController
    }
});

function addToCartController($scope, ProductsFactory, CartItemsFactory) {
    $scope.products = ProductsFactory.query({});
    var myCart = CartItemsFactory.items;
    $scope.quantity = 1;
    var cartItemsTotal = 0;
    var itemTotal = 0;
    var selectedItem = {};

    // add product to cart
    $scope.addToCart = function (id)
    {
        $scope.id = id;
        for (product in $scope.products)
        {
            if($scope.products[product].id == $scope.id)
            {
                selectedItem = $scope.products[product];
                itemTotal = selectedItem.price * $scope.quantity;
                myCart.push({product: selectedItem, quantity: $scope.quantity, total: itemTotal});
            }
        }
    };
}
