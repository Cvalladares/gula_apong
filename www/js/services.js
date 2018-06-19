angular.module("Gula.services", [])
  .factory("PouchDBService", function ($rootScope, $q) {
    var databaseOne = new PouchDB("testDatabase"); //if the service is singleton then ...
    // is service singleton??? because we must hahve 1 object per controller. can not be the same for all. no!!
    // it should be one.
    return {getDb: databaseOne};
  });
