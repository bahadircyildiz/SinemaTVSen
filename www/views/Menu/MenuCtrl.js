module.exports = function ($scope, $ionicModal, $ionicPopover, $ionicLoading, $timeout, AuthService) {
    // Form data for the login modal

    $scope.loadingShow = function(text = "<ion-spinner></ion-spinner>") {
        $ionicLoading.show({
            template: text
        });
    };
    $scope.loadingHide = function() {
        $ionicLoading.hide();
    };
        
    var MenuObj = { 
        dashboard: "Yayın Akışı"
    }
    
    $scope.AuthService = AuthService;
    
    $scope.refreshStatus = function(){
        if(AuthService.isLoggedIn()){
            delete MenuObj.login;
            MenuObj.loggedin = AuthService.name();  
        } 
        else {
            delete MenuObj.loggedin;
            MenuObj.login = "Giriş";   
        }
        
        $scope.MenuObj = MenuObj;   
    }
    
    $scope.refreshStatus();
    
    var navIcons = document.getElementsByClassName('ion-navicon') ? document.getElementsByClassName('ion-navicon') : false;
    if(navIcons) for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    } 

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
};