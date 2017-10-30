var imageScrollDirective = function(app){
  app.directive('imageScroll',  [ '$compile', function(compile){
    return {
      restrict: 'E',
      // replace: true,
      template: '<div>' +
                    // '<ion-scroll direction="x">' +
                        '<img ng-repeat="image in images track by $index" ng-src="{{image.src}}" ng-click="showImages($index)" class="image-list-thumb"/>' +
                    // '</ion-scroll>' +
                '</div>',
      scope: {
        images: "="
      },
      link: function(scope,element,attrs){
        console.log("imageScroll Linked, scope:", scope);
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
        console.log($scope.images);
      }
    }
  }]);
}

module.exports = imageScrollDirective;