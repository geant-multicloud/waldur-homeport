'use strict';


(function () {
  angular.module('ncsaas')
    .service('projectsService', ['$q', 'baseServiceClass', projectsService]);

  function projectsService($q, baseServiceClass) {
    var ServiceClass = baseServiceClass.extend({
      init: function() {
        this._super();
        this.endpoint = '/projects/';
      },
      getFirst: function() {
        var deferred = $q.defer();
        var savePageSize = this.pageSize;
        this.pageSize = 1;
        /*jshint camelcase: false */
        this.getList().then(function(projects) {
          deferred.resolve(projects[0]);
        });
        this.pageSize = savePageSize;

        return deferred.promise;
      },
      getCounters: function(query) {
        var query = angular.extend({operation: 'counters'}, query);
        return this.getFactory(false).get(query).$promise;
      }
    });
    return new ServiceClass();
  }
})();
