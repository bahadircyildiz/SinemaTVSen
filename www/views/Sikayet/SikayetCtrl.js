module.exports = function ($scope, $ionicModal, $ionicPopover, $ionicPopup, $state, API) {
    // Form data for the login modal
    $scope.$parent.AuthService.redirectControl();

    // var navIcons = document.getElementsByClassName('ion-navicon');
    // for (var i = 0; i < navIcons.length; i++) {
    //     navIcons.addEventListener('click', function () {
    //         this.classList.toggle('active');
    //     });
    // }

    // var fab = document.getElementById('fab');
    // fab.addEventListener('click', function () {
    //     //location.href = 'https://twitter.com/satish_vr2011';
    //     window.open('https://twitter.com/satish_vr2011', '_blank');
    // });

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

    
};