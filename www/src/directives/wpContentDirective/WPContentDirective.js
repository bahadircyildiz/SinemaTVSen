var WPContentDirective = function(app){
  app.directive('wpContent', [ '$compile', function(compile){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: "=",
      },
      link: function (scope, element, attrs){
        //Compiling prepared html to scope
        var targetElem = element[0].children[1];
        targetElem.innerHTML = scope.content;
        compile(targetElem)(scope);
      },
      templateUrl: "src/directives/wpContentDirective/wpContentTemplate.html",
      controller: function($scope, $window, $sce, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate, API){

        $scope.openLink = function(src){
          cordova.InAppBrowser.open(src, '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom');
        }

        $ionicModal.fromTemplateUrl('src/directives/wpContentDirective/imageModalTemplate.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });

        $scope.openModal = function() {
          $scope.modal.show();
        };
    
        $scope.closeModal = function() {
          $scope.modal.hide();
        };
    
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
        });
        $scope.$on('modal.shown', function() {
          console.log('Modal is shown!');
        });

        $scope.showImage = function(src) {
          $scope.imgSrc = src;
          $scope.openModal();
        }

        function sliderTemplate(slideIndex){
          var DOMText = '<image-scroll images="slideArray['+slideIndex+']"></image-scroll>';
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = DOMText;
          return tempDiv.firstChild;
        }

        function compileWPContent(){
          var doc = document.createElement('div');
          doc.innerHTML = $scope.data.content.rendered;
          
          //Modifying Slide Elements
          var slideContent = doc.querySelectorAll(".aviaccordion, .avia-gallery, .av-masonry-gallery");
          // var slideContent = doc.querySelectorAll(settings.slideElements);    
          $scope.slideArray = [];
          for(var i=0; i < slideContent.length ; i++){
            var slideImages = slideContent[i].getElementsByTagName('img'), slideImageArray = [];
            for(var j=0; j < slideImages.length ; j++){
              var imgSrc = slideImages[j].getAttribute("src");
              slideImageArray.push({ src: imgSrc});
            };
            $scope.slideArray.push(slideImageArray);
            var newSlider = sliderTemplate(i);
            slideContent[i].parentNode.replaceChild(newSlider, slideContent[i]);
          }
  
          //Modifying Image Elements
          var imageContent = doc.querySelectorAll('.lightbox-added.aligncenter, .avia-image-container, a img, .avia-bg-style-scroll');
          // var imageContent = doc.querySelectorAll(settings.imageElements);          
          $scope.imageArray = [];
          for(var i = 0; i < imageContent.length ; i++){
            var currentElement;
            if(imageContent[i].children.length == 0){
              currentElement = imageContent[i].parentNode;
            } else {
              currentElement = imageContent[i];
            }
            var imgSrc, image = currentElement.getElementsByTagName('img')[0];
            if(image == null){
              imgSrc = currentElement.style.backgroundImage.slice(5, -2);
            } else {
              imgSrc = image.getAttribute("src");
            }
            $scope.imageArray.push({ src: imgSrc});
            var newImg = "<img class=\"wp-img\" ng-src=\"{{imageArray["+i+"].src}}\" ng-click=\"showImage(imageArray["+i+"].src)\"/>";
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = newImg;
            newImg = tempDiv.firstChild;
            currentElement.parentNode.replaceChild(newImg, currentElement);
          };
          
          //Modifying Links
          var links = doc.getElementsByTagName('a');
          // var links = doc.getElementsByTagName(settings.linkElements);          
          for(var x=0; x < links.length; x++){
            var href = links[x].getAttribute('href');
            links[x].setAttribute('ng-click', "openLink('"+href+"')");
            links[x].removeAttribute('href');
          }

          //Clean empty space
          var emptySpaceContent = doc.querySelectorAll(".avia-layerslider, .avia-google-map-container, span.hidden");
          // var emptySpaceContent = doc.querySelectorAll(settings.emptyElements); 
          for(var i=0; i < emptySpaceContent.length ; i++){
            emptySpaceContent[i].parentNode.removeChild(emptySpaceContent[i]);
          }

          $scope.content = doc.innerHTML;
          $scope.title = $sce.trustAsHtml($scope.data.title.rendered);
          if($scope.data.categories){
            $scope.categories = $scope.data.categories;
            $scope.categories.forEach(function(cat, index) {
              $scope.categories[index] = $scope.$parent.categories[cat];
            });
            $scope.categories = $scope.categories.join(", ");
          }
        }
        // API.request("Settings_API").then(function onSuccess(result){
        //   console.log(result);
        //   compileWPContent();
        // }, function onError(result){
        //   API.responseAlert(result);
        // })
        compileWPContent();

      }
    }
  }]);
}

module.exports = WPContentDirective;