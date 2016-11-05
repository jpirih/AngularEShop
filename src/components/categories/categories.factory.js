/**
 * Created by janko on 05/11/2016.
 */
angular.module('app').factory('CategoriesFactory', function ($resource, $cacheFactory) {
   return $resource('http://smartninja.betoo.si/api/eshop/categories');

});