app.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when("/" , {templateUrl:"intro/view.html"})
  .when("/sobre",{templateUrl:"sobre/view.html"})
  .when("/pratica" , {templateUrl:"pratica/view.html"})
  .when("/social" , {templateUrl:"social/view.html"})
  .when("/empresarial" , {templateUrl:"empresarial/view.html"})
}]);
