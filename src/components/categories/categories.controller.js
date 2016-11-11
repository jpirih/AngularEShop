/**
 * Created by janko on 08/11/2016.
 */
function CategoriesController($scope, CategoriesFactory, $stateParams, CategoryProductsFactory, $state) {
    vm = this;
    vm.categories = CategoriesFactory.query({});

    // category products loading Products sorted by category
    $scope.loading = true;

    vm.categoryItems = CategoryProductsFactory.query({id: $stateParams.categoryId}, function (success) {
        $scope.loading = false;
    });



    vm.thisCategory = $state.params.categoryData;
}