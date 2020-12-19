import React from 'react';

import { formatDate } from '@waldur/core/dateUtils';
import { OrganizationLink } from '@waldur/customer/list/OrganizationLink';
import { Customer } from '@waldur/customer/types';
import { translate } from '@waldur/i18n';
import { createFetcher, Table, connectTable } from '@waldur/table';
import { TableProps } from '@waldur/table/Table';
import { Column, TableOptionsType } from '@waldur/table/types';
import { renderFieldOrDash } from '@waldur/table/utils';

const AbbreviationField = ({ row }) => (
  <>{renderFieldOrDash(row.abbreviation)}</>
);

const CreatedDateField = ({ row }) => (
  <>{renderFieldOrDash(formatDate(row.created))}</>
);

const TableComponent = (
  props: TableProps<Customer> & { provider_uuid: string },
) => {
  const columns: Array<Column<Customer & { vm_count: string }>> = [
    {
      title: translate('Organization'),
      render: OrganizationLink,
    },
    {
      title: translate('Abbreviation'),
      render: AbbreviationField,
    },
    {
      title: translate('Created'),
      render: CreatedDateField,
    },
    {
      title: translate('VMs'),
      render: ({ row }) => <>{row.vm_count}</>,
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('organizations')}
      showPageSizeSelector={true}
      enableExport={true}
    />
  );
};

const exportRow = (row: Customer & { vm_count: string }) => [
  row.name,
  row.abbreviation,
  formatDate(row.created),
  row.vm_count.toString(),
];

const exportFields = () => [
  translate('Organization'),
  translate('Abbreviation'),
  translate('Created'),
  translate('VMs'),
];

const mapPropsToFilter = (props) => ({
  service_settings_uuid: props.provider_uuid,
});

const TableOptions: TableOptionsType = {
  table: 'SharedProviderCustomers',
  fetchData: createFetcher('openstack-shared-settings-customers'),
  exportRow,
  exportFields,
  mapPropsToFilter,
  exportAll: true,
};

export const SharedProviderCustomers = connectTable(TableOptions)(
  TableComponent,
) as React.ComponentType<{ provider_uuid: string }>;
