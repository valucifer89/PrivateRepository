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

registra.controller('register', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout, LoginService){
    $scope.title_email = "deve essere @vale.com";
    $scope.pattern_email = ".+@vale.com";
    
    function resetNotify(){
        $scope.success_notify = "";
        $scope.error_notify = "";
        $scope.notify = "";
    }
    
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
        var url = "https://vdemastro2.000webhostapp.com/PHP/insertRegister.php";
        
        var data = 'user='+angular.element('#username').val()+'&password='+angular.element('#password').val()+'&nominativo='+angular.element('#nominativo').val()+'&email='+angular.element('#email').val()+'&id_permission='+angular.element('#permission').val();
        
        $http({
            method  : 'POST', url     : url,
            data    : data,   headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         }).then(
            function(response) {
                resetNotify();
                
                var jso = angular.fromJson(JSON.stringify(response));
                
                if (jso.data.result){
                    successNotify();
                    $timeout(resetNotify, 5000);
                    $timeout(function(){
                        angular.element('#username').val('');
                        angular.element('#password').val('');
                        angular.element('#nominativo').val('');
                        angular.element('#email').val('');
                        angular.element('#permission').val('');
                        $scope.disab = true;
                    }, 5000);
                    
                }else{
                    errorNotify();
                    $timeout(resetNotify, 5000);
                }
                
        },  function (error) {
            return false;
        });
    }
    
    getPermission();
    resetNotify();

    function successNotify(){
        $scope.success_notify = "Inserimento effettuato con successo.";
        $scope.notify = "success";
    }
    
    function errorNotify(){
        $scope.error_notify = "Errore rilevato nell\'inserimento del record.";
        $scope.notify = "error";
    }
    
    $scope.registra = function(){
        insertFields();
    }
    
    $scope.reset = function(){
        angular.element('#username').val('');
        angular.element('#password').val('');
        angular.element('#nominativo').val('');
        angular.element('#email').val('');
        angular.element('#permission').val('');
        $scope.disab = true;
    }
    
    $scope.controlDisabledRegistra = function(){
        var username = angular.element('#username').val();
        var password = angular.element('#password').val();
        var nominativo = angular.element('#nominativo').val();
        var email = angular.element('#email').val();
        var permission = angular.element('#permission').val();
        
        if (username.length === 0){
            $scope.disab = true;
        }else{
            if (password.length === 0){
                $scope.disab = true;
            }else{
                if (nominativo.length === 0){
                    $scope.disab = true;
                }else{
                    if (email.length === 0){
                        $scope.disab = true;
                    }else{
                        if (permission.length === 0){
                            $scope.disab = true;
                        }else{
                            $scope.disab = false;
                        } 
                    }
                }
            }
        }
    }
    
}]);

registra.controller('footer', ['$scope',  function ($scope){
    $scope.year = (new Date()).getFullYear();
    $scope.by = "Creative TIM";
}]);

registra.controller('navbar', ['$scope',  function ($scope){
    $scope.home = "HOME";
}]);
