import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import authSlice, { authActions } from './auth-store/authStore';
import auxSlice, { auxActions } from './aux-store/auxStore';
import intlSlice, { intlActions } from './intl-store/intlStore';
import chatSlice, { chatActions } from './misc/chatStore';
import commuSlice, { commuActions } from './misc/commuStore';
import postSlice, { postActions } from './misc/postStore';
import userSlice, { userActions } from './user-store/userStore';

const persistentReducers = {
  auth: persistReducer({ key: 'auth', storage }, authSlice.reducer),
  user: persistReducer({ key: 'user', storage }, userSlice.reducer),
  intl: persistReducer({ key: 'intl', storage }, intlSlice.reducer),
  aux: persistReducer({ key: 'aux', storage }, auxSlice.reducer),
  commu: persistReducer({ key: 'commu', storage }, commuSlice.reducer),
  post: postSlice.reducer,
  chat: chatSlice.reducer,
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
  store.dispatch(commuActions.reset());
  store.dispatch(chatActions.reset());
}

export { clearCache, persistor };

export default store;
