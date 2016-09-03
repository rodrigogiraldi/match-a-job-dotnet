app.controller('ProfileJobModalCtrl', function ($scope, $uibModalInstance, $cookies, employeeSrv, companySrv, postSrv) {
    $scope.getEmployee = function () {
        employeeSrv.getByUserId($cookies.get("id_user"))
            .then(function (res) {
                $scope.current = {
                    company: res.data.id_company,
                    post: res.data.id_post
                }

                $scope.getCompanies();
                $scope.getPosts();


                //    console.log(res.data);
            });
    }

    $scope.getCompanies = function () {
        companySrv.getAll()
            .then(function (res) {
                $scope.companies = res.data;
                $scope.company = $scope.getPosition($scope.companies, 'id_company', $scope.current.company);
            });
    }

    $scope.getPosts = function () {
        postSrv.getAll()
            .then(function (res) {
                $scope.posts = res.data;
                $scope.post = $scope.getPosition($scope.posts, 'id_post', $scope.current.post);
                //    console.log(res.data);
            });
    }

    $scope.getPosition = function (arr, key, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == id) {
                return arr[i];
            }
        }
    }

    $scope.save = function () {
        var employee = {
            id_user: $cookies.get("id_user"),
            id_company: $scope.company.id_company,
            id_post: $scope.post.id_post
        }

        employeeSrv.updateJobByUserId(employee)
            .then(function (res) {
                console.log(res.data);
            });

        $uibModalInstance.close();
    }

    $scope.cancel = function(){
        $uibModalInstance.close();
    }
});