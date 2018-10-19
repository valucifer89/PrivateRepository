var dashboard = angular.module('myDashboard', []);

dashboard.factory('LoginService', function($http) {
    var isAuthenticated = false;
    
    return {
        isAuthenticated : function() {
            if(sessionStorage.token == null)
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
                        return false;
                    else
                        return true;
                    
            },  function (error) {
                return true;
            });
            
        }
    };
});

dashboard.run(function(LoginService, $window) {
    if(LoginService.isAuthenticated()) {
        $window.location.href= "https://vdemastro2.000webhostapp.com/login.html";
    }
});

dashboard.controller('dashboard', ['$scope',  function ($scope, LoginService){

    
}]);
