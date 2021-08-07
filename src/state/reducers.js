import { makeReducer } from 'redux-toolbelt';
import { v4 as uuidv4 } from 'uuid';

import * as actions from './actions';
import { LOCATION_FIELDS_ENUM } from '../consts';

const EMPTY_ARRAY = [];

export const categories = makeReducer(
  {
    [actions.addCategory]: (currentState, { payload: newCategory }) => [
      ...currentState,
      newCategory,
    ],
    [actions.editCategory]: (
      currentState,
      { payload: { oldCategory, newCategory } }
    ) =>
      currentState.map((category) =>
        oldCategory === category ? newCategory : category
      ),
    [actions.removeCategory]: (currentState, { payload: categoryToDelete }) =>
      currentState.filter((category) => category !== categoryToDelete),
  },
  { defaultState: EMPTY_ARRAY }
);

export const locations = makeReducer(
  {
    [actions.addLocation]: (currentState, { payload: newLocation }) => [
      ...currentState,
      { ...newLocation, id: uuidv4() },
    ],
    [actions.editLocation]: (currentState, { payload: editedLocation }) =>
      currentState.map((location) =>
        editedLocation.id === location.id ? editedLocation : location
      ),
    [actions.removeLocation]: (currentState, { payload: deletedLocationId }) =>
      currentState.filter((location) => location.id !== deletedLocationId),
    [actions.removeCategory]: (currentState, { payload: categoryToDelete }) => {
      return [
        ...currentState.map((location) => ({
          ...location,
          [LOCATION_FIELDS_ENUM.CATEGORIES]: location[
            LOCATION_FIELDS_ENUM.CATEGORIES
          ].filter((category) => category !== categoryToDelete),
        })),
      ];
    },
  },
  { defaultState: EMPTY_ARRAY }
);
