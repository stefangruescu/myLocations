import { makeActionCreator } from 'redux-toolbelt';

export const addCategory = makeActionCreator('ADD_CATEGORY');
export const editCategory = makeActionCreator('EDIT_CATEGORY');
export const removeCategory = makeActionCreator('REMOVE_CATEGORY');

export const addLocation = makeActionCreator('ADD_LOCATION');
export const editLocation = makeActionCreator('EDIT_LOCATION');
export const removeLocation = makeActionCreator('REMOVE_LOCATION');
