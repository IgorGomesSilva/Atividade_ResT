
 var app = angular.module('starter', ['ionic']);

 app.config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider.state('list', {
     cache: false,
     url: '/list',
     templateUrl: 'templates/lista.html'
   });

   $stateProvider.state('new', {
     url: '/new',
     templateUrl: 'templates/novo.html',
     controller: 'NovoPC'
   });

   $stateProvider.state('edit', {
     url: '/edit/:indice',
     templateUrl: 'templates/novo.html',
     controller: 'EditPC'
   });

   $stateProvider.state('login', {
     url: '/login',
     pageTitle: 'Login',
     templateUrl: 'templates/login.html',
     controller: 'LoginUser'
   });

   $stateProvider.state('cadastro', {
     url: '/cadastro',
     pageTitle: 'Cadastro',
     templateUrl: 'templates/cadastro.html',
     controller: 'CadastroUser'
   });

   $urlRouterProvider.otherwise('/login');
 });

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('ListaPC', function ($scope, $state, API) {

  //$scope.computadores = API.listaPC();

  API.listaPC().then(function (dados) {
    $scope.computadors = dados;

  });

});

app.controller('NovoPC', function ($scope, $state, API, $http) {

  $scope.computador = {
    "nome": '',
    "descricao": '',
    "valor": ''
  };

  $scope.salvar = function () {
    API.inserirPC($scope.computador).then(function () {
        $state.go('list');
    });
  }
});

app.controller('LoginUser', function ($scope, $http, $state, $ionicHistory) {

  $scope.usuario = {};

  $scope.login = function () {
    $http.post('http://localhost:3000/usuarios/login', $scope.usuario)
      .then(function (response) {

        if(response.status == 200){
          window.localStorage.setItem('usuario', JSON.stringify(response.data));
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('list');
        }


      });
  }

  $scope.cadastrar = function () {
    $state.go('cadastro');

  }

});

app.controller('CadastroUser', function ($scope, $http, $state, API) {

  $scope.usuario = {
    "email": '',
    "senha": ''
  };

  $scope.cadastro = function () {
    API.inserirUser($scope.usuario).then(function () {
        $state.go('login');
    });
  }

});


app.factory('API', function ($http, $q) {



  var url_get = 'http://localhost:3000/computadores';
  var url_post = 'http://localhost:3000/usuarios/cadastrar';
  var url_insert = 'http://localhost:3000/computadores/cadastrar';

  var config = {
    headers: {'Authorization': JSON.parse(window.localStorage.getItem('usuario'))}

  };
  return {

    listaPC: function () {

      var deferido = $q.defer();

      $http.get(url_get, config).then(function(response){
        deferido.resolve(response.data);
      });

      return deferido.promise;

    },

    inserirPC: function (computador) {
      var deferido = $q.defer();

      $http.post(url_insert, computador).then(function () {
        deferido.resolve();

      });

      return deferido.promise;

    },

    inserirUser: function (usuario) {
      var deferido = $q.defer();

      $http.post(url_post, usuario).then(function () {
        deferido.resolve();

      });

      return deferido.promise;

    }

  }


});
