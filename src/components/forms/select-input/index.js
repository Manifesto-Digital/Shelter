import React from 'react';
import PropTypes from 'prop-types';

/**
 * @param {import('formik').FieldProps} props
 */
const SelectInput = ({ field }) => {
  if (!Array.isArray(field.valueOptions)) {
    return null;
  }

  const SelectOption = ({ label, value }) => (
    <option value={value}>{label}</option>
  );

  SelectOption.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
  };

  return (
    <select name={field.machineName} required={field.required}>
      {field.valueOptions.map((optionValue, key) => (
        <SelectOption
          key={key}
          value={optionValue.value}
          label={optionValue.label}
          defaultValue={field.defaultValue}
        />
      ))}
    </select>
  );
};

SelectInput.propTypes = {
  field: {
    defaultValue: PropTypes.string,
    fieldType: PropTypes.string,
    fieldLabel: PropTypes.string,
    machineName: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.string,
    toolTip: PropTypes.string,
    valueOptions: PropTypes.array,
  },
};

export default SelectInput;
