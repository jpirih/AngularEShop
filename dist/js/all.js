angular.module('app', ['ui.router']);

/**
 * Created by janko on 28/10/2016.
 */

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/'); 

    $stateProvider.state('index', {
        url: '/',
        templateUrl: '/templates/home.index.html'
    });

    $stateProvider.state('prva',
    {
        url:'/prva',
        template: '<h1>Prva stran</h1>'
    });

    $stateProvider.state('druga',
    {
        url:'/druga',
        template: '<h1>Druga stran</h1>'
    });

    $stateProvider.state('error', {
        url: '/error',
        template: '<h2>Page Not Found Error 404 </h2>'
    });

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: '/templates/about-template.html'
    });

    $stateProvider.state('terms', {
        url: '/terms',
        templateUrl: '/templates/terms.template.html'
    });

    $stateProvider.state('productDetails', {
        url: '/products/:productId',
        templateUrl: '/templates/product-details.template.html'
    });

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: '/templates/cart.template.html'
    });

    $stateProvider.state('orderComplete', {
        url: '/cart/order/:orderId/order-complete',
        templateUrl: '/templates/order-complete.template.html',
        controller: function ($scope, OrdersFactory, $stateParams) {
            $scope.orders = OrdersFactory.orders
            $scope.orderTotal = 0;
            for (order in $scope.orders)
            {
                if($stateParams.orderId == $scope.orders[order].id)
                {
                    $scope.currentOrder = $scope.orders[order];
                    for (item in $scope.currentOrder.products)
                    {
                        $scope.orderTotal = $scope.orderTotal + $scope.currentOrder.products[item].total;
                    }

                }
            }
        }
    });


});
angular.module('app').factory('CartItemsFactory', function () {
    var items = [];

    return {
        items: items
    };
});

// cart controller
angular.module('app').controller('CartController', function ($scope, CartItemsFactory, $stateParams) {
    $scope.items = CartItemsFactory.items;
    $scope.firstName = '';
    $scope.lastName = '';
    var cartTotal = 0;

    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
    }
    $scope.cartTotal = cartTotal
});

/**
 * Created by janko on 29/10/2016.
 */
angular.module('app').directive('homeDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/home.template.html'
    };
});

angular.module('app').controller('ProductDetailsController', function ($stateParams, $scope, ProductsFactory) {
    var products = ProductsFactory.products;
    var selectedProduct = {};
    for (product in products){
        if(products[product].id == $stateParams.productId){
            selectedProduct = products[product];
        }
    }
    $scope.product = selectedProduct;
});
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
angular.module('app').factory('ProductsFactory', function(){
	var products = [
		{
			id: 1,
			product_name: 'Kekec Pašteta',
			manufacturer:  'Osem d.o.o.',
			packingUnit: 'kos',
			nettQuantity: '75 gramov',
			price: 0.45,
			ean: '383000860420',
			description: "svinjsko mastno tkivo, voda, svinjska jetra, svinjskomeso, mlečna beljakovina, jedilna sol,dekstroza, začimbe,ojačevalec arome E 621, antioksidant E 300, barvilo E 120, konzervans E 250.",
			img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/3830008604200a.jpg'
		},
		{
			id: 2,
			product_name: 'Testenine Barilla, špageti, polnozr., št.5, 500g',
			manufacturer:  'BARILLA ADRIATIK',
			packingUnit: 'kos',
			nettQuantity: '500 gramov',
			price: 1.18,
			ean: '807680952941',
			description: "Najboljši špageti na svetu",
			img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/8076809529419-5.jpg'
		},
		{
			id: 3,
			product_name: 'Nutella, 3kg',
			manufacturer:  'MITTEL CO S.R.L. S.U',
			packingUnit: 'kos',
			nettQuantity: '3000 gramov',
			price: 20,
			ean: '800050013133',
			description: "Sladkor, rastlisko olje, lešniki 13%, manj masten kakav 7,4%, posneto mleko v prahu 6,6%, sirotka v prahu +, emulgator: lecitini (soja, vaniljin)",
			img: 'http://www.tuscc.si/cache/thumbs/53f199e7be0c845f10cc3ad6/600x600-c2/8000500131329.jpg'
		},

	];
	return {products: products};
});
angular.module('app').controller('OrderController', function ($scope, CartItemsFactory, OrdersFactory, $state, $stateParams) {
    // form fields
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.customerEmail = '';
    $scope.address = '';
    $scope.zipCode = null;
    $scope.city = '';
    $scope.country = '';
    $scope.products = CartItemsFactory.items;
    $scope.orders = OrdersFactory.orders;
    // place order
    $scope.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
    {
        var orderId = $scope.orders.length + 1;
        $scope.orders.push({
            id: orderId,
            firstName: firstName,
            lastName: lastName,
            email: customerEmail,
            address: address,
            zipCode: zipCode,
            city: city,
            country: country,
            products: $scope.products
        }) ;

        $state.go('orderComplete',{orderId: orderId});
    };



});

angular.module('app').directive('orderDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/order-form.template.html'
    };
});

angular.module('app').factory('OrdersFactory', function () {
   var orders = [];
    return {orders: orders}
});

/**
 * Created by janko on 26/10/2016.
 */
angular.module('app').directive('userDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/user.template.html'
    };
});
angular.module('app').controller('UsersController', function($scope){
	
});

/**
 * Created by janko on 28/10/2016.
 */
angular.module('app').directive('navigationDirective', function () {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: '/templates/navigation-template.html'
    };
});

