var project = angular.module('myProject', []);


    //HEADER
    project.controller("header",  ['$scope', function ($scope){
        //header da definire
        $scope.title_page_head = "Titolo Pagina";
        $scope.base = "https://vdemastro2.000webhostapp.com/";
    }]);

    
    //NAVBAR
    project.controller('navbar', ['$scope', '$window', '$location',  function ($scope, $window, $location, LoginService){
        
        function setNav(){
            $scope.home = "";
            $scope.href_home = "";
            
            $scope.registra = "";
            $scope.href_registra = "";
            
            $scope.href_menu = "";
            $scope.menu = "";
            
            $scope.href_progetti = "";
            $scope.progetti = "";
            
            $scope.documenti = "";
            
            $scope.leggi_documenti = "";
            $scope.href_leggi_documenti = "";
            $scope.inserisci_documenti = "";
            $scope.href_inserisci_documenti = "";
            
            $scope.leggi_defect = "";
            $scope.href_leggi_defect = "";
            $scope.inserisci_defect = "";
            $scope.href_inserisci_defect = "";
        }
        
        function getPageForMenu(){
            setNav();
            checkPermission();
        }
        
        function checkPermission(){
            $scope.home = "HOME";
            $scope.href_home = "/dashboard.html";
            
            switch (sessionStorage.id_permission) {
                case '1':
                    $scope.progetti = "Crea Progetti";
                    $scope.href_progetti = "#crea_progetti";
                    break;
                
                case '4':
                    $scope.progetti = "Crea Progetti";
                    $scope.href_progetti = "#crea_progetti";
                    break;
                
                default:
            }
            
        }
        
        
        //Esecuzione delle funzioni
        getPageForMenu();
        
    }]);
    
    
    //Controllo dell'accesso
    project.factory('LoginService', function($http) {
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
    project.run(function(LoginService, $window) {
        var bool = LoginService.isAuthenticated();
        if(bool) {
            $window.location.href= "https://vdemastro2.000webhostapp.com/login.html";
        }
    });
    
    
    //SECTION HOME
    project.controller('home',['$scope', function ($scope){
        //variable
        $scope.presentation_subtitle = "Subtitle";
        $scope.presentation_title = "Title";
        
    }]);
    
    
    //SECTION PROJECT
    project.controller('project', ['$scope', '$http', '$interval', function ($scope, $http, $interval){
        function getAllProject(){
            $http({
                method  : 'GET', url     : "https://vdemastro2.000webhostapp.com/PHP/getProject.php",
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            }).then(
                function(response) {
                    var jso = angular.fromJson(JSON.stringify(response));
                    
                    console.log(jso.data.result);
                    
                    $scope.data = {
                        model: null,
                        availableOptions: jso.data.result
                    };
                    
            },  function (error) {
                        console.log(JSON.stringify(error));
            });
        }
        
        function creaProgetto(){
            switch(sessionStorage.id_permission){
                case '1':
                    $scope.crea_progetto = "1";
                    break;
                case '4':
                    $scope.crea_progetto = "4";
                    break;
                default:
                    $scope.crea_progetto = "";
                    break;
                    
            }
        }
        
        
        getAllProject();
        creaProgetto();
        
        $scope.interval = $interval(function(){
            getAllProject();
        },300000);
        
        
    }]);
    
    
    //FOOTER
    project.controller('footer', ['$scope',  function ($scope){
        $scope.year = (new Date()).getFullYear();
        $scope.by = "Creative TIM pepp";
    }]);