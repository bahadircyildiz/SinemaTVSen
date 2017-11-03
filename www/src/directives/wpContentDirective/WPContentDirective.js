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

        var targetElem = element[0].children[1].children[0];
        console.log(element);
        targetElem.innerHTML = scope.content;
        compile(targetElem)(scope);
        console.log("wpDirective Linked");
      },
      templateUrl: "src/directives/wpContentDirective/wpContentTemplate.html",
      controller: function($scope, $element, $compile, $sce, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){
        $scope.FullScreenImage = function(src){
          // return window.FullScreenImage.showImageURL(src);
          // return window.open(src, '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom');
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
          var slideContent = doc.querySelectorAll(".aviaccordion, .avia-gallery");
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
          var imageContent = doc.querySelectorAll('.lightbox-added.aligncenter, .avia-image-container, a img');
          $scope.imageArray = [];
          for(var i = 0; i < imageContent.length ; i++){
            var currentElement;
            if(imageContent[i].children.length == 0){
              currentElement = imageContent[i].parentNode;
            } else {
              currentElement = imageContent[i];
            }
            var image = currentElement.getElementsByTagName('img')[0];
            var imgSrc = image.getAttribute("src");
            $scope.imageArray.push({ src: imgSrc});
            var newImg = "<img class=\"wp-img\" ng-src=\"{{imageArray["+i+"].src}}\" ng-click=\"showImage(imageArray["+i+"].src)\"/>";
            var tempDiv = document.createElement("div");
            tempDiv.innerHTML = newImg;
            newImg = tempDiv.firstChild;
            currentElement.parentNode.replaceChild(newImg, currentElement);
          };
          
          //Modifying Links
          var links = doc.getElementsByTagName('a');
          for(var x=0; x < links.length; x++){
            var href = links[x].getAttribute('href');
            links[x].setAttribute('onclick', "window.open('"+href+"', '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom'); return false;");
            links[x].removeAttribute('href');
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

        compileWPContent();
      }
    }
  }]);
}

module.exports = WPContentDirective;