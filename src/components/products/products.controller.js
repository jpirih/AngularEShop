angular.module('app').controller('ProductsController', function ($scope, ProductsFactory) {
    var vm = this;
    vm.loading = true;
    // search for product by name
    $scope.$watch('ProductsCtrl.query', function (newValue) {
        vm.products = ProductsFactory.query({query: newValue});
    });
    // list of all products /products
    vm.products = ProductsFactory.query({}, function (success) {
        vm.loading = false;
    });

});