import React, { useState } from 'react';
import TopBar from '../TopBar';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import routes from '../../routes';
import CategoriesList from './CategoriesList';

import * as actions from '../../state/actions';

const CategoriesPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const onCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  const toAddCategory = () => history.push(routes.CATEGORY_ADD.clearPath);

  const toEditCategory = () => {
    if (!selectedCategoryId) {
      return;
    }

    history.push(`${routes.CATEGORY_EDIT.clearPath}/${selectedCategoryId}`);
  };

  const toViewCategory = () => {
    if (!selectedCategoryId) {
      return;
    }

    history.push(`${routes.CATEGORY.clearPath}/${selectedCategoryId}`);
  };

  const onRemoveCategory = () => {
    dispatch(actions.removeCategory(selectedCategoryId));
  };

  return (
    <>
      <TopBar
        onAddClick={toAddCategory}
        onEditClick={toEditCategory}
        onItemViewClick={toViewCategory}
        onRemoveClick={onRemoveCategory}
        title="Categories"
      />
      <CategoriesList
        onCategoryClick={onCategoryClick}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};

export default CategoriesPage;
