app.controller('UserCtrl', function ($scope, $http, $cookies, $uibModal, addressSrv, citySrv, companySrv, countrySrv, employeeSrv, postSrv, userSrv) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.showMessage = {
        signin: false,
        signup: false
    }

    $scope.textMessage = {
        signin: {},
        signup: {}
    }

    $scope.closeMessage = function (msg) {
        $scope.showMessage[msg] = false
    }

    $scope.passwordCheck = "";
    // $scope.email = 'rgiraldisilva@gmail.com';

    $scope.validations = {
        email: '[a-zA-Z][a-zA-Z0-9]{2,}@[a-zA-Z][a-zA-Z0-9]{2,}.[a-zA-Z][a-zA-Z0-9]{2,}'
    }

    $scope.checkLogin = function () {
        if ($scope.user.email != '' && $scope.user.password !== '') {
            $http
                .post("/user/find", $scope.user)
                .then(function (res) {
                    if (typeof (res.data) == "object") {
                        $cookies.put("id_user", res.data.id);
                        $cookies.put("email", res.data.email);
                        window.location.replace("/content/views/index.html");
                    }
                    else {
                        $scope.textMessage.signin.title = 'Try again,';
                        $scope.textMessage.signin.content = 'username or password wrong!';
                        $scope.showMessage.signin = true;
                    }
                });
        }
        else {
            $scope.textMessage.signin.title = 'Please,';
            $scope.textMessage.signin.content = 'fill username and password.';
            $scope.showMessage.signin = true;
        }

    }

    $scope.checkUseEmail = function () {
        userSrv.checkEmail($scope.user.email)
            .then(function (res) {
                if (typeof (res.data) == "object") {
                    $scope.textMessage.signup.title = 'Email already in use,';
                    $scope.textMessage.signup.content = 'try other.';
                    $scope.showMessage.signup = true;
                    return true;
                }
                else {
                    return false;
                }
            });
    }

    $scope.checkUseEmail2 = function(){
        var a = userSrv.checkEmail2($scope.user.email);
        var b = 5;
    }

    $scope.checkEqualPasswords = function () {
        if ($scope.user.password != $scope.passwordCheck) {
            $scope.textMessage.signup.title = 'Check the passwords, '
            $scope.textMessage.signup.content = "they aren't equal.";
            $scope.showMessage.signup = true;
            return false;
        }
        else {
            return true;
        }
    }

    $scope.checkFilledForm = function () {
        if ($scope.user.email == "" || $scope.user.password == "" || $scope.passwordCheck == "") {
            $scope.textMessage.signup.title = 'All fields are required, '
            $scope.textMessage.signup.content = "fulfill them.";
            $scope.showMessage.signup = true;
            return false;
        }
        else {
            return true;
        }
    }

    $scope.addUser = function () {
        if($scope.checkFilledForm()){
            if ($scope.checkEqualPasswords()) {
                userSrv.checkEmail($scope.user.email)
                    .then(function (res) {
                        if (typeof (res.data) == "object") {
                            $scope.textMessage.signup.title = 'Email already in use,';
                            $scope.textMessage.signup.content = 'try other.';
                            $scope.showMessage.signup = true;
                        }
                        else {
                            userSrv.add($scope.user)
                                .then(function(res){
                                    if (typeof res.data == "string"){
                                        var a = 5;
                                        //add address
                                        //add employee
                                    }
                                });
                        }
                    });
            }
        }
//        if ($scope.checkFilledForm()) {
//            if ($scope.checkEqualPasswords()) {
//                if (!$scope.checkUseEmail()) {
//                    $http
//                        .post("/user/add", $scope.user)
//                        .then(function (res) {
//                            console.log(typeof (res.data));
//                            if (typeof (res.data) == "object") {
//                                addressSrv.add(res.data)
//                                    .then(function (res) {
//                                        console.log(res.data);
//                                    });
//
//                                employeeSrv.add(res.data)
//                                    .then(function (res) {
//                                        console.log(res.data);
//                                    });
//
//                                window.location.replace("/views/login.html");
//                            }
//                            // console.log(res.data);
//                        });
//                }
//            }
//        }
    }

    $scope.logout = function () {
        $cookies.remove("email");
        window.location.replace("/content/views/login.html");
    }

    $scope.changeJobOpen = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '../../views/job-change.html',
            controller: 'ProfileJobModalCtrl'
        });
    }

    $scope.changeAddressOpen = function () {
        var modalInstance = $uibModal.open({
            templateUrl: '../../views/address-change.html',
            controller: 'ProfileModalCtrl'
        });
    }

    $scope.getProfile = function () {
        $scope.profile = {};

        employeeSrv.getByUserId($cookies.get("id_user"))
            .then(function (res) {
                $scope.profile.employee = res.data;
                $scope.profile.employee.date_of_birth = new Date($scope.profile.employee.date_of_birth);

                $scope.profile.job = {};
                $scope.getCompany();
                $scope.getPost();
            });

        $scope.profile.address = {};
        $scope.getAddress();

        $scope.profile.user = {
            id_user: $cookies.get("id_user"),
            email: $cookies.get("email"),
            password: "default"
        }
    }

    $scope.updateProfile = function () {
        employeeSrv.updateByUserId($scope.profile.employee)
            .then(function (res) {
                console.log(res.data);
            });

        userSrv.update($scope.profile.user)
            .then(function (res) {
                console.log(res.data);
            });

    }

    $scope.addAddress = function (id) {
        addressSrv.add(id)
            .then(function (res) {
                console.log(res.data);
            });
    }

    $scope.addEmployee = function (id) {
        employeeSrv.add(id)
            .then(function (res) {
                console.log(res.data);
            });
    }

    $scope.getCompany = function () {
        companySrv.getById($scope.profile.employee.id_company)
            .then(function (res) {
                // $scope.profile.job = {};
                $scope.profile.job.company = res.data.name;
                // console.log(res.data);
            })
    }

    $scope.getPost = function () {
        postSrv.getById($scope.profile.employee.id_post)
            .then(function (res) {
                // $scope.profile.job = {};
                $scope.profile.job.post = res.data.name;
                // console.log(res.data);
            })
    }

    $scope.getAddress = function () {
        addressSrv.getByUserId($cookies.get("id_user"))
            .then(function (res) {
                $scope.profile.address.address = res.data.address;
                $scope.getCity(res.data.id_city);

                // console.log(res.data);
            });
    }

    $scope.getCity = function (id_city) {
        citySrv.getById(id_city)
            .then(function (res) {
                $scope.profile.address.city = res.data.name;
                $scope.getCountry(res.data.id_country);
                // console.log(res.data);
            });
    }

    $scope.getCountry = function (id_contry) {
        countrySrv.getById(id_contry)
            .then(function (res) {
                $scope.profile.address.country = res.data.name;
                // console.log(res.data);
            });
    }


    // $scope.getCountry = function () {
    //     countrySrv.getById($scope.profile.employee.id_user)
    //         .then(function (res) {
    //             // $scope.profile.job = {};
    //             $scope.profile.address.country = res.data.name;
    //             // console.log(res.data);
    //         })
    // }    

});