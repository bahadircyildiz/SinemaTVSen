module.exports = function(app){
    app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/Menu/MenuView.html',
        controller: require("../views/Menu/MenuCtrl.js")
    })

    .state('app.dashboard', {
        url: '/dashboard',
        cache : true,
        views: {
            'menuContent': {
                templateUrl: 'views/Dashboard/DashboardView.html',
                controller: require("../views/Dashboard/DashboardCtrl.js")
            }
        }
    })
    
    // .state('app.excelparser', {
    //     url: '/excelparser',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'views/ExcelParser/ExcelParserView.html',
    //             controller: require("../views/ExcelParser/ExcelParserCtrl.js")
    //         }
    //     }
    // })
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'views/Login/LoginView.html',
                controller: require("../views/Login/LoginCtrl.js")
            }
        }
    })
    .state('app.verify', {
        url: '/verify',
        views: {
            'menuContent': {
                templateUrl: 'views/Verify/VerifyView.html',
                controller: require("../views/Verify/VerifyCtrl.js")
            }
        },
        params:{
            secret: null,
            gsm: null
        }
    })
    .state('app.loggedin', {
        url: '/loggedin',
        views: {
            'menuContent': {
                templateUrl: 'views/LoggedIn/LoggedInView.html',
                controller: require("../views/LoggedIn/LoggedInCtrl.js")
            }
        }
    })
    .state('app.userinfo', {
        url: '/userinfo',
        views: {
            'menuContent': {
                templateUrl: 'views/UserInfo/UserInfoView.html',
                controller: require("../views/UserInfo/UserInfoCtrl.js")
            }
        }
    })
    .state('app.aidat', {
        url: '/aidat',
        views: {
            'menuContent': {
                templateUrl: 'views/Aidat/AidatView.html',
                controller: require("../views/Aidat/AidatCtrl.js")
            }
        }
    })
    .state('app.sikayet', {
        url: '/sikayet',
        views: {
            'menuContent': {
                templateUrl: 'views/Sikayet/SikayetView.html',
                controller: require("../views/Sikayet/SikayetCtrl.js")
            }
        }
    })
    
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
})
}