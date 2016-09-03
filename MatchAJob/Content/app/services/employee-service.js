app.service('employeeSrv', function($http){
    this.getByUserId = function(id){
        return $http.post("/employee/find-by-user-id", {id: id});
    }

    this.updateByUserId = function(employee){
        return $http.post("/employee/update-by-user-id", employee);
    }

    this.updateJobByUserId = function(employee){
        return $http.post("/employee/update-job-by-user-id", employee);
    }

    this.add = function(id_user){
        return $http.post("/employee/add", {id_user: id_user});
    }        
});