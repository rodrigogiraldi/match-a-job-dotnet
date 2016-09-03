app.service('userSrv', function($http){
    this.update = function(user){
        return $http.post("/user/update", user);
    }
    
    this.checkEmail = function(email){
        return $http.post("/user/check-email", {email: email});
    }

    this.add = function(user){
        return $http.post("/user/add", user);
    }


});