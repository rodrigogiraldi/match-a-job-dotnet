app.service('addressSrv', function($http){
    this.getCountryAndCity = function(user){
        return $http.post("/address/country-and-city", {id_user: user});
    }

    this.updateAddress = function(user, city, address){
        return $http.post("/address/update-address", {id_user: user, id_city: city, address: address});
    }

    this.add = function(id_user){
        return $http.post("/address/add", {id_user: id_user});
    }

    this.getByUserId = function(id_user){
        return $http.post("/address/get-by-user-id", {id_user: id_user});
    }
});