login.controller('login', ['$scope','$http','$window', function ($scope,$http,$window){
 
    function resetField($scope){
        $scope.user = "";
        $scope.pass = "";
        $scope.control = true;
        
        angular.element('#form_user').removeClass("form-control-danger");
        angular.element('#user').removeClass("has-danger");
        angular.element('#form_password').removeClass("form-control-danger");
        angular.element('#password').removeClass("has-danger");
    }
    
    function isNotEmpty($scope){
        var flag = true;
        
        if ($scope.user === ""){
            angular.element('#user').addClass("has-danger");
            angular.element('#form_user').addClass("form-control-danger");
            flag = flag && false;
        }else{
            angular.element('#user').removeClass("has-danger");
            angular.element('#form_user').removeClass("form-control-danger");
            flag = flag && true;
        }
        
        
        if ($scope.pass === ""){
            angular.element('#password').addClass("has-danger");
            angular.element('#form_password').addClass("form-control-danger");
            flag = flag && false;
        }else{
            angular.element('#password').removeClass("has-danger");
            angular.element('#form_password').removeClass("form-control-danger");
            flag = flag && true;
        }
        
        $scope.control = flag;
        
        return flag;
    }

    $scope.url = "https://vdemastro2.000webhostapp.com/PHP/login.php";
    
    $scope.login = function(){
        if (isNotEmpty($scope)){
            
            var data = 'user='+$scope.user+'&password='+$scope.pass;
            
            $http({
                method  : 'POST', url     : $scope.url,
                data    : data, headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             }).then(
                function(response) {
                    var jso = angular.fromJson(JSON.stringify(response));
                    if (jso.data.result === "0"){
                        $scope.control = false;
                    }else{
                        //console.log(jso.data.result);
                        $window.location.href= "https://vdemastro2.000webhostapp.com/_index.html";
                    }
                    
            },  function (error) {
                        alert("aa "+JSON.stringify(error));
            });
            
            /*$http.post(
                $scope.url, 
                {user: $scope.user,password: $scope.password}
            ).then(function(data, status){
                if (status == 200){
                    console.log("ok");
                    console.log(json.parse(data));
                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data;
                }else{
                    console.log("no");
                }
                
            })*/
            
        }
    }
    
    $scope.reset = function(){
        resetField($scope);
    }
    
    $scope.init = function(){
        resetField($scope);
    }
    

    
}]);