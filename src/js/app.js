(function () {
    var myApp = angular.module('myApp', []);
    myApp.controller('appCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.refresh = function () {
            $scope.test = "test";
            $http.get('/userlist')
                .then(function (response) {
                    $scope.userlist = response.data;
                    $scope.user = {};
                });

        }

        $scope.refresh();
        
        var refresh = $scope.refresh
        
        $scope.areFieldsFilled = function () {
            return !($scope.user.firstname === undefined ||
                 $scope.user.lastname === undefined ||
                 $scope.user.year === undefined)
         }

        $scope.addUser = function () {
            if (!$scope.areFieldsFilled()) {
                console.warn("Let's fill the fields");
            } else {
                $http.post('/userlist', $scope.user)
                    .then(function (res) {
                        $scope.userlist.push(res.data);
                        $scope.user = {};
                    });
            };
        };


        $scope.remove = function (id) {
            console.log(id);
            $http.delete('/userlist/' + id).then(function (response) {
                refresh();
            });
        };

        $scope.edit = function (id) {
            console.log(id);

            $http.get('/userlist/' + id).then(function (response) {
                $scope.user = response.data;
            });
        };

        $scope.update = function () {
            if ($scope.areFieldsFilled()) {
                console.warn("Let's press 'Edit' button for update data.");
            } else {
                $http.put('/userlist/' + $scope.user._id, $scope.user).then(function (response) {
                    refresh();
                    $scope.user = {};
                });
            }
        };

        $scope.clearSelf = function () {
            $scope.user = {};
        };

    }]);
})()