module.exports = function ($scope, $ionicModal, $ionicPopover, $timeout, API) {
    // Form data for the login modal

    $scope.$parent.AuthService.redirectControl();

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">SinemaTVSen Beta</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       Deneme Uygulamasi' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    var uye_no = $scope.$parent.AuthService.currentUser.uye_no;
    
    $scope.get_debt = function(){
        API.request('UserHandler/get_debt', { uye_no: uye_no }).then(
            function(onSuccess){
                if(onSuccess){
                    $scope.aidatList = onSuccess.data;
                }    
            }, function(onError){
                
            }
        )
    }
    
    $scope.get_debt();

    
};