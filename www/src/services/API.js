var API = function(app){
    app.factory('API', ['$http', '$ionicPopup', '$q', function($http, $ionicPopup, $q){
        return {
            home: "http://stvsen.bahadircyildiz.com/index.php/",
            // geocoding: "http://maps.googleapis.com/maps/api/geocode/json",
            wphome: 'https://www.sinematvsendikasi.org/',
            sendExcel: function(file){
                var deferred = $q.defer();
                if(file){
                    var form = new FormData();
                    form.append("spreadsheet", file);
                    var request = new XMLHttpRequest();
                    request.open("POST", this.home+"ExcelHandler/parse_excel");
                    request.send(form);
                    request.onload = function(result){
                        // console.log(request.responseText, "Sent your file and uplaoded! HOPEFULLY");
                        deferred.resolve(request.responseText);
                    }
                }
                return deferred.promise;
            },
            wpRequest: function(endpoint){
                var methodList = {
                    posts: "GET",
                    categories: "GET"
                };
                return $http({
                    url: this.wphome+'wp-json/wp/v2/'+endpoint,
                    method: methodList[endpoint] 
                })
            },
            request: function (endpoint, params) {
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
            mapReq: function(lat,lng){
                //params: latlng:"{{lat}},{{lng}}", sensor:true
                return $http.get(this.geocoding+"?latlng="+lat+","+lng+"&sensor=true");
            },
            responseAlert : function(res){
                return $ionicPopup.alert({
                    title: "Error Code: " + (res.status ? res.status + " " + res.statusText : "0"), template: JSON.stringify(res)
                })
            },
            statusAlert: function(res){
                return $ionicPopup.alert({
                    title: "Error Code: " + (res.data.Footer.ErrorCode ? res.data.Footer.ErrorCode : "0"), template: res.data.Footer.ErrorMessage
                })
            },
        }
    }])
}

module.exports = API;