require('../lib/ionic/js/ionic.bundle.js');
require('../lib/ionic-material/dist/ionic.material.js');

document.addEventListener('deviceready', function () {


  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  if(window.plugins.OneSignal){
    // Enable to debug issues.
    window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    window.plugins.OneSignal
    .startInit("fdf274f5-d601-4b3f-acb0-475a246e317e")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
  }
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);

window.onerror = function (errorMsg, url, lineNumber) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}