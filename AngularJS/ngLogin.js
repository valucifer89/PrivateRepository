var login = angular.module('myLogin', []);


    //HEADER
    login.controller("header",  ['$scope', function ($scope){
        //header da definire
        $scope.title_page_head = "Titolo Pagina";
        $scope.base = "https://vdemastro2.000webhostapp.com/";
    }]);


    //BODY
    login.controller('login', ['$scope', '$http', '$window', '$interval', '$location', function ($scope, $http, $window, $interval, $location){
        
        //variables
        $scope.url = "https://vdemastro2.000webhostapp.com/PHP/login.php";
        sessionStorage.timeStop = 11;
        $scope.interval = null;
        
        
        //functions
        function resetField($scope){
            $scope.user = "";
            $scope.pass = "";
            
            angular.element('#form_user').removeClass("form-control-danger");
            angular.element('#user').removeClass("has-danger");
            angular.element('#form_password').removeClass("form-control-danger");
            angular.element('#password').removeClass("has-danger");
        }
        
        function displayOnlyButton(boolDisplay){
            $scope.disabled = boolDisplay;
        }
        
        function disableButton(){
            displayOnlyButton(true);
            $scope.interval = $interval(countTime, 1000);
        }
        
        function countTime(){
            $scope.errorLoginInsert = "Attendi "+(sessionStorage.timeStop-1)+" secondi per il ripristino della pagina";
            sessionStorage.timeStop--;
            
            if(sessionStorage.timeStop == 0){
                $interval.cancel($scope.interval);
                sessionStorage.timeStop = 11;
                sessionStorage.tentativi = 0;
                $scope.errorLoginInsert = "";
                displayOnlyButton(false);
            }
        }
        
        function isNotEmpty($scope){
            $scope.loading=true;
            
            var flag = true;
            var flagUser = false;
            var flagPass = false;
            
            if ($scope.user === ""){
                angular.element('#user').addClass("has-danger");
                angular.element('#form_user').addClass("form-control-danger");
                flag = flag && false;
                flagUser  = true;
            }else{
                angular.element('#user').removeClass("has-danger");
                angular.element('#form_user').removeClass("form-control-danger");
                flag = flag && true;
                flagUser  = false;
            }
            
            if ($scope.pass === ""){
                angular.element('#password').addClass("has-danger");
                angular.element('#form_password').addClass("form-control-danger");
                flag = flag && false;
                flagPass = true;
            }else{
                angular.element('#password').removeClass("has-danger");
                angular.element('#form_password').removeClass("form-control-danger");
                flag = flag && true;
                flagPass = false;
            }
            
            var str = "";
            
            if(flagUser && flagPass){ str = "Username e password sono vuote";}
            else {
                if(flagUser){ str = "Username è vuota";}
                else {
                    if(flagPass){ str = "Password è vuota";}
                }
            }
            
            $scope.errorLoginInsert = str;
            
            return flag;
        }
        
        
        //scope
        $scope.login = function(){
            if (isNotEmpty($scope)){
                
                var data = 'user='+$scope.user+'&password='+$scope.pass;
                
                $http({
                    method  : 'POST', url     : $scope.url,
                    data    : data,   headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                 }).then(
                    function(response) {
                        var jso = angular.fromJson(JSON.stringify(response));
                        
                        if (jso.data.result === "0"){
                            var tentativi = sessionStorage.tentativi;
                            
                            if(tentativi==0){
                                  disableButton();
                            }else{
                                tentativi--;
                                sessionStorage.tentativi = tentativi;
                                $scope.errorLoginInsert = "Attenzione, hai ancora altri "+(tentativi+1)+" tentativi!";
                            }
                            
                            $scope.loading=false;
                            
                        }else{
                            sessionStorage.token = jso.data.token;
                            
                            $scope.loading=false;
                            $scope.errorLoginInsert ="";
                            
                            sessionStorage.nominativo = jso.data.result[0].nominativo ;
                            sessionStorage.user = jso.data.result[0].user ;
                            sessionStorage.pass = $scope.pass ;
                            sessionStorage.id_utenti = jso.data.result[0].id ;
                            sessionStorage.email = jso.data.result[0].email ;
                            sessionStorage.id_permission = jso.data.result[0].id_permission ;
                            
                            $window.location.href= "https://vdemastro2.000webhostapp.com/dashboard.html";
                        }
                        
                },  function (error) {
                            $scope.loading=false;
                });
                
            }else{
                $scope.loading=false;
            }
        }
        
        $scope.reset = function(){
            resetField($scope);
            $scope.errorLoginInsert = "";
        }
        
        $scope.init = function(){
            $scope.loading=false;
            sessionStorage.token = "";
            
            if(sessionStorage.timeStop == 11){
                
                resetField($scope);
                sessionStorage.tentativi = 3;
                $scope.errorLoginInsert = "";
                displayOnlyButton(false);
            }
        }
        
    }]);


    //FOOTER
    login.controller('footer', ['$scope',  function ($scope){
        $scope.year = (new Date()).getFullYear();
        $scope.by = "Creative TIM";
    }]);