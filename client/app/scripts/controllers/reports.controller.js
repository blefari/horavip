'use strict';
angular.module('beautyApp')
  .controller('ReportsCtrl', function ($scope, SaleService, ProductService, ProfessionalService) {

    $scope.tabs = [
      {heading: 'Vendas', templateUrl: 'views/reports/sales.html', loadFunction: loadSales},
      {heading: 'Produtos/Serviços', templateUrl: 'views/reports/products.html', loadFunction: loadProducts},
      {heading: 'Profissionais', templateUrl: 'views/reports/professionals.html', loadFunction: loadProfessionals}
    ];

    var saleItems;

    function loadSales() {
      SaleService.list('COMPLETED').success(function(response){
        $scope.sales = response.map(function(currentSale){
          return calculateTotal(currentSale);
        });

        saleItems = $scope.sales.map(function(s) {
          return s.sale_items;
        }).flatten();
      });
    }

    function loadProducts() {
      $scope.products = [];

      var groupedSaleItems = saleItems.groupBy(function(si){
        return si.product.id;
      });

      Object.keys(groupedSaleItems, function(key){
        $scope.products.push({
          name: groupedSaleItems[key][0].product.name,
          quantity: groupedSaleItems[key].length,
          price: groupedSaleItems[key][0].product.price,
          total: groupedSaleItems[key].sum(function(si) {
            return parseFloat(si.product.price);
          })
        });
      });
    }

    function loadProfessionals() {
      $scope.professionals = [];

      var groupedSaleItems = saleItems.exclude(function(si) {
        return !si.professional;
      }).groupBy(function(si){
        return si.professional.id;
      });

      Object.keys(groupedSaleItems, function(key){
        $scope.professionals.push({
          name: groupedSaleItems[key][0].professional.name,
          quantity: groupedSaleItems[key].length,
          totalSold: groupedSaleItems[key].sum(function(si){
            return parseFloat(si.product.price);
          }),
          comission: groupedSaleItems[key].sum(function(si) {
            return parseFloat(si.product.price) * (parseFloat(si.product.percentage)/100);
          })
        });
      });
    }

    function calculateTotal(sale) {
      var total = sale.sale_items.sum(function(item){
        return parseFloat(item.product.price);
      });
      sale.total = total;
      return sale;
    }
  });