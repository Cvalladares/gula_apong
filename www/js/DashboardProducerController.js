angular.module('Gula.controllers')

  .controller('dashboardProducerCtrl', function ($scope, PouchDBService) {



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
            connectorAllowed: false
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

    // Fetch production database
    var db = PouchDBService.getProductionDb();

    // Fetch all production entries
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (res) {
      var allProductions = _.map(res.rows, 'doc');

      // Define a list to contain all date-yield pairs
      $scope.weeklyProduction = [];

      allProductions.forEach(function (item) {
        $scope.weeklyProduction.push([moment(item.date).valueOf(), item.yield_weight]);
      });

      $scope.weeklyProduction.sort();

      console.log($scope.weeklyProduction);

      productionChart.addSeries({
        name: 'Jose Dynamic',
        data: $scope.weeklyProduction
      });

    }).catch(function (err) {
      console.log("data failed to be fetched");
      console.log(err)
    });

  });
