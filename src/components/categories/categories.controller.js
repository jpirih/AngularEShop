/**
 * Created by janko on 08/11/2016.
 */
function CategoriesController(CategoriesFactory, $stateParams, CategoryProductsFactory, $state) {
    var vm = this;
    vm.categories = CategoriesFactory.query({});

    // category products loading Products sorted by category
    vm.loading = true;

    vm.categoryItems = CategoryProductsFactory.query({id: $stateParams.categoryId}, function (success) {
        vm.loading = false;
    });


    vm.thisCategory = $state.params.categoryData;
}