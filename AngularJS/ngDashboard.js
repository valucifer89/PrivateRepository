var dashboard = angular.module('myDashboard', []);

dashboard.factory('LoginService', function($http) {
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

dashboard.run(function(LoginService, $window) {
    var bool = LoginService.isAuthenticated();
    if(bool) {
        $window.location.href= "https://vdemastro2.000webhostapp.com/login.html";
    }
});

dashboard.controller('navbar', ['$scope',  function ($scope, LoginService){
    
    function checkPermission(){
        
        switch (sessionStorage.id_permission) {
            case '6':
                $scope.registra = "Registra";
                $scope.menu = "Menu";
                break;
            case '5':
                $scope.menu = "Menu";
                break;
            default:

        }
    }
    
    checkPermission();
    
    
}]);
