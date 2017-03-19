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
        views: {
            'menuContent': {
                templateUrl: 'views/Dashboard/DashboardView.html',
                controller: require("../views/Dashboard/DashboardCtrl.js")
            }
        }
    })
    
    .state('app.excelparser', {
        url: '/excelparser',
        views: {
            'menuContent': {
                templateUrl: 'views/ExcelParser/ExcelParserView.html',
                controller: require("../views/ExcelParser/ExcelParserCtrl.js")
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
    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'views/Login/LoginView.html',
                controller: require("../views/Login/LoginCtrl.js")
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
    // .state('app.ink', {
    //     url: '/ink',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/ink.html',
    //             controller: 'InkCtrl'
    //         }
    //     }
    // })

    // .state('app.motion', {
    //     url: '/motion',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/motion.html',
    //             controller: 'MotionCtrl'
    //         }
    //     }
    // })

    // .state('app.components', {
    //     url: '/components',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/components.html',
    //             controller: 'ComponentsCtrl'
    //         }
    //     }
    // })

    // .state('app.extensions', {
    //     url: '/extensions',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/extensions.html',
    //             controller: 'ExtensionsCtrl'
    //         }
    //     }
    // })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
})
}