import { createSlice } from "@reduxjs/toolkit";
import { LOCALES } from "../i18n";

const intlSlice = createSlice({
  name: "intl",
  initialState: { locale: LOCALES.PORTUGUESE.KEY },
  reducers: {
    setLocale (state, actions) {
      state.locale = actions.payload;
    },
  },
});

export const intlActions = intlSlice.actions;

export default intlSlice;