 function ProductDetailsController(ProductsFactory, $stateParams) {
     vm = this;
    vm.product = ProductsFactory.get({id: $stateParams.productId});
}
