module.exports = function ($scope, $ionicLoading, $ionicPopover, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $stateParams, API) {
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
    
    $scope.options = {
        loop: false,
        effect: 'flip',
        speed: 500,
        nested: true,
        autoHeight: true
    }
    
    $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });
    
    $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
        console.log('Slide change is beginning');
    });
    
    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
        // note: the indexes are 0-based
        $scope.activeIndex = data.slider.activeIndex;
        $scope.previousIndex = data.slider.previousIndex;
    });
    
    $scope.disableSideMenu = function(){
        $ionicSideMenuDelegate.canDragContent(false);
    }
    $scope.enableSideMenu = function(){
        $ionicSideMenuDelegate.canDragContent(true);
    }
    
    
    API.wpRequest('categories').then(function onSuccess(result){
        var categories = {};
        result.data.forEach(function(val,index){
            categories[val.id] = val.name;
        })
        $scope.categories = categories;

    }, function onError(err){
        console.log(err);
    })
    
    
    $scope.$parent.loadingShow();
    API.wpRequest($stateParams.endpoint, {id: $stateParams.id}).then(function onSuccess(result){
        // $scope.dashboard = onSuccess;
        $scope.title = result.data.title.rendered;
        $scope.dashboard = [result.data];
        $scope.$parent.loadingHide();
    }, function onError(err){
        $scope.$parent.loadingHide();
        API.responseAlert(err);
    })
    
};