app.controller('AddressCtrl', function ($scope, $http) {
    $scope.getCountries = function () {
        $http
            .get("/country/all")
            .then(function (res) {
                $scope.countries = res.data;
            });
    };

    $scope.addCountry = function () {

        var found = false;

        var i = 0;

        while (i < $scope.countries.length && !found) {
            if ($scope.country == $scope.countries[i].name) {
                console.log("Found");
                found = true;
            }
            i++;
        }

        if (i == $scope.countries.length) {
            $http
                .post("/country/add", { country: $scope.country })
                .then(function (res) {
                    $scope.getCountries();
                    console.log(res.data);
                });
        }
    }

    $scope.getCities = function () {
        $http
            .post("/city/find", { country: $scope.countrySelected })
            .then(function (res) {
                $scope.cities = res.data;
            });
        // console.log($scope.countrySelected);
    };

    $scope.addCity = function(){
        var found = false;

        var i = 0;

        while (i < $scope.cities.length && !found) {
            if ($scope.city == $scope.cities[i].name) {
                console.log("Found");
                found = true;
            }
            i++;
        }

        if (i == $scope.cities.length) {
            $http
                .post("/city/add", {name: $scope.city, id_country: $scope.countrySelected})
                .then(function(res){
                    $scope.city = '';
                    console.log(res.data);
                }); 
        }     
    }
});