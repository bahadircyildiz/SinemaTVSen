module.exports = function ($scope, $ionicLoading, $ionicModal, $ionicPopover, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $timeout, API, $sce) {
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
    
    
    $scope.$parent.loadingShow();
    API.wpRequest('posts').then(function onSuccess(result){
        // $scope.dashboard = onSuccess;
        result.data.forEach(function(val,index){
            var doc = document.createElement('div');
            doc.innerHTML = val.content.rendered;
            
            //Seperating Texts
            // var tmp = document.createElement('div'); 
            // var textPart = doc.querySelectorAll('.av_textblock_section, .av-special-heading');
            // textPart.forEach(function(elem, index){
            //     tmp.appendChild(elem);
            // })
            
            //Seperating Images
            var images = doc.querySelectorAll('.aviaccordion-spacer, .aviaccordion-image, img[data-avia-tooltip], .av-masonry-image-container img');
            var avia_content = [];
            images.forEach(function(elem, index){
                if(elem.attributes.src) avia_content.push(elem.attributes.src.value);
            });
            if (avia_content.length != 0) {
                val.avia_content = avia_content;
                for (var j = images.length-1; j >= 0; j--) {
                    if (images[j].parentNode) {
                        images[j].parentNode.removeChild(images[j]);
                    }
                }
            }
            
            //Modifying Links
            var links = doc.getElementsByTagName('a');
            for(var x=0; x < links.length; x++){
                var href = links[x].getAttribute('href');
                links[x].setAttribute('onclick', "window.open('"+href+"', '_system');");
                links[x].removeAttribute('href');
            }
            
            val.content.rendered = $sce.trustAsHtml(doc.innerHTML);
            val.title.rendered = $sce.trustAsHtml(val.title.rendered);
        })
        $scope.dashboard = result.data;
        $scope.$parent.loadingHide();
    }, function onError(err){
        console.log(err);    
    })
    
};