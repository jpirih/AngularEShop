/**
 * Created by janko on 09/11/2016.
 */
function HomeDirectiveController(ProductsFactory) {
    var vm = this;

    vm.interval = 3000;
    vm.productsOnSale = ProductsFactory.query({onlyOnSale: true});
}
