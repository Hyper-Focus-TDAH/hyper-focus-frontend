import { createSlice } from '@reduxjs/toolkit';

const initialChatState = { chats: {} };

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    setChat(state, actions) {
      console.log('setChat', state.isLoading);
      const { userId, messages } = actions.payload;

      const _chats = { ...state.chats };

      _chats[userId] = messages ?? [];

      state.chats = _chats;
    },
    addMessageToChat(state, actions) {
      console.log('addMessageToChat', state.isLoading);
      const { userId, message } = actions.payload;

      const _chats = { ...state.chats };

      console.log(state.chats[userId].find((msg) => msg.id === message.id));
      if (!state.chats[userId].find((msg) => msg.id === message.id)) {
        const _chat = [...state.chats[userId], message];

        _chats[userId] = _chat;

        state.chats = _chats;
      }
    },
    reset() {
      return { ...initialChatState };
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice;
