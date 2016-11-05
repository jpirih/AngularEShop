angular.module('app').factory('CategoryProductsFactory', function ($resource) {
    return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');
});
