/**
 * Created by janko on 12/11/2016.
 */

function ClearCartController($scope, $uibModal, locker) {
    $scope.openModal = function ()
    {
        // opens modal window
        var modalInstance = $uibModal.open({

            templateUrl: '/templates/clear-cart-modal.template.html',
            controller: ClearCartModalController,
            resolve: {
                input: modalInput
            }
        });
        // when ok is clicked  clears myCart from local history
        modalInstance.result.then(function (success) {
            locker.forget('myCart');
            return window.location.reload();
        });
    }
}

// modal input  text inside modal
function modalInput() {
    return 'Res želite izprazniti košarico?';
}