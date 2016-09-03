app.service('citySrv', function($http){
    this.getCitiesByCountry = function(id_country){
        return $http.post("/city/find", { country: id_country });
    }

    this.getById = function(id_city){
        return $http.post("/city/get-by-id", {id_city: id_city});
    }    
})