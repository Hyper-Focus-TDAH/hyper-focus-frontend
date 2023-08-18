import { createSlice } from '@reduxjs/toolkit';

const initialPostState = { commentsOpen: {} };

const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    setCommentsOpen(state, actions) {
      const { commentId, isOpen } = actions.payload;

      const _commentsOpen = { ...state.commentsOpen };

      _commentsOpen[commentId] = isOpen;

      state.commentsOpen = _commentsOpen;
    },
    reset() {
      return { ...initialPostState };
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
