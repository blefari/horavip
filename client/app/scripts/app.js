'use strict';

/**
 * @ngdoc overview
 * @name beautyApp
 * @description
 * # beautyApp
 *
 * Main module of the application.
 */
angular
  .module('beautyApp', [
    'config',
    'ng-token-auth',
    'ui.bootstrap',
    'ui.router'
  ])
  .config(function ($locationProvider, $urlRouterProvider, $authProvider, ENV) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $authProvider.configure([
      {
        default: {
          apiUrl: ENV.apiEndpoint
        }
      }
    ]);
  })
  .run(function ($rootScope, $state) {

    $rootScope.$on('auth:login-success', function () {
      $state.go('home');
    });

    $rootScope.$on('auth:logout-success', function () {
      $state.go('login');
    });

    $rootScope.$on('auth:invalid', function () {
      $state.go('login');
    });

    $rootScope.$on('auth:validation-error', function () {
      $state.go('login');
    });

    $rootScope.$on('auth:validation-success', function () {
    });
  });
