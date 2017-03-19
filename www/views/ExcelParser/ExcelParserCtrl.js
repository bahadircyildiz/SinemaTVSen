module.exports = function ($scope, $ionicModal, $ionicPopover, $timeout, API) {
    // Form data for the login modal
    $scope.sendFile = function(e){
        $scope.results = null;
        var target = e.srcElement.elements.spreadsheet;
        API.sendExcel(target.files[0]).then(function(result){
            $scope.results = JSON.parse(result);
        }, function(onError){
            console.log(JSON.parse(onError));
        })
    }
};