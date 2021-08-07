import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../../routes';
import * as actions from '../../state/actions';

const CATEGORY_FIELDS_ENUM = {
  NAME: 'name',
};

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoriesForm = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const history = useHistory();

  const categories = useSelector((state) => state.categories);

  const validate = (value) => {
    if (!value) {
      return 'Must not be empty';
    }

    const isUnique = !categories.some((category) => category === value);

    if (!isUnique) {
      return 'Must be unique';
    }
  };

  const onSubmit = (formValues) => {
    if (categoryId) {
      dispatch(
        actions.editCategory({
          oldCategory: categoryId,
          newCategory: formValues[CATEGORY_FIELDS_ENUM.NAME],
        })
      );
      history.push(routes.CATEGORIES.path);
      return;
    }

    dispatch(actions.addCategory(formValues[CATEGORY_FIELDS_ENUM.NAME]));
    history.push(routes.CATEGORIES.path);
  };

  const formik = useFormik({
    initialValues: {
      [CATEGORY_FIELDS_ENUM.NAME]: '',
    },
    onSubmit,
  });

  return (
    <Container>
      <h1>{categoryId ? 'Edit' : 'Add'} Category</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Field
            key={CATEGORY_FIELDS_ENUM.NAME}
            fullWidth
            component={TextField}
            validate={validate}
            id={CATEGORY_FIELDS_ENUM.NAME}
            name={CATEGORY_FIELDS_ENUM.NAME}
            label={CATEGORY_FIELDS_ENUM.NAME}
            value={formik.values?.[CATEGORY_FIELDS_ENUM.NAME]}
            onChange={formik.handleChange}
            error={
              formik.touched?.[CATEGORY_FIELDS_ENUM.NAME] &&
              Boolean(formik.errors?.[CATEGORY_FIELDS_ENUM.NAME])
            }
            helperText={
              formik.touched?.[CATEGORY_FIELDS_ENUM.NAME] &&
              formik.errors?.[CATEGORY_FIELDS_ENUM.NAME]
            }
          />
          <StyledButton color="primary" variant="contained" type="submit">
            Submit
          </StyledButton>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default CategoriesForm;
