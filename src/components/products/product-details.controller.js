 function ProductDetailsController(ProductsFactory, $stateParams) {
     var vm = this;
     vm.product = ProductsFactory.get({id: $stateParams.productId});
 }
