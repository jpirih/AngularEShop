function OrderController (CartItemsFactory, OrdersFactory, $state, locker) {
    vm = this;
    // form fields
    vm.firstName = '';
    vm.lastName = '';
    vm.customerEmail = '';
    vm.address = '';
    vm.zipCode = null;
    vm.city = '';
    vm.country = '';
    vm.products = CartItemsFactory.items;
    vm.orders = OrdersFactory.orders;
    var products = [];


    for (item in vm.products)
    {
        products.push({
            id: vm.products[item].product.id,
            quantity: vm.products[item].quantity
        });
    }
    // place order
    vm.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
    {
        var newOrder = new OrdersFactory({
            firstName: firstName,
            lastName: lastName,
            email: customerEmail,
            address: address,
            zip: zipCode,
            city: city,
            country: country,
            products: products
        });
        // save order to api server
        newOrder.$save(function (response) {
            // get saving order response message
            vm.msg = {msg: response.status};
            $state.go('orderComplete', {data: vm.msg});
            console.log(vm.msg);
        });
    };
    // order success message
    vm.resData = $state.params.data;



}
