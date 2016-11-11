angular.module('app').factory('CartItemsFactory', function (locker) {
    var items = locker.get('myCart', []);

    return {
        items: items
    };
});
