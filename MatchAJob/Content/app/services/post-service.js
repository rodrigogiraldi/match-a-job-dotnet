app.service('postSrv', function($http){
    this.getAll = function(){
        return $http.get("/post/all");
    }

    this.getById = function(id_post){
        return $http.post("/post/get-by-id", {id_post: id_post});
    }    
});