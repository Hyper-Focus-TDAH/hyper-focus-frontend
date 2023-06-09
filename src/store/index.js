import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authSlice from './authStore';
import auxSlice from './auxStore';
import intlSlice from './intlStore';
import userSlice from './userStore';

const persistentReducers = {
  auth: persistReducer({ key: 'auth', storage }, authSlice.reducer),
  user: persistReducer({ key: 'user', storage }, userSlice.reducer),
  intl: persistReducer({ key: 'intl', storage }, intlSlice.reducer),
  aux: persistReducer({ key: 'aux', storage }, auxSlice.reducer),
};

const store = configureStore({
  reducer: persistentReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
