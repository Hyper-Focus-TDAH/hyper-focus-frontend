import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authSlice, { authActions } from './auth/authStore';
import auxSlice, { auxActions } from './aux/auxStore';
import intlSlice, { intlActions } from './intl/intlStore';
import postSlice, { postActions } from './misc/postStore';
import userSlice, { userActions } from './user/userStore';

const persistentReducers = {
  auth: persistReducer({ key: 'auth', storage }, authSlice.reducer),
  user: persistReducer({ key: 'user', storage }, userSlice.reducer),
  intl: persistReducer({ key: 'intl', storage }, intlSlice.reducer),
  aux: persistReducer({ key: 'aux', storage }, auxSlice.reducer),
  post: postSlice.reducer,
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
  store.dispatch(postActions.reset());
}

export { clearCache, persistor };

export default store;
