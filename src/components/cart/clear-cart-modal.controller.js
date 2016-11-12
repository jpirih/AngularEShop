/**
 * Created by janko on 12/11/2016.
 */
function ClearCartModalController ($scope, $uibModalInstance, input) {
    $scope.data = input;

    $scope.ok = function () {
        $uibModalInstance.close('Success');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}