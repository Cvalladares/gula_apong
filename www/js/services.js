angular.module("Gula.services", [])
  .factory("PouchDBService", function ($rootScope, $q, localStorageService) {

    // buyer: profile, demand
    // producer: farm, production, profile, customer
    // ministry: profile
    var databases = ['farm', 'production', 'profile', 'customer', 'demand'];
    var syncActive = false;
    //var remoteCouchDbUrl = 'http://10.64.115.70:5984';
    // var remoteCouchDbUrl = 'http://localhost:5984';
    // var remoteCouchDbUrl = 'http://172.20.10.7:5984';
    var remoteCouchDbUrl = 'http://54.255.228.108:5984';

    var pouchDBs = {};
    var activeSyncs = {};

    var initPouchDbs = function () {
      var currentUser = localStorageService.get('user');
      if (!currentUser || !currentUser.id) {
        return;
      }
      _.forEach(databases, function (dbName) {
        pouchDBs[dbName] = new PouchDB('user_' + currentUser.id + '_' + dbName);
      });
    };

    initPouchDbs();

    return {
      getFarmDb: function () {
        return pouchDBs.farm;
      },
      getProductionDb: function () {
        return pouchDBs.production;
      },
      getProfileDb: function () {
        return pouchDBs.profile;
      },
      // getDemandDb: function () {
      //     return pouchDBs.demand;
      //   },
      getCustomerDb: function () {
        return pouchDBs.customer;
      },
      initPouchDbs: initPouchDbs,

      initSyncForUser: function () {

        var deferred = $q.defer();
        var currentUser = localStorageService.get('user');
        if (!currentUser || !currentUser.id || syncActive) {
          deferred.reject();
          return deferred.promise;
        }

        var couchUser = {
          name: currentUser.id.toString(),
          password: currentUser.couchPassword
        };

        return setupSync('farm', couchUser)
          .then(function () {
            console.info('farm ✔️');
            return setupSync('production', couchUser);
          })
          .then(function () {
            console.info('production ✔️');
            return setupSync('profile', couchUser);
          })
          .then(function () {
            console.info('profile ✔️');
            return setupSync('customer', couchUser);
          })
          .then(function () {
            console.info('customer ✔️');

          });

      },

      cancelSyncs: function () {
        var promises = [];
        _.forEach(activeSyncs, function (it) {
          var promise = it.cancel();
          promises.push(promise);
        });
        syncActive = false;
        return $q.all(promises);
      },

      destroyDatabases: function () {
        var promises = [];
        _.forEach(pouchDBs, function (db) {
          var promise = db.destroy();
          promises.push(promise);
        });
        return $q.all(promises);
      }
    };

    function setupSync(dbName, couchUser) {
      var pouchOpts = {
        skipSetup: true,
        auto_compaction: true,
        revs_limit: 10
      };

      var fullDbName = 'user_' + couchUser.name + '_' + dbName;
      var url = remoteCouchDbUrl + '/' + fullDbName;
      var db = new PouchDB(url, pouchOpts);

      return db.login(couchUser.name, couchUser.password)
        .then(function () {
          var deferred = $q.defer();
          pouchDBs[dbName].replicate.from(url, {
            batch_size: 10,
            batches_limit: 10
          }).on('complete', function () {
            var asd = pouchDBs[dbName].sync(url, {
              live: true,
              retry: true
            });
            asd.on('complete', function () {
              console.log('COMPLETE', fullDbName);
              deferred.resolve(asd);
            }).on('error', function (err) {
              console.log('ERROR', fullDbName);
              deferred.reject(err);
            }).on('change', function (change) {
              console.log('CHANGE', change);
            }).on('active', function (info) {
              console.log('ACTIVE', fullDbName);
            }).on('paused', function (info) {
              console.log('PAUSED', fullDbName);
              activeSyncs[dbName] = asd;
              deferred.resolve();
            });
          }).on('error', function (err) {
            console.error(JSON.parse(err));
          });
          return deferred.promise;
        })
        .catch(function (error) {
          console.error('error doing login for remote db url: ' + url);
          console.error(error);
          throw error;
        });
    }
  })
  .factory('LoadingAnimation', function ($ionicLoading) {
    return {
      show: function () {
        $ionicLoading.show({
          template: '<ion-spinner class="regularSpinner" icon="ios"></ion-spinner>',
          noBackdrop: true
        })
      },
      hide: function () {
        $ionicLoading.hide();
      }
    };
  });
