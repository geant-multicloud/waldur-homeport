'use strict';

(function() {
  angular.module('ncsaas')
    .service('projectsService',
      ['$q', 'RawProject', 'RawUser', 'RawCustomer', 'RawCloud', 'currentStateService', projectsService]);

  function projectsService($q, RawProject, RawUser, RawCustomer, RawCloud, currentStateService) {
    /*jshint validthis: true */
    var vm = this;
    /*jshint validthis: false */

    vm.getProject = getProject;
    vm.getProjectList = getProjectList;
    vm.createProject = createProject;
    vm.getRawProjectList = getRawProjectList;

    function createProject() {
      return new RawProject();
    }

    function getProject(uuid) {
      var project = RawProject.get({projectUUID: uuid}, init);

      function init(project) {
        initProjectUsers(project);
        initProjectCustomer(project);
        initProjectClouds(project);
      }

      return project;
    }

    function getRawProjectList() {
      return RawProject.query().$promise;
    }

    function getProjectList(includeUsers) {
      var deferred = $q.defer();
      currentStateService.getCustomer().then(function(response) {
        var customerName = response.name,
          projects = {};
        /*jshint camelcase: false */
        if (includeUsers) {
          projects = RawProject.query({customer_name: customerName}, initUsers, reject);
        } else {
          projects = RawProject.query({customer_name: customerName});
        }
        deferred.resolve(projects);
      }, reject);

      function initUsers(projects) {
        for (var i = 0; i < projects.length; i++) {
          initProjectUsers(projects[i]);
        }
      }

      function reject(error) {
        deferred.reject(error);
      }

      return deferred.promise;
    }

    function initProjectUsers(project) {
      RawUser.query({project: project.name}, init);

      function init(users) {
        project.users = users;
      }
    }

    function initProjectCustomer(project) {
      /*jshint camelcase: false */
      RawCustomer.query({name: project.customer_name}, init);

      function init(customers) {
        project.customer = customers[0];
      }
    }

    function initProjectClouds(project) {
      RawCloud.query({project: project.uuid}, init);

      function init(clouds) {
        project.clouds = clouds;
      }
    }

  }

})();

(function() {
  angular.module('ncsaas')
    .factory('RawProject', ['ENV', '$resource', RawProject]);

    function RawProject(ENV, $resource) {
      return $resource(
        ENV.apiEndpoint + 'api/projects/:projectUUID/', {projectUUID: '@uuid'},
        {
          update: {
            method: 'PUT'
          }
        }

      );
    }

})();
