/**
 * Created by janko on 09/11/2016.
 */
function HomeDirectiveController($scope, ProductsFactory) {

    $scope.interval = 3000;
    $scope.productsOnSale = ProductsFactory.query({onlyOnSale: true});



}
