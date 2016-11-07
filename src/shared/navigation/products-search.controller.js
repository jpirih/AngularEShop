angular.module('app').controller('ProductSearchController', function($scope, ProductsFactory){
    $scope.products = ProductsFactory.query({});
});