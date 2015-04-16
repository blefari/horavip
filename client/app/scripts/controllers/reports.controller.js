'use strict';
angular.module('beautyApp')
  .controller('ReportsCtrl', function ($scope, SaleService, ProductService, ProfessionalService) {

    $scope.tabs = [
      {heading: 'Vendas', templateUrl: 'views/reports/sales.html', loadFunction: loadSales},
      {heading: 'Produtos/Serviços', templateUrl: 'views/reports/products.html', loadFunction: loadProducts},
      {heading: 'Profissionais', templateUrl: 'views/reports/professionals.html', loadFunction: loadProfessionals}
    ];

    $scope.load = function(tab) {
    };


    function loadSales() {
      SaleService.list('COMPLETED').success(function(response){
        $scope.sales = response.map(function(currentSale){
          return calculateTotal(currentSale);
        });
      });
    }

    function loadProducts() {

    }

    function loadProfessionals() {

    }

    function calculateTotal(sale) {
      var total = sale.sale_items.sum(function(item){
        return parseFloat(item.product.price);
      });
      sale.total = total;
      return sale;
    }
  });