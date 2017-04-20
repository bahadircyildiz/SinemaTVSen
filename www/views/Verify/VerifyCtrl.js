module.exports = function ($scope, $ionicModal, $ionicPopover, $stateParams, $ionicHistory, $state, API) {
    // Form data for the login modal
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
        secret: $stateParams.secret,
        gsm: $stateParams.gsm
    };
    $scope.verify = function(){
        var endpoint, params;
        endpoint = 'SMSHandler/check_auth_key';
        params = $scope.formData;
        API.request(endpoint, params).then(
            function(onSuccess){
                $scope.$parent.AuthService.login(onSuccess.data);
                console.log($scope.$parent.AuthService.name());
                $scope.$parent.refreshStatus();
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.loggedin", {}, {location: "replace"});
            }, function(onError){
                API.responseAlert(onError);
            })
    }

    
};