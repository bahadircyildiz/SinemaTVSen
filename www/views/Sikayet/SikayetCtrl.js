module.exports = function ($scope, $ionicModal, $ionicPopover, $timeout, API) {
    // Form data for the login modal
    $scope.loginData = {};

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
    $scope.uye_no = 200;
    
    $scope.send_sikayet= function(){
        console.log('Submitted! ' + $scope.uye_no);
        API.request('ExcelHandler/get_debt', { uye_no: $scope.uye_no }).then(
            function(onSuccess){
                if(onSuccess.status == 200){
                    $scope.aidatList = onSuccess.data.content;
                }    
            }, function(onError){
                
            }
        )
    }

    
};