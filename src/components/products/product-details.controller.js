angular.module('app').controller('ProductDetailsController', function (ProductsFactory, $stateParams) {
     var vm = this;
     vm.product = ProductsFactory.get({id: $stateParams.productId});
 });
