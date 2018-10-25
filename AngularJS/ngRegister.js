var registra = angular.module('myRegister', []);

registra.factory('LoginService', function($http) {
    var isAuthenticated = false;
    
    return {
        isAuthenticated : function() {
            
            if(sessionStorage.token == "" || sessionStorage.token == null)
                return true;
                
            var url = "https://vdemastro2.000webhostapp.com/PHP/check.php";
            var data = 'token='+sessionStorage.token;
            
            $http({
                method  : 'POST', url     : url,
                data    : data,   headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             }).then(
                function(response) {
                    var jso = angular.fromJson(JSON.stringify(response));
                     
                    var uno = sessionStorage.user+sessionStorage.pass;
    
                    if(uno === jso.data.result)
                        isAuthenticated = false;
                    else
                        isAuthenticated = true;
                    
                    return isAuthenticated;
                    
            },  function (error) {
                return true;
            });
            
        }
    };
});

registra.run(function(LoginService, $window) {
    var bool = LoginService.isAuthenticated();
    if(bool) {
        $window.location.href= "https://vdemastro2.000webhostapp.com/login.html";
    }
});

registra.controller("header",  ['$scope', function ($scope){
    $scope.title_page_head = "Titolo Pagina";
    $scope.base = "https://vdemastro2.000webhostapp.com/";
}]);

registra.controller('register', ['$scope', '$http', function ($scope, $http, LoginService){
    $scope.title_email = "deve essere @vale.com";
    $scope.pattern_email = ".+@vale.com";
    
    function getPermission(){
        $http({
                method  : 'GET', url     : "https://vdemastro2.000webhostapp.com/PHP/permission.php",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
             }).then(
                function(response) {
                    var jso = angular.fromJson(JSON.stringify(response));
                    
                    $scope.data = {
                        model: null,
                        availableOptions: jso.data.result
                    };
                    
            },  function (error) {
                        console.log(JSON.stringify(error));
            });
    }
    
    function insertFields(){
        alert("WWW");
    }
    
    getPermission();
    
    $scope.registra = function(){
        insertFields();
    }
    
    
}]);

registra.controller('footer', ['$scope',  function ($scope){
    $scope.year = (new Date()).getFullYear();
    $scope.by = "Creative TIM";
}]);

registra.controller('navbar', ['$scope',  function ($scope){
    $scope.home = "HOME";
}]);
