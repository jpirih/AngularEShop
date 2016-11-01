angular.module('app').directive('productsDirective', function ()
{
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/products.template.html',
		controller: ProductsDirectiveController
	}
});

// productsFactory controller
function ProductsDirectiveController ($scope, ProductsFactory, CartItemsFactory) {
	$scope.products = ProductsFactory.products;
	var myCart = CartItemsFactory.items;
	var cartItemsTotal = 0;
	var selectedItem = {};
	// add product to cart
	$scope.addToCart = function (id)
	{
		for(item in $scope.products)
		{
			if($scope.products[item].id == id)
			{
				selectedItem = $scope.products[item];
				myCart.push({ product: selectedItem, quantity: 1, total: $scope.products[item].price});
				cartItemsTotal ++;
			}
		}
		console.log(myCart);
	};
}