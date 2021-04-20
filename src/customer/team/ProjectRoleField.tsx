import React from 'react';
import { Field } from 'redux-form';

import { SelectField } from '@waldur/form';
import { reactSelectMenuPortaling } from '@waldur/form/utils';

import { getRoles } from './utils';

export const ProjectRoleField: React.FC<{
  index: number;
  canChangeRole: boolean;
}> = ({ index, canChangeRole }) => {
  const options = React.useMemo(getRoles, []);
  return (
    <Field
      name={`projects[${index}].role`}
      component={SelectField}
      isDisabled={!canChangeRole}
      simpleValue={true}
      options={options}
      isClearable={true}
      {...reactSelectMenuPortaling()}
    />
  );
};
