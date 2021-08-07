import React from 'react';
import Button from '@material-ui/core/Button';
import { FieldArray, Form } from 'formik';
import TextField from '@material-ui/core/TextField';

import { LOCATION_FIELDS_ENUM } from '../../consts';
import Checkbox from '../shared/Checkbox';

const FORM_FIELDS = [
  LOCATION_FIELDS_ENUM.NAME,
  LOCATION_FIELDS_ENUM.ADDRESS,
  LOCATION_FIELDS_ENUM.LAT,
  LOCATION_FIELDS_ENUM.LNG,
  LOCATION_FIELDS_ENUM.CATEGORIES,
];

const LocationForm = ({
  handleSubmit,
  values,
  handleChange,
  touched,
  errors,
  initialMappedCategories,
}) => (
  <Form onSubmit={handleSubmit}>
    {FORM_FIELDS.map((fieldId) => {
      if (fieldId === LOCATION_FIELDS_ENUM.CATEGORIES) {
        return (
          <div key={fieldId}>
            <FieldArray
              name="categories"
              render={(arrayHelpers) => {
                return (
                  <div>
                    {Object.keys(initialMappedCategories).map((category) => (
                      <div key={category}>
                        <label>
                          <Checkbox
                            name="categoryIds"
                            type="checkbox"
                            value={category}
                            checked={values?.categories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                arrayHelpers.push(category);
                                return;
                              }

                              const categoryIndex =
                                values?.categories.indexOf(category);
                              arrayHelpers.remove(categoryIndex);
                            }}
                          />
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>
        );
      }

      return (
        <TextField
          key={fieldId}
          fullWidth
          id={fieldId}
          name={fieldId}
          label={fieldId}
          value={values?.[fieldId]}
          onChange={handleChange}
          error={touched?.[fieldId] && Boolean(errors?.[fieldId])}
          helperText={touched?.[fieldId] && errors?.[fieldId]}
        />
      );
    })}
    <Button color="primary" variant="contained" fullWidth type="submit">
      Submit
    </Button>
  </Form>
);

export default LocationForm;
