angular.module('app').directive('onSaleDirective', function ()
{
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/on-sale.template.html',
		controllerAs: 'OnSaleCtrl',
		controller: OnSaleProductsController
	}
});
