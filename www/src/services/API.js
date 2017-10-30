var API = function(app){
    app.factory('API', ['$http', '$ionicPopup', '$q','$window','$sce', function($http, $ionicPopup, $q, $window, $sce){
        return {
            home: "https://backend.sinematvsendikasi.org/",
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
            saveSecret: function(secret){
                $window.localStorage.setItem("loginsecret", secret);
            },
            getSecret: function(){
                return $window.localStorage.getItem("loginsecret");
            },
            wpRequest: function(endpoint, params = {id: ''}){
                var methodList = {
                    posts: "GET",
                    categories: "GET",
                    pages: "GET"
                };
                return $http({
                    url: this.wphome+'wp-json/wp/v2/'+endpoint+'/'+params.id,
                    method: methodList[endpoint] 
                })
            },
            wpBeautifyContent: function(val){
                var doc = document.createElement('div');
                doc.innerHTML = val.content.rendered;

                //Seperating Images
                var images = doc.querySelectorAll('.aviaccordion-spacer, .aviaccordion-image, img[data-avia-tooltip], .av-masonry-image-container img, .avia-layerslider');
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
                    var images = links[x].getElementsByTagName("img");
                    if(images.length > 1){
                        var newDiv = document.createElement("div");
                        images.forEach(function(img) {
                            var src = img.getAttribute('src');
                            img.setAttribute('ng-click', "API.FullScreenImage("+src+")");
                            img.setAttribute('ng-src', src);
                            img.removeAttribute('src');
                            newDiv.appendChild(img);
                        }, this);
                        links[x].parentNode.replaceChild(newDiv);
                    } else {
                        var href = links[x].getAttribute('href');
                        links[x].setAttribute('onclick', "window.open('"+href+"', '_system', 'location=yes,closebuttoncaption=Kapat,toolbar=yes,toolbarposition=bottom'); return false;");
                        links[x].removeAttribute('href');
                    }
                }
                
                val.content.rendered = $sce.trustAsHtml(doc.innerHTML);
                val.title.rendered = $sce.trustAsHtml(val.title.rendered);
            },
            FullScreenImage: function(img){
                return FullScreenImage.showImageUrl(img);
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