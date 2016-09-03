app.service('countrySrv', function ($http) {
    this.getAll = function () {
        return $http.get("/country/all");
    }

    this.getById = function(id_country){
        return $http.post("/country/get-by-id", {id_country: id_country});
    }
});