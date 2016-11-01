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