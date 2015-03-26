'use strict';

angular.module('beautyApp')
  .controller('ProfessionalCtrl', function ($scope, $auth, $modal, $state, ProfessionalService) {

    $auth.validateUser().catch(function () {
      $state.go('login');
    });

    ProfessionalService.list().success(function(result) {
      $scope.professionals = result;
    });

    $scope.updateProfessionals = function(professional) {
      if($scope.professionals === undefined) {
        $scope.professionals = [];
      }
      var cIndex  = $scope.professionals.findIndex(function(c) {
        return c.id === professional.id;
      });
      if(cIndex > -1) {
        $scope.professionals[cIndex] = professional;
      } else {
        $scope.professionals.push(professional);
      }
    };

    $scope.removeProfessional = function(professional) {
      ProfessionalService.remove(professional).success($scope.updateProfessionals);//todo: do something
    };

    $scope.professionalModal = function(editMode, professional) {
      var modal = $modal.open({
        templateUrl: 'views/professionals/professionalModal.html',
        controller: 'ProfessionalModalCtrl',
        size: 'sm',
        resolve: {
          editMode: function(){
            return editMode;
          },
          professional: function(){
            return angular.copy(professional);
          }
        }
      });

      modal.result.then($scope.updateProfessionals, function(){
        console.log('modal.dismiss');
      });
    };
  })
  .controller('ProfessionalModalCtrl', function($scope, $modalInstance, ProfessionalService, editMode, professional){
    $scope.editing = editMode;
    $scope.professional = professional;

    $scope.close = function(){
      $modalInstance.dismiss();
    };

    $scope.save = function(){
      ProfessionalService.create($scope.professional).success(function(result) {
        $modalInstance.close(result);
      })//todo: do something on error;
    };

    $scope.update = function() {
      ProfessionalService.update($scope.professional).success(function(result){
        $modalInstance.close(result);
      });//todo: do something
    };
  });
