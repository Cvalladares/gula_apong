angular.module('Gula.controllers').controller('dashboardMinisterCtrl', function ($scope, PouchDBService, localStorageService,
                                                                              $cordovaDialogs, $ionicHistory, $cordovaGeolocation) {


  // Define the linegraph structure by using highcharts API
  var productionChart = Highcharts.chart('productionGraph', {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Gula Apong Production Per Week'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Week'
      },
      labels: {
        rotation: 100
      }
    },
    yAxis: {
      title: {
        text: 'Gula Apong Produced (kg)'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: true
        }
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 300
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          }
        }
      }]
    }
  });




})
