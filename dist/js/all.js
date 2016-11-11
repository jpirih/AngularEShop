angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular-locker']);

angular.module('app').config(function(lockerProvider){
   lockerProvider.defaults({
       driver: 'local',
       mespace: 'app'
   }); 
});
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

    // product details
    $stateProvider.state('productDetails', {
        url: '/products/:productId',
        templateUrl: '/templates/product-details.template.html',
        controller: ProductDetailsController
    });
    // all products list
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: '/templates/products.template.html',
        controller: ProductsController
    });
    // my cart
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: '/templates/cart.template.html',
        controllerAs: 'CartCtrl',
        controller: CartController
    });

    // category products
    $stateProvider.state('categoryProducts', {
        url:'/categories/:categoryId/products',
        params: {categoryData: null},
        templateUrl: 'templates/category-products.template.html',
        controllerAs: 'CategoriesCtrl',
        controller: CategoriesController
    });

    $stateProvider.state('orderComplete', {
        url: '/cart/order/order-complete',
        params: {data: null},
        templateUrl: '/templates/order-complete.template.html',
        controllerAs: 'OrderCtrl',
        controller: OrderController
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
        controllerAs: 'CartCtrl',
        controller: CartController
    }
});
angular.module('app').factory('CartItemsFactory', function (locker) {
    var items = locker.get('myCart', []);

    return {
        items: items
    };
});

// cart controller
function CartController (CartItemsFactory, ProductsFactory, locker) {
    vm = this;
    vm.items = CartItemsFactory.items;
    vm.products = ProductsFactory.query({});
    vm.totalItems = 0;
    vm.quantity = 1;
    var itemTotal = 0;
    var selectedItem = {};
    
    
    

    // add product to cart
    vm.addToCart = function (id)
    {
        vm.id = id;
        for (product in vm.products)
        {
            if(vm.products[product].id == vm.id)
            {
                selectedItem = vm.products[product];
                itemTotal = selectedItem.price * vm.quantity;
                vm.items.push({product: selectedItem, quantity: vm.quantity, total: itemTotal});
            }
        }
        locker.put('myCart', vm.items)
    };
    

    // cart template data
    var cartTotal = 0;
    for (item in vm.items)
    {
        cartTotal = cartTotal += vm.items[item].total;
        vm.totalItems = vm.totalItems + vm.items[item].quantity;
    }
    // Order Total amount to pay
    vm.cartTotal = cartTotal;

}

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
angular.module('app').directive('categoriesDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/categories-list.template.html',
        controllerAs: 'CategoriesCtrl',
        controller: CategoriesController
    }
});

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
 * Created by janko on 09/11/2016.
 */
function HomeDirectiveController(ProductsFactory) {
    vm = this;

    vm.interval = 3000;
    vm.productsOnSale = ProductsFactory.query({onlyOnSale: true});
}

/**
 * Created by janko on 29/10/2016.
 */
angular.module('app').directive('homeDirective', function () {
    return {
        scope: {},
        restrict: 'E',
        templateUrl: '/templates/home.template.html',
        controllerAs: 'HomeDirCtrl',
        controller: HomeDirectiveController
    };
});

function OrderController (CartItemsFactory, OrdersFactory, $state, locker) {
    vm = this;
    // form fields
    vm.firstName = '';
    vm.lastName = '';
    vm.customerEmail = '';
    vm.address = '';
    vm.zipCode = null;
    vm.city = '';
    vm.country = '';
    vm.products = CartItemsFactory.items;
    vm.orders = OrdersFactory.orders;
    var products = [];


    for (item in vm.products)
    {
        products.push({
            id: vm.products[item].product.id,
            quantity: vm.products[item].quantity
        });
    }
    // place order
    vm.orderUP = function (firstName, lastName, customerEmail, address, zipCode, city, country)
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
        // save order to api server
        newOrder.$save(function (response) {
            // get saving order response message
            vm.msg = {msg: response.status};
            $state.go('orderComplete', {data: vm.msg});
            console.log(vm.msg);
        });
    };
    // order success message
    vm.resData = $state.params.data;



}

angular.module('app').directive('orderDirective', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: '/templates/order-form.template.html',
        controllerAs: 'OrderCtrl',
        controller: OrderController
    };
});

angular.module('app').factory('OrdersFactory', function ($resource) {
   return $resource('http://smartninja.betoo.si/api/eshop/orders');
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

function MainNavigationController($http, ProductsFactory, $state, CartItemsFactory, CategoriesFactory) {
    vm = this;
    // navbar collapse
    vm.isNavCollapsed = true;
    vm.isCollapsed = false;

    // navbar product search
    vm.selected = "";
    vm.products = ProductsFactory.query({});
    vm.getItems = function (query) {
        return $http.get('http://smartninja.betoo.si/api/eshop/products', {params: {query: query}}).then(function (response) {
            return response.data;
        });
    };

    vm.getProductDetails = function (product) {
        $state.go('productDetails', {productId: product.id});
    };

    // navbar cart button
    vm.items = CartItemsFactory.items;

    // categories for dropdown menu
    vm.categories = CategoriesFactory.query({});
}

/**
 * Created by janko on 28/10/2016.
 */
angular.module('app').directive('navigationDirective', function () {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: '/templates/navigation-template.html',
        controllerAs: 'MainNavCtrl',
        controller: MainNavigationController
    };
});


 function ProductDetailsController($scope, ProductsFactory, $stateParams) {
    $scope.product = ProductsFactory.get({id: $stateParams.productId});
}

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
function ProductsController ($scope, ProductsFactory) {
    $scope.loading = true;
    // search for product by name
    $scope.$watch('query', function (newValue) {
        $scope.products = ProductsFactory.query({query: newValue});
    });
    // list of all products /products
    $scope.products = ProductsFactory.query({}, function (success) {
        $scope.loading = false;
    });

}
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
	return $resource('http://smartninja.betoo.si/api/eshop/products/:id', {}, {
		query: {isArray: true}
	});
});