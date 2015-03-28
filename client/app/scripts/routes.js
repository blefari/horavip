'use strict';

angular.module('beautyApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          auth: function($auth, $state) {
            return $auth.validateUser().catch(function() {
              $state.go('login');
            });
          }
        }
      })
      .state('professionals', {
        url: '/professionals',
        templateUrl: 'views/professionals/professionals.html',
        controller: 'ProfessionalCtrl'
      })
      .state('customers', {
        url: '/customers',
        templateUrl: 'views/customers/customers.html',
        controller: 'CustomerCtrl'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'views/products/products.html',
        controller: 'ProductCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('new', {
        url: '/new',
        templateUrl: 'views/auth/new.html',
        controller: 'AuthCtrl'
      });
  });
