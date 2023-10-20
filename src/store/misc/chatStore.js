import { createSlice } from '@reduxjs/toolkit';

const initialChatState = { chats: {}, isOpen: false, selectedUser: null };

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    setIsOpen(state, actions) {
      console.log('setIsOpen');
      const { isOpen, selectedUser } = actions.payload;

      state.isOpen = isOpen;
      state.selectedUser = selectedUser;
    },
    setChat(state, actions) {
      console.log('setChat');
      const { userId, messages } = actions.payload;

      const _chats = { ...state.chats };

      _chats[userId] = messages ?? [];

      state.chats = _chats;
    },
    addMessageToChat(state, actions) {
      console.log('addMessageToChat');
      const { userId, message } = actions.payload;

      const _chats = { ...state.chats };

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
