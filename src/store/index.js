import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import intlSlice from './intl';
import userSlice from './user';
import authSlice from './auth';

const persistConfig = {
  key: 'root',
  storage,
};

const persistentReducers = {
  auth: persistReducer(persistConfig, authSlice.reducer),
  user: persistReducer(persistConfig, userSlice.reducer),
  intl: persistReducer(persistConfig, intlSlice.reducer),
};

const store = configureStore({
  reducer: persistentReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
