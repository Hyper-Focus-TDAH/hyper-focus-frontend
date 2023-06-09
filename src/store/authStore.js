import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialAuthState },
  reducers: {
    setTokens(state, actions) {
      const { accessToken, refreshToken } = actions.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    clearTokens() {
      return { ...initialAuthState }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
