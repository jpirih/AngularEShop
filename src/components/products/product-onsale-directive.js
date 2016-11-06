angular.module('app').directive('onSaleDirective', function ()
{
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/on-sale.template.html',
		controller: OnSaleProductsController
	}
});

// productsFactory controller
function OnSaleProductsController ($scope, ProductsFactory) {
	$scope.loading = true;
	$scope.products = ProductsFactory.query({onlyOnSale: true}, function (success) {
		$scope.loading = false;
	});

}