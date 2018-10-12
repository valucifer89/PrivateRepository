login.controller('login', function ($scope){
    
    $scope.login = function(){
        alert($scope.user+" "+$scope.password);
    }
    
    $scope.reset = function(){
        resetField($scope);
    }
    
    $scope.init = function(){
        resetField($scope);
    }
    
    function resetField($scope){
        $scope.user ="";
        $scope.password ="";
    }
    
});