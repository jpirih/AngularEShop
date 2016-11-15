
angular.module('app').controller('CartController', function(CartItemsFactory, ProductsFactory, locker, $state) {
    var vm = this;
    vm.items = CartItemsFactory.items;
    vm.products = ProductsFactory.query({});
    vm.totalItems = 0;
    vm.quantity = 1;
    var itemTotal = 0;
    var selectedItem = {};


    // add product to cart
    vm.addToCart = function (product)
    {
        selectedItem = product;
        itemTotal = vm.quantity * product.price;
        vm.items.push({product: selectedItem, quantity: vm.quantity, total: itemTotal});
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

    // remove item form cart
    vm.removeItem = function (item)
    {
        var index = vm.items.indexOf(item);
        vm.items.splice(index, 1);

    }
});
