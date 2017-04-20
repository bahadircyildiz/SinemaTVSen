module.exports = function ($scope, $ionicModal, $ionicPopover, $ionicLoading, $timeout, $state, AuthService) {
    // Form data for the login modal

    $scope.loadingShow = function(text = "<ion-spinner></ion-spinner>") {
        $ionicLoading.show({
            template: text
        });
    };
    $scope.loadingHide = function() {
        $ionicLoading.hide();
    };
    
    var menuGroups = [
        { name: "Yayın Akışı", link: "dashboard"},
        { name: "Deneme Grup", items: [
            { name: "Grup Alti 1", link: "dashboard" },
            { name: "Grup Alti 2", link: "dashboard" }
            ] }
        ];
    
    var loginMenuGroup = { name:"Giriş", link: "login" };
    
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }   
    };
    
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    
    $scope.AuthService = AuthService;
    
    $scope.refreshStatus = function(){
        if(menuGroups.indexOf(loginMenuGroup) >= 0) menuGroups.splice(menuGroups.indexOf(loginMenuGroup), 1);
        if(AuthService.isLoggedIn()){
            loginMenuGroup = { name: AuthService.name(), link: "loggedin"};
        } 
        else {
            loginMenuGroup = { name:"Giriş", link: "login" };
        }
        menuGroups.push(loginMenuGroup);
        $scope.menuGroups = menuGroups;   
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