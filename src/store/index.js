import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authSlice, { authActions } from './authStore';
import auxSlice, { auxActions } from './auxStore';
import intlSlice, { intlActions } from './intlStore';
import userSlice, { userActions } from './userStore';

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

const persistor = persistStore(store);

function clearCache() {
  store.dispatch(authActions.reset());
  store.dispatch(auxActions.reset());
  store.dispatch(intlActions.reset());
  store.dispatch(userActions.reset());
}

export { clearCache, persistor };

export default store;
