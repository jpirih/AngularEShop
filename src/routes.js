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
        controller: function ($scope, $stateParams, CategoryProductsFactory, CategoriesFactory) {
            $scope.loading = true;
            $scope.categoryItems = CategoryProductsFactory.query({id: $stateParams.categoryId}, function (success) {
                $scope.loading = false;
            });
            var categories = CategoriesFactory.query({});
            console.log(categories.category);
            for(item in categories)
            {
                if(categories[item].id == $stateParams.categoryId)
                {
                    console.log(categories[item]);
                }
            }
            console.log($scope.thisCategory);

        }
    });

    $stateProvider.state('orderComplete', {
        url: '/cart/order/order-complete',
        templateUrl: '/templates/order-complete.template.html'
    });


});