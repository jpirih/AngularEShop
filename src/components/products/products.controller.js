function ProductsController ($scope, ProductsFactory) {
    vm = this;
    $scope.loading = true;
    // search for product by name
    $scope.$watch('query', function (newValue) {
        $scope.products = ProductsFactory.query({query: newValue});
    });
    // list of all products /products
    vm.products = ProductsFactory.query({}, function (success) {
        $scope.loading = false;
    });

}