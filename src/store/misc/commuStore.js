import { createSlice } from '@reduxjs/toolkit';

const initialCommuState = { communities: [] };

const commuSlice = createSlice({
  name: 'commu',
  initialState: initialCommuState,
  reducers: {
    addCommunity(state, actions) {
      const newCommunity = actions.payload;
      if (newCommunity.id) {
        const newCommunities = state.communities;
        const index = newCommunities.findIndex(
          (commu) => commu.id === newCommunity.id
        );
        newCommunities[index] = newCommunity;
        state.communities = [...newCommunities];
      } else {
        state.communities = [...state.communities, actions.payload];
      }
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
