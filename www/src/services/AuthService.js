var AuthService = function(app){
    app.factory('AuthService', ['$http', '$ionicPopup', '$q','$window','$state', function($http, $ionicPopup, $q, $window, $state){
        return {
            currentUser: null,
            login: function(user) {
                this.currentUser = user;
            },
            logout: function() {
                this.currentUser = null;
            },
            isLoggedIn: function() {
                return this.currentUser != null ? true : false;
            },
            name: function(){ 
                return this.currentUser.adi+" "+this.currentUser.soyadi; 
            },
            redirectControl: function(){
                if(!this.isLoggedIn()){
                    $state.go("app.login");
                }
            }
        }
    }])
}

module.exports = AuthService;