// cart controller
function CartController (CartItemsFactory, ProductsFactory, locker) {
    vm = this;
    vm.items = CartItemsFactory.items;
    vm.products = ProductsFactory.query({});
    vm.totalItems = 0;
    vm.quantity = 1;
    var itemTotal = 0;
    var selectedItem = {};
    
    
    

    // add product to cart
    vm.addToCart = function (id)
    {
        vm.id = id;
        for (product in vm.products)
        {
            if(vm.products[product].id == vm.id)
            {
                selectedItem = vm.products[product];
                itemTotal = selectedItem.price * vm.quantity;
                vm.items.push({product: selectedItem, quantity: vm.quantity, total: itemTotal});
            }
        }
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

}
