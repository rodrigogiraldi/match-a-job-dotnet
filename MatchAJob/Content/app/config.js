app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('')

    $stateProvider
        .state('signup', {
            url: "/signup",
            views: {
                "login": {
                    templateUrl: "signup.html",
                    controller: "UserCtrl"
                }                
            }
        })

        .state('profile', {
            url: "/profile",
            views: {
                "content": {
                    templateUrl: "profile.html",
                    controller: "UserCtrl"
                }                
            }
        })
        
        .state('index', {
            url: "",
            views: {
                "login": {
                    templateUrl: "signin.html",
                    controller: "UserCtrl"
                },
                "content": {
                    templateUrl: "home.html"
                }                
            }
        })
        
        .state('address-manage', {
            url: "/address-manage",
            views: {
                "content": {
                    templateUrl: "address-manage.html",
                    controller: "AddressCtrl"
                }                
            }
        });
        
                
});