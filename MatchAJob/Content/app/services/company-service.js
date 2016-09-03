app.service('companySrv', function($http){
    this.getAll = function(){
        return $http.get("/company/all");
    }

    this.getById = function(id_company){
        return $http.post("/company/get-by-id", {id_company: id_company});
    }
});