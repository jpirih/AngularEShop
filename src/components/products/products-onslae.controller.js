/**
 * Created by janko on 12/11/2016.
 */
// products on sale directive controller
function OnSaleProductsController ($scope, ProductsFactory) {
    vm = this;
    $scope.loading = true;
    vm.products = ProductsFactory.query({onlyOnSale: true}, function (success) {
        $scope.loading = false;
    });

}