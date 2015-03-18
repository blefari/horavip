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
    'ui.router',
    'ngQuickDate',
    'pascalprecht.translate'
  ])
  .config(function ($locationProvider, $urlRouterProvider, $authProvider, ngQuickDateDefaultsProvider, $translateProvider, ENV) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $authProvider.configure([
      {
        default: {
          apiUrl: ENV.apiEndpoint
        }
      }
    ]);

    ngQuickDateDefaultsProvider.set({
      closeButtonHtml: '<i class="fa fa-times"></i>',
      buttonIconHtml: '<i class="fa fa-calendar"></i>',
      nextLinkHtml: '<i class="fa fa-chevron-right"></i>',
      prevLinkHtml: '<i class="fa fa-chevron-left"></i>'
    });

    $translateProvider.translations('pt', {
      record_not_unique_customer: 'Cliente já cadastrado com estes dados!'
    });
    $translateProvider.preferredLanguage('pt');

    ngQuickDateDefaultsProvider.set('dayAbbreviations', ['Do', 'Se', 'Te', 'Qua', 'Qui', 'Sex', 'Sa']);
    ngQuickDateDefaultsProvider.set('dateFormat', 'd/M/yyyy');
    ngQuickDateDefaultsProvider.set('timeFormat', 'HH:mm');
    ngQuickDateDefaultsProvider.set('placeholder', 'Clique para selecionar');
    ngQuickDateDefaultsProvider.set('disableClearButton', true);
    ngQuickDateDefaultsProvider.set('disableTimepicker', true);
  })
  .run(function ($rootScope, $state, $filter) {

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

    var startHour = 8;
    $rootScope.availableHours = _.times(19, function(index) {
      var currentHour = startHour;
      var currentMinutes = (index % 2) === 0 ? 0 : 30;
      var date = new Date();
      date.setHours(currentHour);
      date.setMinutes(currentMinutes);
      if ((index % 2) === 1) {
        startHour++;
      }
      return {
        label: $filter('date')(date, 'HH:mm'),
        hour: currentHour,
        minutes: currentMinutes
      };
    });

    $rootScope.availableDurations = [
      {label: '30m', value: 30},
      {label: '1h', value: 60},
      {label: '1h30m', value: 90},
      {label: '2h', value: 120},
      {label: '2h30m', value: 150},
      {label: '3h', value: 180}];

    $rootScope.availableScheduleHours = _.times(10, function(index) {
      return index + 8;
    });
    $rootScope.availableMinutes = [0, 30];
  });
