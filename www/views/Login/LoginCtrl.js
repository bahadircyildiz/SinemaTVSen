module.exports = function ($scope, $ionicPopover, $timeout, $state, API) {
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
    $scope.formData = {};
    $scope.login = function(){
        var endpoint, params;
        endpoint = 'SMSHandler/send_auth_key';
        params = $scope.formData,
        API.request(endpoint, params).then(
            function(onSuccess){
                $state.go('app.verify', {secret: onSuccess.data.secret, gsm: $scope.formData.gsm});
            }, function(onError){
                API.responseAlert(onError);
            })
    }

    
};