register.controller('register', function ($scope){
    
    $scope.registra = function(){
        alert($scope.email+" "+$scope.password);
    }
    
    $scope.reset = function(){
        resetField($scope);
    }
    
    $scope.init = function(){
        resetField($scope);
    }
    
    function resetField($scope){
        $scope.email ="";
        $scope.password ="";
    }
    
});