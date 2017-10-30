module.exports = function ($scope, $ionicHistory, $ionicPopover, $ionicLoading, $ionicSideMenuDelegate, $ionicPopup, $state, AuthService) {
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
        { name: "Güncel Haberler", state: "app.dashboard"},
        { name: "Sinema Tv Sendikası", state: "app.descriptive", params: {endpoint: "pages", id:333}, items: [
            { name: "Sendikamız", state: "app.descriptive", params: {endpoint: "pages", id:112} },
            { name: "Biz Kimiz", state: "app.descriptive", params: {endpoint: "pages", id:114} },
            { name: "Faaliyet Raporları", state: "app.descriptive", params: {endpoint: "pages", id:642} },
            { name: "Sıkça Sorulan Sorular", state: "app.descriptive", params: {endpoint: "pages", id:151} },
            { name: "İletişim", state: "app.descriptive", params: {endpoint: "pages", id:153} }
            ] },
        { name: "Hedeflerimiz", state: "app.descriptive", params: {endpoint: "pages", id:156}, items: [
            { name: "Çalışma Saatleri", state: "app.descriptive", params: {endpoint: "pages", id:158} },
            { name: "İş Sağlığı ve İşçi Güvenliği", state: "app.descriptive", params: {endpoint: "pages", id:160} },
            { name: "Mesleki Yeterlilik", state: "app.descriptive", params: {endpoint: "pages", id:162} }
            ] },
        { name: "Birimler", state: "app.descriptive", params: {endpoint: "pages", id:138}, items: [
            { name: "Hukuk Birimi", state: "app.descriptive", params: {endpoint: "pages", id:396} },
            { name: "Sinema Birimi", state: "app.descriptive", params: {endpoint: "pages", id:140} },
            { name: "Dizi Birimi", state: "app.descriptive", params: {endpoint: "pages", id:144} },
            { name: "Reklam Birimi", state: "app.descriptive", params: {endpoint: "pages", id:146} },
            { name: "Tv Programları Birimi", state: "app.descriptive", params: {endpoint: "pages", id:148} },
            { name: "Post Prodüksiyon", state: "app.descriptive", params: {endpoint: "pages", id:766} }
            ] },
        { name: "Ulusal Meslek Standartları", state: "app.descriptive", params: {endpoint: "pages", id:695}, items: [
            { name: "Reji UMS", state: "app.descriptive", params: {endpoint: "pages", id:668} },
            { name: "Kamera Asistanı UMS", state: "app.descriptive", params: {endpoint: "pages", id:703} },
            { name: "Kostüm Ekipleri UMS", state: "app.descriptive", params: {endpoint: "pages", id:747} },
            { name: "Sanat Yönetmeni UMS", state: "app.descriptive", params: {endpoint: "pages", id:736} },
            { name: "Yönetmen (Film) UMS", state: "app.descriptive", params: {endpoint: "pages", id:727} }
            ] },
        { name: "Üyelik", state: "app.descriptive", params: {endpoint: "pages", id:218}, items: [
            { name: "Başvuru Formu", state: "app.descriptive", params: {endpoint: "pages", id:529} },
            ] },
        { name: "Sözleşmeler", state: "app.descriptive", params: {endpoint: "pages", id:769} }
    ];
    
    var loginMenuGroup = { name:"Üye Girişi", state: "app.login" };
    
    $scope.toggleGroup = function(group, event) {
        event.stopPropagation();
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }   
    };
    
    $scope.goto = function(group){
        if(group.state){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $ionicSideMenuDelegate.toggleLeft();
            if(group.params && group.params.id == -1){
                $ionicPopup.alert({
                    title: "Sayfamız Yapım Aşamasındadır",
                    template: ""
                })
            } else if (group.params){
                $state.go(group.state, group.params);
            } else {
                $state.go(group.state);
            }
        }
    }
    
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    
    $scope.AuthService = AuthService;
    
    $scope.refreshStatus = function(){
        if(menuGroups.indexOf(loginMenuGroup) >= 0) menuGroups.splice(menuGroups.indexOf(loginMenuGroup), 1);
        if(AuthService.isLoggedIn()){
            loginMenuGroup = { name: AuthService.name(), state: "app.loggedin"};
        } 
        else {
            loginMenuGroup = { name:"Üye Girişi", state: "app.login" };
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