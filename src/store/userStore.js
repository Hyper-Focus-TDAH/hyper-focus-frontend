import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  id: null,
  email: null,
  username: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialUserState },
  reducers: {
    setUser(state, actions) {
      const { id, email, username } = actions.payload;
      state.id = id;
      state.email = email;
      state.username = username;
    },
    clearUser() {
      return { ...initialUserState };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
