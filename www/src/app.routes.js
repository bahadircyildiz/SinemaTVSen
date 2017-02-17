module.exports = function ($stateProvider, $urlRouterProvider) {
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
}