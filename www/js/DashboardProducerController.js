angular.module('Gula.controllers')

  .controller('dashboardProducerCtrl', function ($scope, PouchDBService, $state) {



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

    // Define a list to contain all date-yield pairs
    $scope.weeklyProduction = [];

    // TODO: Define the Name of the farmer owning the Entity
    productionChart.addSeries({
      name: 'Jose Dynamic',
      data: $scope.weeklyProduction
    });


    // Fetch production database
    var db = PouchDBService.getProductionDb();

    // TODO not optimal to fetch and draw graph on every page enter
    $scope.$on('$ionicView.enter', function (e) {
      db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (res) {
        var allProductions = _.map(res.rows, 'doc');

        allProductions.forEach(function (item) {
          var traki = item.date;
          var week = moment(traki).valueOf();
          $scope.weeklyProduction.push([week, item.yield_weight]);
        });

        $scope.weeklyProduction.sort();

       // console.log($scope.weeklyProduction);
        productionChart.series[0].setData($scope.weeklyProduction,true);

      }).catch(function (err) {
        console.log("data failed to be fetched");
        console.log(err)
      });
    });

    $scope.gotoProfile = function () {
      $state.go('profile');
    }
  });
