module.exports = function ($scope, $ionicModal, $ionicPopover, $ionicPopup, $state, API) {
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
    
    
    $scope.formData = {
        uye_no: $scope.$parent.AuthService.currentUser.uye_no,
        gizli: false
    };
    
    $scope.sikayetList = [{name: "Hastalık"},{ name: "Fazla Mesai"}];
    
    $scope.send_sikayet= function(){
        console.log('Submitted! ' + $scope.uye_no);
        API.request('UserHandler/send_sikayet', $scope.formData).then(
            function(onSuccess){
                if(onSuccess.status == 200){
                    $scope.result = onSuccess.data;
                    $ionicPopup.alert({
                        title: "Bilgi",
                        template: "Şikayetiniz Gönderilmiştir."
                    })
                    $state.go("app.loggedin");
                }    
            }, function(onError){
                
            }
        )
    }

    $scope.goto = function(url){
        cordova.InAppBrowser.open(url, '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom');
    }

    
};