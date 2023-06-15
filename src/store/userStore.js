import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  id: null,
  email: null,
  username: null,
  birthdate: null,
  gender: null,
  language: null,
  nationality: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialUserState },
  reducers: {
    setUser(state, actions) {
      const {
        id,
        email,
        username,
        birthdate,
        gender,
        language,
        nationality,
        role,
        created_at,
        profile_picture,
      } = actions.payload;

      state.id = id ?? state.id;
      state.email = email ?? state.email;
      state.username = username ?? state.username;
      state.birthdate = birthdate ?? state.birthdate;
      state.gender = gender ?? state.gender;
      state.language = language ?? state.language;
      state.nationality = nationality ?? state.nationality;
      state.role = role ?? state.role;
      state.createdAt = created_at ?? state.nationality;
      state.profilePicture = profile_picture ?? state.role;
    },
    clearUser() {
      return { ...initialUserState };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
