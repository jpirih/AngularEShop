/**
 * Created by janko on 08/11/2016.
 */
function CategoriesController($scope, CategoriesFactory, $stateParams, CategoryProductsFactory) {
    $scope.categories = CategoriesFactory.query({});

    // category products loading Products sorted by category
    $scope.loading = true;
    $scope.categoryItems = CategoryProductsFactory.query({id: $stateParams.categoryId}, function (success) {
        $scope.loading = false;
    });
}