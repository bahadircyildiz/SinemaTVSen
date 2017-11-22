module.exports = function ($scope, $ionicModal, $ionicPopover, $timeout, API) {
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
    var user = $scope.$parent.AuthService.currentUser;
    $scope.user = [
        { key:"Adı Soyadı" , val: user.adi+' '+user.soyadi},
        { key:"Üye Numarası" , val: user.uye_no},
        { key:"Telefon" , val: user.telefon},
        { key:"E-mail" , val: user.email},
        { key:"Ödeme Tipi" , val: user.odeme_tipi},
        { key:"Birim" , val: user.birim},
        { key:"Tutar" , val: user.tutar+" TL"}    
    ]
    
    
};