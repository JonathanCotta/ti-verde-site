app.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when("/" , {templateUrl:"components/intro/view.html"})
  .when("/sobre",{templateUrl:"components/sobre/view.html"})
  .when("/pratica" , {templateUrl:"components/pratica/view.html"})
  .when("/social" , {templateUrl:"components/social/view.html"})
  .when("/empresarial" , {templateUrl:"components/empresarial/view.html"})
}]);
