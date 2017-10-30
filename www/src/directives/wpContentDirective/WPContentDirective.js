var WPContentDirective = function(app){
  app.directive('wpContent', function(){
    return {
      restrict: 'E',
      // replace: true,
      scope: {
        data: "=",
      },
      link: function (scope, element, attrs){
        console.log("wpDirective Linked");
      },
      templateUrl: "src/directives/wpContentDirective/wpContentTemplate.html",
      controller: function($scope, $compile, $sce, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){

        function sliderTemplate(slideIndex){
          var DOMText = '<image-scroll images="slideArray['+slideIndex+']"></image-scroll>';
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = DOMText;
          return tempDiv.firstChild;
        }

        var doc = document.createElement('div');
        doc.innerHTML = $scope.data.content.rendered;
        
        //Modifying Slide Elements
        var slideContent = doc.querySelectorAll(".aviaccordion, .avia-gallery");
		$scope.slideArray = [];
		
		$scope.images = [{src:'leeroy'}]
        for(var i=0; i < slideContent.length ; i++){
          var slideImages = slideContent[i].getElementsByTagName('img'), slideImageArray = [];
          for(var j=0; j < slideImages.length ; j++){
            var imgSrc = slideImages[j].getAttribute("src");
            slideImageArray.push({ src: imgSrc});
          };
          $scope.slideArray.push(slideImageArray);
          var newSlider = sliderTemplate(i);
		  slideContent[i].parentNode.replaceChild(newSlider, slideContent[i]);
		  console.log(newSlider)
		  var a = $compile(newSlider)($scope);
		  console.log(a)
        }

        //Modifying Image Elements
        var imageContent = doc.querySelectorAll('.lightbox-added.aligncenter, .avia-image-container');
        $scope.imageArray = [];
        for(var i = 0; i < imageContent.length ; i++){
          var image = imageContent[i].getElementsByTagName('img')[0];
          var imgSrc = image.getAttribute("src");
          $scope.imageArray.push({ src: imgSrc});
          var newImg = "<img ng-src=\"{{imageArray["+i+"].src}}\" ng-click=\"FullScreenImage(imageArray["+i+"].src)\"/>";
          var tempDiv = document.createElement("div");
          tempDiv.innerHTML = newImg;
          newImg = tempDiv.firstChild;
          imageContent[i].parentNode.replaceChild(newImg, imageContent[i]);
          $compile(newImg)($scope);
        };
        
        //Modifying Links
        var links = doc.getElementsByTagName('a');
        for(var x=0; x < links.length; x++){
          var href = links[x].getAttribute('href');
          links[x].setAttribute('onclick', "window.open('"+href+"', '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom'); return false;");
          links[x].removeAttribute('href');
        }
        
        $scope.content = $sce.trustAsHtml(doc.innerHTML);
        $scope.title = $sce.trustAsHtml($scope.data.title.rendered);
        $scope.categories = $scope.data.categories.join();
      }
    }
  });
}

module.exports = WPContentDirective;