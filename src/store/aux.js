import { createSlice } from '@reduxjs/toolkit';

const initialAuxState = { loading: false };

const auxSlice = createSlice({
  name: 'aux',
  initialState: initialAuxState,
  reducers: {
    setLoading(state, actions) {
      state.loading = actions.payload;
    },
  },
});

export const auxActions = auxSlice.actions;

export default auxSlice;
