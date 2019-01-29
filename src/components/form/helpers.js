import * as Yup from 'yup';
import { consistentString } from '../../utils/content-formatting';

const isMultipleCheckbox = field =>
  consistentString(field.fieldType) === 'checkboxes' &&
  field.defaultValue &&
  field.valueOptions.length > 1;

export const getInitialValues = (fields, hiddenInitialValues) => {
  const initialValues = hiddenInitialValues;
  fields.forEach(field => {
    if (!field.fieldType) return;

    if (field.fieldType === 'Address') return;
    if (field.internal.type === 'ContentfulTopicFormField') {
      if (field.defaultValue) {
        initialValues[field.machineName] = field.defaultValue;
      } else {
        initialValues[field.machineName] = '';
      }
    }
    // Multiple checkboxes require an array of values
    if (isMultipleCheckbox(field)) {
      initialValues[field.machineName] = field.defaultValue
        ? [field.defaultValue]
        : [];
    }
    if (field.internal.type === 'ContentfulTopicFormFieldset') {
      getInitialValues(field.formFields);
    }
  });
  return initialValues;
};

export const getValidationSchema = formFields => {
  const validationSchema = {};

  formFields.forEach(field => {
    if (!field.fieldType) return;
    const fieldType = consistentString(field.fieldType);
    if (field.fieldType === 'address') return;
    const fieldName = field.machineName;

    let validationType;
    if (isMultipleCheckbox(field)) validationType = Yup.array();
    else if (fieldType === 'phone-number') {
      validationType = Yup.number().typeError('Please provide a valid number');
    } else if (fieldType === 'email') {
      validationType = Yup.string().email('Please provide a valid email');
    } else validationType = Yup.string();

    if (field.required) validationType = validationType.required('Required');

    validationSchema[fieldName] = validationType;
  });

  return Yup.object().shape(validationSchema);
};
