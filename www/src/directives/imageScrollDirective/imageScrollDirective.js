var imageScrollDirective = function(app){
  app.directive('imageScroll',  function(){
    return {
      restrict: 'E',
      replace: true,
      template: '<a class="item item-list-detail">' + 
                    '<ion-scroll overflow-scroll="false" direction="x">' +
                        '<img ng-repeat="image in images track by $index" ng-src="{{image.src}}" ng-click="showImages($index)" class="image-list-thumb"/>' +
                    '</ion-scroll>' +
                '</a>',
      scope: {
        images: "="
      },
      link: function(scope,element,attrs){
        console.log("imageScroll Linked");
      },
      controller: function($scope, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){
        $scope.zoomMin = 1;

        $scope.showImages = function(index, slideIndex) {
          $scope.activeSlide = index;
          $scope.showModal('src/directives/imageScrollDirective/slideModalTemplate.html', slideIndex);
        };
        
        $scope.showModal = function(templateUrl) {
          $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
          });
        }
        
        $scope.closeModal = function() {
          $scope.modal.hide();
          $scope.modal.remove()
        };
        
        $scope.updateSlideStatus = function(slide) {
          var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
          if (zoomFactor == $scope.zoomMin) {
            $ionicSlideBoxDelegate.enableSlide(true);
          } else {
            $ionicSlideBoxDelegate.enableSlide(false);
          }
        };

        $scope.$on("scroll.infiniteScrollComplete", function(event){
          $ionicScrollDelegate.resize();
        })
      }
    }
  });
}

module.exports = imageScrollDirective;