function OrderController (CartItemsFactory, OrdersFactory, $state, locker) {
    var vm = this;

    vm.products = CartItemsFactory.items;
    vm.orderDetails = locker.get('orderDetails', []);

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
        locker.put('orderDetails', newOrder);
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
    console.log(vm.orderDetails.data);
    // order complete // button Nazaj back to index on order review
    vm.orderComplete = function () {
        locker.forget('myCart');
        locker.forget('orderDetails');
        $state.go('index');
        return window.location.reload()

    }



}
