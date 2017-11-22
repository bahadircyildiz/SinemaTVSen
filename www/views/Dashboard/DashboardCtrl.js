module.exports = function ($scope, $ionicLoading, $ionicModal, $ionicPopover, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $timeout, API, $ionicScrollDelegate) {
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
    
    var page = 1, totalPages;
    $scope.dashboard = [];
    $scope.loadmore = true;

    $scope.loadContent = function(){
        API.wpRequest('posts', {page: page}).then(function onSuccess(result){
            $scope.dashboard = $scope.dashboard.concat(result.data);
            var totalPages = result.headers("X-WP-TotalPages");
            page++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if(page>2)$scope.loadmore = page<totalPages;
        }, function onError(err){
            console.log(err);    
        })
    }

    
};