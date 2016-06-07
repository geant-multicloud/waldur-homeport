'use strict';

angular.module('ncsaas')
  .constant('MODE', {
    modeName: 'modePrivateIaas',
    toBeFeatures: [
      'plans',
      'providers',
      'services',
      'eventlog',
      'backups',
      'localSignup',
      'people',
      'import',
      'servicesadd',
      'projectGroups',
      'estonianId'
    ],
    featuresVisible: false,
    appStoreCategories: [
      {
        name: 'VMs',
        icon: 'desktop',
        type: 'provider',
        services: ['OpenStack']
      }
    ],
    serviceCategories: [],
    homeTemplate: 'views/home/private-iaas/home.html',
    homeHeaderTemplate: 'views/partials/private-iaas/site-header.html',
    homeLoginTemplate: 'views/home/private-iaas/login.html'
  });
