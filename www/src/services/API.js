var API = function(app){
    app.factory('API', ['$http', '$ionicPopup', function($http, $ionicPopup){
        return {
            home: "https://backend.sinematvsendikasi.org/",
            wphome: 'https://www.sinematvsendikasi.org/',
            // saveSecret: function(secret){
            //     $window.localStorage.setItem("loginsecret", secret);
            // },
            // getSecret: function(){
            //     return $window.localStorage.getItem("loginsecret");
            // },
            request: function (endpoint, params = {}) {
                return $http({
                    url:this.home+endpoint, 
                    data: params,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    method: 'POST'})
            },
            wpRequest: function(endpoint, params = {}){
                if(!params.id) params.id = "";
                var methodList = {
                    posts: "GET",
                    categories: "GET",
                    pages: "GET"
                };
                return $http({
                    url: this.wphome+'wp-json/wp/v2/'+endpoint+"/"+params.id,
                    params: params,
                    method: methodList[endpoint] 
                })
            },
            FullScreenImage: function(img){
                return FullScreenImage.showImageUrl(img);
            },
            responseAlert : function(res){
                var statusText = res.status == -1 ? "Sunucuya Ulaşılamadı." : res.statusText; 
                return $ionicPopup.alert({
                    title: "Hata Kodu: "+res.status,
                    template: statusText
                })
            }
        }
    }])
}

module.exports = API;