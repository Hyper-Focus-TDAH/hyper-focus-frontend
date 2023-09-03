import { createSlice } from '@reduxjs/toolkit';

const initialCommuState = { communities: [] };

const commuSlice = createSlice({
  name: 'commu',
  initialState: initialCommuState,
  reducers: {
    addCommunity(state, actions) {
      state.communities = [...state.communities, actions.payload];
    },
    setCommunities(state, actions) {
      state.communities = actions.payload;
    },
    reset() {
      return { ...initialCommuState };
    },
  },
});

export const commuActions = commuSlice.actions;

export default commuSlice;
