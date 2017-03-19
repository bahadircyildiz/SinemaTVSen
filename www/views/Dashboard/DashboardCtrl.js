module.exports = function ($scope, $ionicModal, $ionicPopover, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $timeout, API, $sce) {
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
        console.log(result);
    }, function onError(err){
        console.log(err);
    })
    
    
    
    API.wpRequest('posts').then(function onSuccess(result){
        // $scope.dashboard = onSuccess;
        result.data.forEach(function(val,index){
            var doc = document.createElement('div');
            doc.innerHTML = val.content.rendered;
            var avia_content = [];
            // var parser = new DOMParser(), doc = parser.parseFromString(val.content.rendered, "text/xml")
            var images = doc.querySelectorAll('.aviaccordion-image, img[data-avia-tooltip], .av-masonry-image-container img');
            if(images.length > 0){
                var tmp = document.createElement('div'), textPart = doc.querySelectorAll('.av_textblock_section, .av-special-heading');
                // console.log(textPart, typeof textPart);
                textPart.forEach(function(elem, index){
                    tmp.appendChild(elem);
                })
                val.content.rendered = tmp.innerHTML;
                images.forEach(function(elem, index){
                    avia_content.push(elem.attributes.src.value);
                });
                if (avia_content.length != 0) val.avia_content = avia_content;
            } else{
                val.content.rendered = $sce.trustAsHtml(val.content.rendered);
                val.title.rendered = $sce.trustAsHtml(val.title.rendered);    
            }
        })
        $scope.dashboard = result.data;
    }, function onError(err){
        console.log(err);    
    })
    
};