'use strict';

(function() {
  angular.module('ncsaas')
    .controller('ResourceListController', ['resourcesService', ResourceListController]);

  function ResourceListController(resourcesService) {
    var vm = this;

    vm.list = {};
    vm.stopResource = stopResource;
    vm.startResource = startResource;
    vm.restartResource = restartResource;

    resourcesService.getResourcesList().then(function(response) {
      vm.list = response;
    });

    function stopResource(uuid) {
      resourcesService.stopResource(uuid);
    }

    function startResource(uuid) {
      resourcesService.startResource(uuid);
    }

    function restartResource(uuid) {
      resourcesService.restartResource(uuid);
    }
  }
})();

(function() {
  angular.module('ncsaas')
    .controller('ResourceAddController',
      ['$state', 'resourcesService', 'cloudsService', 'projectsService', 'keysService', 'templatesService',
      ResourceAddController]);

  function ResourceAddController(
      $state, resourcesService, cloudsService, projectsService, keysService, templatesService) {
    var vm = this;

    // Resource add process:
    // 0. User has to choose back-end. Currently this step is not active because we have only one back-end.
    // 1. User has to choose project.
    // 2. User has to choose service. Method setService has to be called, because flavors and templates are initialized
    // based on services
    // 3. User has to choose flavor, template, ssh key and other resource attributes.

    vm.serviceList = {};
    vm.flavorList = {};
    vm.keyList = {};
    vm.projectList = {};
    vm.templateList = {};
    vm.setService = setService;
    vm.resource = resourcesService.createResource();
    vm.save = save;
    vm.errors = {};

    function activate() {
      // services
      cloudsService.getCloudList().then(function(response) {
        vm.serviceList = response;
      });
      // projects
      projectsService.getProjectList().then(function(response) {
        vm.projectList = response;
      });
      // keys
      keysService.getKeyList().then(function(response) {
        vm.keyList = response;
      });
    }

    function setService(service) {
      vm.flavorList = service.flavors;
      templatesService.getTemplateList(service.uuid).then(function(response) {
        vm.templateList = response;
      });
    }

    function save() {
      vm.resource.$save(success, error);

      function success(response) {
        $state.go('resources');
      }

      function error(response) {
        vm.errors = response.data;
      }
    }

    activate();

    function stopResource(resource) {
      resourceService.stopResource(resource);
    }

    function startResource(resoruce) {
      resourcesService.startResource(resource);
    }

    function restartResource(resource) {
      resourceService.restartResource(resource);
    }
  }
})();
