import { combineReducers, configureStore } from "@reduxjs/toolkit";
import intlSlice from "./intl";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistentReducers = { intl: persistReducer(persistConfig, intlSlice.reducer) };

const rootReducer = combineReducers(persistentReducers)

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store)

export default store;
