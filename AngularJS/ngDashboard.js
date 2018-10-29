var dashboard = angular.module('myDashboard', []);


    //HEADER
    dashboard.controller("header",  ['$scope', function ($scope){
        //header da definire
        $scope.title_page_head = "Titolo Pagina";
        $scope.base = "https://vdemastro2.000webhostapp.com/";
    }]);

    
    //NAVBAR
    dashboard.controller('navbar', ['$scope', '$window', '$location',  function ($scope, $window, $location, LoginService){
        
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
            $scope.href_home = "#home";
            
            switch (sessionStorage.id_permission) {
                case '1':
                    $scope.registra = "Registra";
                    $scope.href_registra = "/register.html";
                    
                    $scope.progetti = "Progetti";
                    $scope.href_progetti = "#progetti";
                    
                    $scope.documenti = "Documenti";
                    $scope.leggi_documenti = "Lettura dei documenti";
                    $scope.href_leggi_documenti = "";
                    $scope.inserisci_documenti = "Inserimento documenti";
                    $scope.href_inserisci_documenti = "";
                    
                    $scope.leggi_defect = "Lettura dei defect";
                    $scope.href_leggi_defect = "";
                    $scope.inserisci_defect = "Inserimento defect";
                    $scope.href_inserisci_defect = "";
                    break;
                
                case '3':
                    $scope.progetti = "Progetti";
                    $scope.href_progetti = "#progetti";
                    
                    $scope.documenti = "Documenti";
                    $scope.leggi_documenti = "Lettura dei documenti";
                    $scope.href_leggi_documenti = "";
                    
                    $scope.leggi_defect = "Lettura dei defect";
                    $scope.href_leggi_defect = "";
                    
                    break;
                
                case '4':
                    $scope.progetti = "Progetti";
                    $scope.href_progetti = "#progetti";
                    
                    $scope.documenti = "Documenti";
                    $scope.leggi_documenti = "Lettura dei documenti";
                    $scope.href_leggi_documenti = "";
                    $scope.inserisci_documenti = "Inserimento documenti";
                    $scope.href_inserisci_documenti = "";
                    
                    $scope.leggi_defect = "Lettura dei defect";
                    $scope.href_leggi_defect = "";
                    $scope.inserisci_defect = "Inserimento defect";
                    $scope.href_inserisci_defect = "";
                    break;
                
                default:
            }
            
            $scope.menu = "Dashboard";
            $scope.href_menu = "#home";
        }
        
        
        //Esecuzione delle funzioni
        getPageForMenu();
        
        $scope.logout = function(){
            sessionStorage.clear();
            $window.location.href= "https://vdemastro2.000webhostapp.com/login.html";
        }
    }]);
    
    
    //Controllo dell'accesso
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
    
    
    //SECTION HOME
    dashboard.controller('home',['$scope', function ($scope){
        //variable
        $scope.presentation_subtitle = "Subtitle";
        $scope.presentation_title = "Title";
        
    }]);
    
    
    //SECTION PROJECT
    dashboard.controller('project', ['$scope', '$http', '$interval', function ($scope, $http, $interval){
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
    dashboard.controller('footer', ['$scope',  function ($scope){
        $scope.year = (new Date()).getFullYear();
        $scope.by = "Creative TIM pepp";
    }]);