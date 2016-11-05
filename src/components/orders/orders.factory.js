angular.module('app').factory('OrdersFactory', function ($resource) {
   return $resource('http://smartninja.betoo.si/api/eshop/orders');
});
