/**
 * Created by janko on 12/11/2016.
 */
angular.module('app').controller('ClearCartModalController', function ($uibModalInstance, input) {
    var vm = this;
    vm.data = input;

    vm.ok = function () {
        $uibModalInstance.close('Success');
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
});