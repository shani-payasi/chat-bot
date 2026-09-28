import { createSlice, nanoid } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    connection: 'connecting',
  },
  reducers: {
    setConnection(state, action) {
      state.connection = action.payload;
    },
    sendStarted(state, action) {
      state.messages.push({ id: nanoid(), role: 'user', content: action.payload });
      state.isLoading = true;
    },
    receiveResponse(state, action) {
      state.messages.push({ id: nanoid(), role: 'assistant', content: action.payload });
      state.isLoading = false;
    },
  },
});

export const { setConnection, sendStarted, receiveResponse } = chatSlice.actions;
export default chatSlice.reducer;