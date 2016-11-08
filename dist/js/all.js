angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap']);

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
    // testing stateProvider routes
    $stateProvider.state('druga',
    {
        url:'/druga',
        template: '<h1>Druga stran</h1>'
    });

    $stateProvider.state('error', {
        url: '/error',
        template: '<h2>Page Not Found Error 404 </h2>'
    });

    // static sites

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: '/templates/about-template.html'
    });

    $stateProvider.state('terms', {
        url: '/terms',
        templateUrl: '/templates/terms.template.html'
    });

    // app routes
    $stateProvider.state('productDetails', {
        url: '/products/:productId',
        templateUrl: '/templates/product-details.template.html'
    });

    $stateProvider.state('products', {
        url: '/products',
        templateUrl: '/templates/products.template.html'
    });

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: '/templates/cart.template.html'
    });

    // category products
    $stateProvider.state('categoryProducts', {
        url:'/categories/:categoryId/products',
        templateUrl: 'templates/category-products.template.html',
        controller: function ($scope, $stateParams, CategoryProductsFactory, CategoriesFactory)
        {
            $scope.loading = true;
            $scope.categoryItems = CategoryProductsFactory.query({id: $stateParams.categoryId}, function (success) {
                $scope.loading = false;
            });


        }
    });

    $stateProvider.state('orderComplete', {
        url: '/cart/order/order-complete',
        params: {data: null},
        templateUrl: '/templates/order-complete.template.html'
    });


});
/**
 * Created by janko on 04/11/2016.
 */
angular.module('app').directive('addToCartDirective', function () {
    return {
        restrict: 'E',
        scope: {id: '='},
        templateUrl: '/templates/add-to-cart.template.html',
        controller: addToCartController
    }
});

function addToCartController($scope, ProductsFactory, CartItemsFactory) {
    $scope.products = ProductsFactory.query({});
    var myCart = CartItemsFactory.items;
    $scope.quantity = 1;
    var cartItemsTotal = 0;
    var itemTotal = 0;
    var selectedItem = {};

    // add product to cart
    $scope.addToCart = function (id)
    {
        $scope.id = id;
        for (product in $scope.products)
        {
            if($scope.products[product].id == $scope.id)
            {
                selectedItem = $scope.products[product];
                itemTotal = selectedItem.price * $scope.quantity;
                myCart.push({product: selectedItem, quantity: $scope.quantity, total: itemTotal});
            }
        }
    };
}

angular.module('app').factory('CartItemsFactory', function () {
    var items = [];

    return {
        items: items
    };
});

// cart controller
angular.module('app').controller('CartController', function ($scope, CartItemsFactory, ProductsFactory) {
    $scope.products = ProductsFactory.query({});
    $scope.totalItems = 0;
    // cart template data
    $scope.items = CartItemsFactory.items;
    var cartTotal = 0;
    var cartItemstotal = 0;

    for (item in $scope.items)
    {
        cartTotal = cartTotal += $scope.items[item].total;
        $scope.totalItems = $scope.totalItems + $scope.items[item].quantity;
        console.log($scope.totalItems);


    }
    $scope.cartTotal = cartTotal;



});

angular.module('app').directive('categoriesDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/categories-list.template.html',
        controller: categoriesDirectiveController
    }
});

function categoriesDirectiveController($scope, CategoriesFactory) {
    $scope.categories = CategoriesFactory.query({});

}

/**
 * Created by janko on 05/11/2016.
 */
angular.module('app').factory('CategoriesFactory', function ($resource, $cacheFactory) {
   return $resource('http://smartninja.betoo.si/api/eshop/categories');

});
angular.module('app').factory('CategoryProductsFactory', function ($resource) {
    return $resource('http://smartninja.betoo.si/api/eshop/categories/:id/products');
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
    var products = [];


    for (item in $scope.products)
    {
        products.push({
            id: $scope.products[item].product.id,
            quantity: $scope.products[item].quantity
        });
    }
    // place order
    $scope.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
    {
        var newOrder = new OrdersFactory({
            firstName: firstName,
            lastName: lastName,
            email: customerEmail,
            address: address,
            zip: zipCode,
            city: city,
            country: country,
            products: products
        });

        newOrder.$save(function (response) {

            $scope.msg = {msg: response.status};
            $state.go('orderComplete', {data: $scope.msg});
            console.log($scope.msg);
        });
    };

    $scope.resData = $state.params.data;



});

angular.module('app').directive('orderDirective', function () {
    return {
        restrict: 'E',
        templateUrl: '/templates/order-form.template.html'
    };
});

angular.module('app').factory('OrdersFactory', function ($resource) {
   return $resource('http://smartninja.betoo.si/api/eshop/orders');
});

angular.module('app').controller('ProductDetailsController', function ($scope, ProductsFactory, $stateParams) {
    $scope.product = ProductsFactory.get({id: $stateParams.productId});
});

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
angular.module('app').controller('ProductsController', function ($stateParams, $scope, ProductsFactory) {
    $scope.loading = true;
    // search for product by name
    $scope.$watch('query', function (newValue) {
        $scope.products = ProductsFactory.query({query: newValue});
    });
    // list of all products /products
    $scope.products = ProductsFactory.query({}, function (success) {
        $scope.loading = false;
    });

});
angular.module('app').factory('ProductsFactory', function($resource, $cacheFactory) {
	/*var products = [
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

	 ];*/
	return $resource('http://smartninja.betoo.si/api/eshop/products/:id');
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

angular.module('app').controller('NavbarCollapseController', function($scope){
   $scope.isNavCollapsed = true;
  $scope.isCollapsed = false; 
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


angular.module('app').controller('ProductSearchController', function($scope, $http, ProductsFactory, $state){
    $scope.selected = "";
    $scope.products = ProductsFactory.query({});
    $scope.getItems = function (query) {
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params: {query: query}}).then(function (response) {
            return response.data;
        });
    };

    $scope.getProductDetails = function (product) {

        $scope.product = ProductsFactory.get({productId: product.id});
        console.log($scope.product.id);
        $state.go('productDetails', {productId: $scope.product.id});

    }
});