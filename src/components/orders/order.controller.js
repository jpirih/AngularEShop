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
    // place order
    $scope.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
    {
        var orderId = $scope.orders.length + 1;
        $scope.orders.push({
            id: orderId,
            firstName: firstName,
            lastName: lastName,
            email: customerEmail,
            address: address,
            zipCode: zipCode,
            city: city,
            country: country,
            products: $scope.products
        }) ;

        $state.go('orderComplete',{orderId: orderId});
    };



});
