app.controller('ProfileModalCtrl', function ($scope, $uibModalInstance, $http, $cookies, addressSrv, countrySrv, citySrv) {
    $scope.cancel = function () {
        $uibModalInstance.close();
        console.log("Canceled");
    }

    $scope.save = function () {
        $scope.updateAddress();
        $uibModalInstance.close();
        // console.log("Saved");
    }

    $scope.getCountries = function () {
        countrySrv.getAll()
            .then(function (res) {
                $scope.countries = res.data;

                if ($scope.currentAddress.id_country != undefined) {
                    $scope.countrySelected = $scope.getPosition(res.data, 'id_country', $scope.currentAddress.id_country);
                    $scope.currentAddress.id_country = undefined;
                }

                $scope.getCities();
            });
    }

    $scope.getCities = function () {
        if ($scope.countrySelected != undefined) {
            citySrv.getCitiesByCountry($scope.countrySelected.id_country)
                .then(function (res) {
                    $scope.cities = res.data;

                    if ($scope.currentAddress.id_city != undefined) {
                        $scope.citySelected = $scope.getPosition(res.data, 'id_city', $scope.currentAddress.id_city);
                        $scope.currentAddress.id_city = undefined;
                    }
                });
        }
    }

    $scope.getCountryAndCity = function () {
        addressSrv.getCountryAndCity($cookies.get("id_user"))
            .then(function (res) {
                if (res.data.length != 0) {
                    $scope.currentAddress = {
                        id_country: res.data[0].id_country,
                        id_city: res.data[0].id_city,
                        address: res.data[0].address
                    };

                }
                else {
                    $scope.currentAddress = {
                        id_country: 0,
                        id_city: 0,
                        address: ""
                    };

                }
                $scope.getCountries();
            });
    }

    $scope.getPosition = function (arr, key, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == id) {
                return arr[i];
            }
        }
    }

    $scope.updateAddress = function () {
        console.log("Update");
        addressSrv.updateAddress($cookies.get("id_user"), $scope.citySelected.id_city, $scope.currentAddress.address)
            .then(function (res) {
                console.log(res.data);
            });
    }
});