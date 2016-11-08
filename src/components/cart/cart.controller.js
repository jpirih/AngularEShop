// cart controller
function CartController ($scope, CartItemsFactory, ProductsFactory) {
    $scope.items = CartItemsFactory.items;
    $scope.products = ProductsFactory.query({});
    $scope.totalItems = 0;
    $scope.quantity = 1;
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
                $scope.items.push({product: selectedItem, quantity: $scope.quantity, total: itemTotal});
            }
        }
    };

    // cart template data
    var cartTotal = 0;
    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
        $scope.totalItems = $scope.totalItems + $scope.items[item].quantity;
    }
    // Order Total amount to pay
    $scope.cartTotal = cartTotal;

}
