import { createSlice } from '@reduxjs/toolkit';
import { LOCALES } from '../i18n';

const initialIntlState = { locale: LOCALES.PORTUGUESE.KEY };

const intlSlice = createSlice({
  name: 'intl',
  initialState: initialIntlState,
  reducers: {
    setLocale(state, actions) {
      state.locale = actions.payload;
    },
  },
});

export const intlActions = intlSlice.actions;

export default intlSlice;
