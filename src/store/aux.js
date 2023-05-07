import { createSlice } from '@reduxjs/toolkit';

const initialAuxState = { isLoading: false };

const auxSlice = createSlice({
  name: 'aux',
  initialState: initialAuxState,
  reducers: {
    setLoading(state, actions) {
      state.isLoading = actions.payload;
    },
  },
});

export const auxActions = auxSlice.actions;

export default auxSlice;
