import template from './openstack-tenant-template-field.html';

export default function openstackTenantTemplateField() {
  return {
    restrict: 'E',
    template: template,
    scope: {},
    controller: FieldController,
    controllerAs: '$ctrl',
    bindToController: {
      field: '=',
      model: '='
    }
  }
}

// @ngInject
class FieldController {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
    this.packages = this.field.choices.map(parsePackage);
  }

  isMissing() {
    return this.field.required && !this.hasChoices();
  }

  hasChoices() {
    return this.packages.length > 0;
  }

  getLabel() {
    const field = this.model[this.field.name];
    if (field && field.name) {
      return field.name;
    } else {
      return 'Show choices';
    }
  }

  openDialog() {
    const vm = this;
    this.$uibModal.open({
      component: 'openstackTenantTemplateDialog',
      size: 'lg',
      resolve: {
        field: () => vm.field,
        model: () => vm.model,
        packages: () => vm.packages
      }
    });
  }
}

function parsePackage(choice) {
  /* Output is item with the following format:
  {
    "url": "https://example.com/api/package-templates/2/",
    "name": "Minimal VPC package",
    "price": {
      "day": 1,
      "month": 30,
      "year": 365
    },
    "ram": 20240,
    "cores": 20,
    "storage": 51200,
  }
  */
  const components = choice.item.components.reduce((map, item) => {
    map[item.type] = item.amount;
    return map;
  }, {});
  var dailyPrice = choice.item.price * 24;
  return angular.extend({
    url: choice.item.url,
    name: choice.item.name,
    description: choice.item.description,
    price: {
      day: dailyPrice,
      month: dailyPrice * 30,
      year: dailyPrice * 365,
    }
  }, components);
}
