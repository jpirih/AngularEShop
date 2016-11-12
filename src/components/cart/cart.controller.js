// cart controller
function CartController ($scope, CartItemsFactory, ProductsFactory, locker, $state) {
    vm = this;
    vm.items = CartItemsFactory.items;
    vm.products = ProductsFactory.query({});
    vm.totalItems = 0;
    $scope.quantity = 1;
    var itemTotal = 0;
    var selectedItem = {};

    // add product to cart
    vm.addToCart = function (product)
    {
        selectedItem = product;
        itemTotal = $scope.quantity * product.price;
        vm.items.push({product: selectedItem, quantity: $scope.quantity, total: itemTotal});
        locker.put('myCart', vm.items)
    };
    

    // cart template data
    var cartTotal = 0;
    for (item in vm.items)
    {
        cartTotal = cartTotal += vm.items[item].total;
        vm.totalItems = vm.totalItems + vm.items[item].quantity;
    }
    // Order Total amount to pay
    vm.cartTotal = cartTotal;

    // empty my cart - delete all products from the cart
    vm.emptyCart = function () {
        locker.forget('myCart');
        return window.location.reload();
    };


}
