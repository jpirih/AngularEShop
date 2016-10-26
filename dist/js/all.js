angular.module('app', []);

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