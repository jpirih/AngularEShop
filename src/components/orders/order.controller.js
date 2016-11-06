angular.module('app').controller('OrderController', function ($scope, CartItemsFactory, OrdersFactory, $state, $stateParams) {
    // form fields
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.customerEmail = '';
    $scope.address = '';
    $scope.zipCode = null;
    $scope.city = '';
    $scope.country = '';
    $scope.products = CartItemsFactory.items;
    $scope.orders = OrdersFactory.orders;
    var products = [];

    for (item in $scope.products)
    {
        products.push({
            id: $scope.products[item].product.id,
            quantity: $scope.products[item].quantity
        });
    }
    // place order
    $scope.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
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

        newOrder.$save().then(function success(status) {
            $state.go('orderComplete');

        });

    };



});
