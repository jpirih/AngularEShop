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
        controllerAs: 'ProductDetailCtrl',
        controller: 'ProductDetailsController'
    });
    // all products list
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: '/templates/products.template.html',
        controllerAs: 'ProductsCtrl',
        controller: 'ProductsController'
    });
    // my cart
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: '/templates/cart.template.html',
        controllerAs: 'CartCtrl',
        controller: 'CartController'
    });

    // category products
    $stateProvider.state('categoryProducts', {
        url:'/categories/:categoryId/products',
        params: {categoryData: null},
        templateUrl: 'templates/category-products.template.html',
        controllerAs: 'CategoriesCtrl',
        controller: 'CategoriesController'
    });

    // order review
    $stateProvider.state('orderComplete', {
        url: '/cart/order/order-complete',
        params: {data: null},
        templateUrl: '/templates/order-complete.template.html',
        controllerAs: 'OrderCtrl',
        controller: 'OrderController'
    });


});