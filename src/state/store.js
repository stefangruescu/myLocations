import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { composeReducers } from 'redux-toolbelt';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import * as reducers from './reducers';

const rootReducer = composeReducers(combineReducers(reducers));

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

export const store = createStore(persistedReducers, composeWithDevTools());
export const persistor = persistStore(store);
