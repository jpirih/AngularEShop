/**
 * Created by janko on 12/11/2016.
 */
// products on sale directive controller
angular.module('app').controller('OnSaleProductsController', function (ProductsFactory) {
    var vm = this;
    vm.loading = true;
    vm.products = ProductsFactory.query({onlyOnSale: true}, function (success) {
        vm.loading = false;
    });

});